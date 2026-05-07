"use client";

import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { createAcquisitionEmailThread } from "../lib/acquisitionEmailThread";
import type { EmailThread, ExtractedWorkflowData, MemoJson } from "../lib/workflowTypes";
import { ExtractionPanel } from "./ExtractionPanel";
import { PdfFormPreview } from "./PdfFormPreview";
import { StatusBadge } from "./StatusBadge";

type ReviewTab = "document" | "json";
type VisibleStage = "thread" | "extraction" | "final";

const shellPalette = {
  "--workflow-bg": "247 244 238",
  "--workflow-card": "255 252 247",
  "--workflow-line": "220 214 205",
  "--workflow-ink": "26 24 22",
  "--workflow-soft": "239 234 226",
  "--workflow-accent": "31 78 121",
} as CSSProperties;

const visibleSteps: Array<{
  id: VisibleStage;
  label: string;
  description: string;
}> = [
  {
    id: "thread",
    label: "Email thread",
    description: "Review the source correspondence.",
  },
  {
    id: "extraction",
    label: "Extraction",
    description: "Separate facts, instructions, issues, and timing.",
  },
  {
    id: "final",
    label: "Final document",
    description: "Edit the document, inspect JSON, and export from one page.",
  },
];

function createFreshThread() {
  const nextThread = createAcquisitionEmailThread();

  return {
    thread: nextThread,
    selectedEmailId: nextThread.emails[0]?.id ?? null,
  };
}

export function WorkflowShell() {
  const initialThread = createFreshThread();
  const [emailThread] = useState<EmailThread | null>(
    initialThread.thread,
  );
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(
    initialThread.selectedEmailId,
  );
  const [extractedData] = useState<ExtractedWorkflowData | null>(null);
  const [memoJson] = useState<MemoJson | null>(null);
  const [reviewTab, setReviewTab] = useState<ReviewTab>("document");

  const selectedEmail = useMemo(() => {
    if (!emailThread) {
      return null;
    }

    return (
      emailThread.emails.find((email) => email.id === selectedEmailId) ??
      emailThread.emails[0] ??
      null
    );
  }, [emailThread, selectedEmailId]);

  const visibleStage = useMemo<VisibleStage>(() => {
    if (memoJson) {
      return "final";
    }

    if (extractedData) {
      return "extraction";
    }

    return "thread";
  }, [extractedData, memoJson]);
  const isExtractionStage = visibleStage === "extraction";

  const stageAvailability: Record<
    VisibleStage,
    {
      available: boolean;
      complete: boolean;
    }
  > = {
    thread: {
      available: true,
      complete: Boolean(emailThread),
    },
    extraction: {
      available: Boolean(emailThread),
      complete: Boolean(extractedData),
    },
    final: {
      available: Boolean(memoJson),
      complete: Boolean(memoJson),
    },
  };

  function handleSelectReviewTab(tab: ReviewTab) {
    setReviewTab(tab);
  }

  function renderEmailThread() {
    if (!emailThread || !selectedEmail) {
      return (
        <EmptyState
          title="No email thread"
          body="Load the fictional correspondence to begin."
        />
      );
    }

    return (
      <section className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-[28px] border border-stone-200 bg-[rgb(var(--workflow-card))] p-3 shadow-[0_18px_45px_-32px_rgba(26,24,22,0.24)]">
          <div className="border-b border-stone-200 px-3 pb-3">
            <p className="text-sm font-medium text-stone-800">
              {emailThread.matterName}
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-600">
              {emailThread.emails.length} source emails
            </p>
          </div>

          <label className="mt-3 block px-1">
            <span className="sr-only">Select email</span>
            <select
              value={selectedEmail.id}
              onChange={(event) => setSelectedEmailId(event.target.value)}
              className="w-full rounded-[18px] border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none focus:border-[rgb(var(--workflow-accent))] focus:ring-2 focus:ring-[rgb(var(--workflow-accent))]/20"
            >
              {emailThread.emails.map((email, index) => (
                <option key={email.id} value={email.id}>
                  Email {index + 1}: {email.from} — {email.subject ?? emailThread.subject}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <article className="rounded-[30px] border border-stone-200 bg-[rgb(var(--workflow-card))] p-6 shadow-[0_20px_55px_-38px_rgba(26,24,22,0.24)] sm:p-8">
          <div className="border-b border-stone-200 pb-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-stone-900">
                  {selectedEmail.from}
                </p>
                <h2 className="mt-2 text-3xl leading-tight text-stone-950 [font-family:Georgia,Times_New_Roman,serif]">
                  {selectedEmail.subject ?? emailThread.subject}
                </h2>
              </div>
              {selectedEmail.date ? (
                <p className="text-sm text-stone-500">{selectedEmail.date}</p>
              ) : null}
            </div>

            <dl className="mt-5 grid gap-3 text-sm leading-6 text-stone-700 sm:grid-cols-[90px_minmax(0,1fr)]">
              <dt className="font-medium text-stone-500">To</dt>
              <dd>{selectedEmail.to}</dd>
              {selectedEmail.cc ? (
                <>
                  <dt className="font-medium text-stone-500">Cc</dt>
                  <dd>{selectedEmail.cc}</dd>
                </>
              ) : null}
            </dl>
          </div>

          <div className="mt-6 whitespace-pre-line text-sm leading-8 text-stone-800">
            {selectedEmail.body}
          </div>
        </article>
      </section>
    );
  }

  function renderExtractedData() {
    if (!extractedData) {
      return (
        <EmptyState
          title="No extraction yet"
          body="Extraction output will appear here when available."
        />
      );
    }

    return (
      <section className="space-y-4">
        <ExtractionPanel data={extractedData} />
      </section>
    );
  }

  function renderFinalWorkspace() {
    return (
      <PdfFormPreview
        memoJson={memoJson}
        reviewTab={reviewTab}
        onReviewTabChange={handleSelectReviewTab}
      />
    );
  }

  function renderStageContent() {
    switch (visibleStage) {
      case "thread":
        return renderEmailThread();
      case "extraction":
        return renderExtractedData();
      case "final":
        return renderFinalWorkspace();
      default:
        return null;
    }
  }

  return (
    <main
      style={shellPalette}
      className="min-h-screen bg-[rgb(var(--workflow-bg))] px-4 py-4 text-[rgb(var(--workflow-ink))] sm:px-6 lg:px-8"
    >
      <div className={`mx-auto max-w-7xl ${isExtractionStage ? "space-y-4" : "space-y-6"}`}>
        <header className={`overflow-hidden rounded-[38px] border border-stone-200 bg-[linear-gradient(140deg,rgba(255,252,247,0.98),rgba(248,244,238,0.92))] shadow-[0_24px_60px_-42px_rgba(26,24,22,0.28)] ${isExtractionStage ? "p-5 sm:p-6" : "p-7 sm:p-8"}`}>
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between ${isExtractionStage ? "gap-3" : "gap-5"}`}>
            <div className="max-w-3xl">
              <h1 className={`${isExtractionStage ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"} leading-tight text-stone-950 [font-family:Georgia,Times_New_Roman,serif]`}>
                Email Thread to File Note
              </h1>
              <p className={`mt-3 text-stone-600 ${isExtractionStage ? "text-sm leading-6 sm:text-base" : "text-base leading-8 sm:text-lg"}`}>
                Review a fictional acquisition thread, extract the key points, and export a partner-facing file note as PDF.
              </p>
            </div>

            <StatusBadge
              label={visibleStage === "final" ? "Ready to export" : "Workflow in progress"}
              tone={visibleStage === "final" ? "green" : "blue"}
            />
          </div>

          <div className={`${isExtractionStage ? "mt-5" : "mt-8"} grid gap-2 md:grid-cols-3`}>
            {visibleSteps.map((step, index) => {
              const isActive = step.id === visibleStage;
              const isComplete =
                stageAvailability[step.id].complete && !isActive;

              return (
                <div
                  key={step.id}
                  className={`rounded-[20px] border text-left ${isExtractionStage ? "p-3" : "p-4"} ${
                    isActive
                      ? "border-[rgb(var(--workflow-accent))] bg-white shadow-[0_16px_30px_-24px_rgba(31,78,121,0.6)]"
                      : isComplete
                        ? "border-emerald-200 bg-emerald-50/70"
                        : "border-stone-200 bg-stone-50/80"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                    Step {index + 1}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-stone-900">
                    {step.label}
                  </p>
                  {!isExtractionStage ? (
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </header>

        <section className={`rounded-[28px] border border-stone-200 bg-[rgb(var(--workflow-card))] shadow-[0_18px_45px_-34px_rgba(26,24,22,0.22)] ${isExtractionStage ? "p-3 sm:p-4" : "p-4 sm:p-5"}`}>
          <div className="space-y-4">
            <p className={`text-stone-600 ${isExtractionStage ? "text-sm leading-6" : "text-sm leading-7"}`}>
              Read the thread, extract the working points, then edit, inspect, and export the final document from one page.
            </p>

            <div className={`flex items-center gap-2 rounded-[22px] border border-stone-200 bg-stone-50/80 ${isExtractionStage ? "p-3" : "p-4"}`}>
              <StatusBadge label="LLM-powered extraction" tone="blue" />
              <p className="text-sm leading-6 text-stone-600">
                The extraction step uses structured model output to keep the JSON consistent.
              </p>
            </div>
          </div>
        </section>

        {renderStageContent()}
      </div>
    </main>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-[28px] border border-dashed border-stone-300 bg-[rgb(var(--workflow-card))] p-10 text-center shadow-[0_16px_36px_-30px_rgba(26,24,22,0.2)]">
      <h3 className="text-2xl text-stone-900 [font-family:Georgia,Times_New_Roman,serif]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-stone-600">
        {body}
      </p>
    </section>
  );
}
