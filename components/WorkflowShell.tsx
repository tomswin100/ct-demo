"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { formatEmailThread } from "../lib/acquisitionEmailThread";
import {
  createInstalledEmailThread,
  DEFAULT_INSTALLED_EMAIL_THREAD_ID,
  getInstalledEmailThreadOptions,
} from "../lib/installedEmailThread";
import { createMemoJson } from "../lib/memoSchema";
import type { EmailThread, ExtractedWorkflowData, MemoJson } from "../lib/workflowTypes";
import { ExtractionPanel } from "./ExtractionPanel";
import { PdfFormPreview } from "./PdfFormPreview";
import { StatusBadge } from "./StatusBadge";

type ReviewTab = "document" | "json";
type VisibleStage = "thread" | "extraction" | "final";

const shellPalette = {
  "--workflow-bg": "246 242 235",
  "--workflow-card": "255 253 248",
  "--workflow-line": "221 211 198",
  "--workflow-ink": "17 17 17",
  "--workflow-soft": "239 231 220",
  "--workflow-accent": "17 17 17",
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

const installedThreadOptions = getInstalledEmailThreadOptions();

function createFreshThread(threadId: string) {
  const nextThread = createInstalledEmailThread(threadId);

  return {
    thread: nextThread,
    selectedEmailId: nextThread.emails[0]?.id ?? null,
  };
}

export function WorkflowShell() {
  const [emailThread, setEmailThread] = useState<EmailThread | null>(null);
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState(
    DEFAULT_INSTALLED_EMAIL_THREAD_ID,
  );
  const [extractedData, setExtractedData] =
    useState<ExtractedWorkflowData | null>(null);
  const [memoJson, setMemoJson] = useState<MemoJson | null>(null);
  const [reviewTab, setReviewTab] = useState<ReviewTab>("document");
  const [extractionPending, setExtractionPending] = useState(false);
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [memoStructureError, setMemoStructureError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    handleLoadInstalledThread(DEFAULT_INSTALLED_EMAIL_THREAD_ID);
  }, []);

  const selectedThreadOption = useMemo(
    () =>
      installedThreadOptions.find((option) => option.id === selectedThreadId) ??
      installedThreadOptions[0] ??
      null,
    [selectedThreadId],
  );

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
      complete: Boolean(extractedData),
    },
    extraction: {
      available: Boolean(emailThread),
      complete: Boolean(memoJson),
    },
    final: {
      available: Boolean(memoJson),
      complete: Boolean(memoJson),
    },
  };

  function handleSelectReviewTab(tab: ReviewTab) {
    setReviewTab(tab);
  }

  function handleLoadInstalledThread(threadId: string) {
    const nextThread = createFreshThread(threadId);

    setSelectedThreadId(threadId);
    setEmailThread(nextThread.thread);
    setSelectedEmailId(nextThread.selectedEmailId);
    setExtractedData(null);
    setMemoJson(null);
    setReviewTab("document");
    setExtractionError(null);
    setMemoStructureError(null);
  }

  function handleGenerateThread() {
    handleLoadInstalledThread(selectedThreadId);
  }

  async function handleRunExtraction() {
    if (!emailThread || extractionPending) {
      return;
    }

    setExtractionError(null);
    setExtractionPending(true);

    try {
      const response = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          threadText: formatEmailThread(emailThread),
        }),
      });

      const payload: unknown = await response.json();

      if (!response.ok) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof (payload as { error: unknown }).error === "string"
            ? (payload as { error: string }).error
            : "Extraction failed.";
        throw new Error(message);
      }

      setExtractedData(payload as ExtractedWorkflowData);
    } catch (error) {
      setExtractionError(
        error instanceof Error ? error.message : "Extraction failed.",
      );
    } finally {
      setExtractionPending(false);
    }
  }

  function handleStructureMemo() {
    if (!extractedData) {
      return;
    }

    setMemoStructureError(null);

    try {
      setMemoJson(createMemoJson(extractedData, emailThread ?? undefined));
    } catch (error) {
      setMemoStructureError(
        error instanceof Error
          ? error.message
          : "Could not structure memo from extraction.",
      );
    }
  }

  function renderEmailThread() {
    if (!emailThread || !selectedEmail) {
      return (
        <EmptyState
          title="No email thread"
          body="Loading the installed test email thread..."
        />
      );
    }

    return (
      <section className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="rounded-duna-lg border border-brand-line bg-[rgb(var(--workflow-card))] p-3 shadow-brand-float">
          <div className="border-b border-brand-line px-3 pb-3">
            <p className="text-sm font-medium text-brand-ink">
              {emailThread.matterName}
            </p>
            <p className="mt-1 text-sm leading-6 text-brand-muted">
              {emailThread.emails.length} source emails
            </p>
          </div>

          <label className="mt-3 block px-1">
            <span className="sr-only">Select email</span>
            <select
              value={selectedEmail.id}
              onChange={(event) => setSelectedEmailId(event.target.value)}
              className="w-full rounded-duna border border-brand-line bg-[rgb(var(--workflow-soft))] px-3 py-2.5 text-sm text-brand-ink outline-none focus:border-[rgb(var(--workflow-accent))] focus:ring-2 focus:ring-[rgb(var(--workflow-accent))]/20"
            >
              {emailThread.emails.map((email, index) => (
                <option key={email.id} value={email.id}>
                  Email {index + 1}: {email.from} — {email.subject ?? emailThread.subject}
                </option>
              ))}
            </select>
          </label>
        </aside>

        <article className="rounded-duna-xl border border-brand-line bg-[rgb(var(--workflow-card))] p-6 shadow-brand-card sm:p-8">
          <div className="border-b border-brand-line pb-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-sm font-medium text-brand-ink">
                  {selectedEmail.from}
                </p>
                <h2 className="mt-2 font-display text-3xl tracking-tight text-brand-ink">
                  {selectedEmail.subject ?? emailThread.subject}
                </h2>
              </div>
              {selectedEmail.date ? (
                <p className="text-sm text-brand-muted">{selectedEmail.date}</p>
              ) : null}
            </div>

            <dl className="mt-5 grid gap-3 text-sm leading-6 text-brand-ink sm:grid-cols-[90px_minmax(0,1fr)]">
              <dt className="font-medium text-brand-muted">To</dt>
              <dd>{selectedEmail.to}</dd>
              {selectedEmail.cc ? (
                <>
                  <dt className="font-medium text-brand-muted">Cc</dt>
                  <dd>{selectedEmail.cc}</dd>
                </>
              ) : null}
            </dl>
          </div>

          <div className="mt-6 whitespace-pre-line text-sm leading-8 text-brand-ink/90">
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
      className="min-h-screen bg-[rgb(var(--workflow-bg))] px-4 py-4 font-sans text-[rgb(var(--workflow-ink))] sm:px-6 lg:px-8"
    >
      <div className={`mx-auto max-w-7xl ${isExtractionStage ? "space-y-4" : "space-y-6"}`}>
        <div className="flex justify-end">
          <Link
            href="/"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-muted transition hover:text-brand-ink"
          >
            ← Home
          </Link>
        </div>
        <header className={`overflow-hidden rounded-duna-xl border border-brand-line bg-[linear-gradient(140deg,rgba(255,253,248,0.98),rgba(243,237,229,0.98))] shadow-brand-card ${isExtractionStage ? "p-5 sm:p-6" : "p-7 sm:p-8"}`}>
          <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between ${isExtractionStage ? "gap-3" : "gap-5"}`}>
            <div className="max-w-3xl">
              <h1 className={`font-display tracking-tight text-brand-ink ${isExtractionStage ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"} leading-[1.1]`}>
                Email Thread to File Note
              </h1>
              <p className={`mt-3 text-brand-muted ${isExtractionStage ? "text-sm leading-6 sm:text-base" : "text-base leading-8 sm:text-lg"}`}>
                Review the installed test thread, extract the key points, and export a partner-facing file note as PDF.
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
                  className={`rounded-duna border border-brand-line text-left ${isExtractionStage ? "p-3" : "p-4"} ${
                    isActive
                      ? "border-[rgb(var(--workflow-accent))] bg-white shadow-[0_16px_30px_-24px_rgba(17,17,17,0.18)]"
                      : isComplete
                        ? "border-emerald-500/30 bg-emerald-500/10"
                        : "border-brand-line bg-brand-soft/80"
                  }`}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
                    Step {index + 1}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-brand-ink">
                    {step.label}
                  </p>
                  {!isExtractionStage ? (
                    <p className="mt-2 text-sm leading-6 text-brand-muted">
                      {step.description}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </header>

        <section className={`rounded-duna-lg border border-brand-line bg-[rgb(var(--workflow-card))] shadow-brand-float ${isExtractionStage ? "p-3 sm:p-4" : "p-4 sm:p-5"}`}>
          <div className="space-y-4">
            <p className={`text-brand-muted ${isExtractionStage ? "text-sm leading-6" : "text-sm leading-7"}`}>
              Switch between installed threads, extract the working points, then edit, inspect, and export the final document from one page.
            </p>

            <div className={`flex items-center gap-2 rounded-duna border border-brand-line bg-brand-soft/80 ${isExtractionStage ? "p-3" : "p-4"}`}>
              <StatusBadge label="LLM-powered extraction" tone="blue" />
              <p className="text-sm leading-6 text-brand-muted">
                The extraction step uses structured model output to keep the JSON consistent.
              </p>
            </div>

            {emailThread ? (
              <div className="flex flex-col gap-3 border-t border-brand-line pt-4">
                <label className="grid gap-2 sm:max-w-md">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
                    Example threads
                  </span>
                  <select
                    value={selectedThreadId}
                    onChange={(event) =>
                      handleLoadInstalledThread(event.target.value)
                    }
                    disabled={extractionPending}
                    className="w-full rounded-duna border border-brand-line bg-[rgb(var(--workflow-soft))] px-3 py-2.5 text-sm text-brand-ink outline-none focus:border-[rgb(var(--workflow-accent))] focus:ring-2 focus:ring-[rgb(var(--workflow-accent))]/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {installedThreadOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                {selectedThreadOption ? (
                  <p className="text-sm leading-6 text-brand-muted">
                    Selected matter: {selectedThreadOption.matterName}
                  </p>
                ) : null}
                {visibleStage === "thread" && extractionError ? (
                  <p className="text-sm leading-6 text-red-300">
                    {extractionError}
                  </p>
                ) : null}
                {visibleStage === "extraction" && memoStructureError ? (
                  <p className="text-sm leading-6 text-red-300">
                    {memoStructureError}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-3">
                  {visibleStage === "thread" ? (
                    <>
                      <button
                        type="button"
                        onClick={handleRunExtraction}
                        disabled={extractionPending}
                        className="rounded-duna bg-[rgb(var(--workflow-accent))] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_-16px_rgba(17,17,17,0.28)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--workflow-accent))] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {extractionPending
                          ? "Running extraction…"
                          : "Run extraction"}
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerateThread}
                        disabled={extractionPending}
                        className="rounded-duna border border-brand-line bg-[rgb(var(--workflow-soft))] px-5 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand-muted/50 hover:bg-[rgb(var(--workflow-card))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--workflow-accent))] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reload selected thread
                      </button>
                    </>
                  ) : visibleStage === "extraction" ? (
                    <>
                      <button
                        type="button"
                        onClick={handleStructureMemo}
                        disabled={!extractedData}
                        className="rounded-duna bg-[rgb(var(--workflow-accent))] px-5 py-2.5 text-sm font-medium text-white shadow-[0_12px_28px_-16px_rgba(17,17,17,0.28)] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--workflow-accent))] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Structure memo
                      </button>
                      <button
                        type="button"
                        onClick={handleGenerateThread}
                        className="rounded-duna border border-brand-line bg-[rgb(var(--workflow-soft))] px-5 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand-muted/50 hover:bg-[rgb(var(--workflow-card))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--workflow-accent))]"
                      >
                        Start over with selected thread
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={handleGenerateThread}
                      className="rounded-duna border border-brand-line bg-[rgb(var(--workflow-soft))] px-5 py-2.5 text-sm font-medium text-brand-ink transition hover:border-brand-muted/50 hover:bg-[rgb(var(--workflow-card))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--workflow-accent))]"
                    >
                      Reload selected thread
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {renderStageContent()}
      </div>
    </main>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-duna-lg border border-dashed border-brand-line bg-[rgb(var(--workflow-card))] p-10 text-center shadow-brand-float">
      <h3 className="font-display text-2xl tracking-tight text-brand-ink">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-muted">
        {body}
      </p>
    </section>
  );
}
