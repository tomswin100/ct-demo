"use client";

import { useEffect, useState } from "react";
import {
  createPdfMemoViewModel,
  downloadMemoPdf,
  openMemoPrintPreview,
} from "../lib/pdfRenderer";
import type { MemoJson, MemoSection } from "../lib/workflowTypes";
import { JsonSchemaViewer } from "./JsonSchemaViewer";
import { StatusBadge } from "./StatusBadge";

type ReviewTab = "document" | "json";

type PdfFormPreviewProps = {
  memoJson: MemoJson | null;
  reviewTab: ReviewTab;
  onReviewTabChange?: (tab: ReviewTab) => void;
};

type EditorSectionDraft = {
  heading: string;
  content: string;
};

type EditorDraft = {
  to: string;
  from: string;
  subject: string;
  date: string;
  background: string;
  sections: EditorSectionDraft[];
  clientQuestions: string;
  recommendedActions: string;
  reviewNote: string;
};

function getStatusTone(): "amber" {
  return "amber";
}

function normalizeLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function listToTextareaValue(items: string[]) {
  return items.join("\n");
}

function createEditorDraft(memoJson: MemoJson): EditorDraft {
  return {
    to: memoJson.memo_metadata.to,
    from: memoJson.memo_metadata.from,
    subject: memoJson.memo_metadata.subject,
    date: memoJson.memo_metadata.date,
    background: listToTextareaValue(memoJson.memo.background),
    sections: memoJson.memo.sections.map((section) => ({
      heading: section.heading,
      content: listToTextareaValue(section.points ?? section.paragraphs ?? []),
    })),
    clientQuestions: listToTextareaValue(
      memoJson.memo.client_questions ?? memoJson.memo.clientQuestions ?? [],
    ),
    recommendedActions: listToTextareaValue(
      memoJson.memo.recommended_next_steps ?? memoJson.memo.recommendedNextSteps ?? [],
    ),
    reviewNote: memoJson.memo.review_note ?? memoJson.memo.reviewNote ?? "",
  };
}

function applyEditorDraft(memoJson: MemoJson, draft: EditorDraft): MemoJson {
  const nextSections: MemoSection[] = memoJson.memo.sections.map((section, index) => ({
    ...section,
    heading: draft.sections[index]?.heading ?? section.heading,
    points: normalizeLines(draft.sections[index]?.content ?? ""),
    paragraphs: undefined,
  }));

  return {
    ...memoJson,
    memo_metadata: {
      ...memoJson.memo_metadata,
      to: draft.to,
      from: draft.from,
      subject: draft.subject,
      date: draft.date,
    },
    memo: {
      ...memoJson.memo,
      background: normalizeLines(draft.background),
      sections: nextSections,
      client_questions: normalizeLines(draft.clientQuestions),
      clientQuestions: undefined,
      recommended_next_steps: normalizeLines(draft.recommendedActions),
      recommendedNextSteps: undefined,
      review_note: draft.reviewNote,
      reviewNote: undefined,
    },
  };
}

function DocumentFieldLabel({
  label,
  hidden = false,
}: {
  label: string;
  hidden?: boolean;
}) {
  return (
    <span
      className={
        hidden
          ? "sr-only"
          : "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"
      }
    >
      {label}
    </span>
  );
}

function DocumentInput({
  label,
  value,
  onChange,
  hideLabel = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hideLabel?: boolean;
}) {
  return (
    <label className="block">
      <DocumentFieldLabel label={label} hidden={hideLabel} />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-[14px] border border-transparent bg-slate-50/80 px-3 py-2.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function DocumentTextarea({
  label,
  value,
  onChange,
  rows = 4,
  hideLabel = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  hideLabel?: boolean;
}) {
  return (
    <label className="block">
      <DocumentFieldLabel label={label} hidden={hideLabel} />
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="w-full rounded-[18px] border border-transparent bg-slate-50/80 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-300 focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

export function PdfFormPreview({
  memoJson,
  reviewTab,
  onReviewTabChange,
}: PdfFormPreviewProps) {
  const [editorDraft, setEditorDraft] = useState<EditorDraft | null>(
    memoJson ? createEditorDraft(memoJson) : null,
  );

  useEffect(() => {
    if (!memoJson) {
      setEditorDraft(null);
      return;
    }

    setEditorDraft(createEditorDraft(memoJson));
  }, [memoJson]);

  if (!memoJson) {
    return (
      <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_20px_45px_-34px_rgba(15,23,42,0.2)]">
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Generate the final document first.
        </p>
      </section>
    );
  }

  if (!editorDraft) {
    return (
      <section className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_20px_45px_-34px_rgba(15,23,42,0.2)]">
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Preparing the final document...
        </p>
      </section>
    );
  }

  const resolvedMemo = applyEditorDraft(memoJson, editorDraft);
  const viewModel = createPdfMemoViewModel(resolvedMemo);

  function handlePrintMemo() {
    const started = openMemoPrintPreview(resolvedMemo);

    if (!started) {
      window.alert("Print could not be started. Try again or use Download for a PDF.");
    }
  }

  function handleDownloadPdf() {
    const downloaded = downloadMemoPdf(resolvedMemo);

    if (!downloaded) {
      window.alert("PDF export failed. Check the browser console and try again.");
    }
  }

  function updateDraft(mutator: (current: EditorDraft) => EditorDraft) {
    setEditorDraft((current) => {
      if (!current) {
        return current;
      }

      return mutator(current);
    });
  }

  return (
    <section className="space-y-5">
      <div className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.96),rgba(241,245,249,0.86))] p-4 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.28)] sm:p-6">
        <div className="rounded-[26px] border border-slate-300/80 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.2)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="mt-3 text-3xl text-slate-950 [font-family:Georgia,Times_New_Roman,serif] sm:text-[2.1rem]">
                Final document
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
                Edit the document and inspect the JSON source of truth on this page.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <label className="flex flex-col gap-1 text-sm text-slate-600">
                <span className="sr-only">View</span>
                <select
                  value={reviewTab}
                  onChange={(event) =>
                    onReviewTabChange?.(event.target.value as ReviewTab)
                  }
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none focus:border-blue-200 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="document">Document</option>
                  <option value="json">JSON</option>
                </select>
              </label>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintMemo}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:bg-slate-50 focus-visible:border-blue-200 focus-visible:ring-4 focus-visible:ring-blue-100"
                >
                  Print
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 outline-none transition hover:bg-slate-50 focus-visible:border-blue-200 focus-visible:ring-4 focus-visible:ring-blue-100"
                >
                  Download
                </button>
              </div>

              <StatusBadge
                label={viewModel.statusLabel}
                tone={getStatusTone()}
              />
            </div>
          </div>

          {reviewTab === "json" ? (
            <div className="mt-6 space-y-4">
              <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm leading-7 text-slate-600">
                The JSON below reflects the current draft, including any inline edits you have made on the document tab.
              </div>
              <JsonSchemaViewer value={resolvedMemo} />
            </div>
          ) : (
            <article className="mt-6 min-h-[980px] rounded-[22px] border border-slate-300 bg-white px-6 py-7 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)] sm:px-8">
              <div className="border-b border-stone-300 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                    {viewModel.title}
                  </p>
                  <p className="text-xs leading-6 text-slate-500">
                    Inline edits are shown in the JSON view when you switch views.
                  </p>
                </div>

                <dl className="mt-5 grid gap-x-8 gap-y-4 border-y border-stone-200 py-5 sm:grid-cols-[150px_minmax(0,1fr)]">
                  <div className="contents">
                    <dt className="pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      To
                    </dt>
                    <dd>
                      <DocumentInput
                        label="To"
                        hideLabel
                        value={editorDraft.to}
                        onChange={(value) =>
                          updateDraft((current) => ({
                            ...current,
                            to: value,
                          }))
                        }
                      />
                    </dd>
                  </div>
                  <div className="contents">
                    <dt className="pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      From
                    </dt>
                    <dd>
                      <DocumentInput
                        label="From"
                        hideLabel
                        value={editorDraft.from}
                        onChange={(value) =>
                          updateDraft((current) => ({
                            ...current,
                            from: value,
                          }))
                        }
                      />
                    </dd>
                  </div>
                  <div className="contents">
                    <dt className="pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Subject
                    </dt>
                    <dd>
                      <DocumentInput
                        label="Subject"
                        hideLabel
                        value={editorDraft.subject}
                        onChange={(value) =>
                          updateDraft((current) => ({
                            ...current,
                            subject: value,
                          }))
                        }
                      />
                    </dd>
                  </div>
                  <div className="contents">
                    <dt className="pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Date
                    </dt>
                    <dd>
                      <DocumentInput
                        label="Date"
                        hideLabel
                        value={editorDraft.date}
                        onChange={(value) =>
                          updateDraft((current) => ({
                            ...current,
                            date: value,
                          }))
                        }
                      />
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 space-y-8">
                <section className="space-y-4">
                  <h3 className="text-[1.35rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
                    Background
                  </h3>
                  <DocumentTextarea
                    label="Background"
                    hideLabel
                    rows={Math.max(6, editorDraft.background.split("\n").length || 1)}
                    value={editorDraft.background}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        background: value,
                      }))
                    }
                  />
                </section>

                <section className="space-y-4">
                  <h3 className="text-[1.35rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
                    Key issues
                  </h3>
                  <div className="space-y-4">
                    {editorDraft.sections.map((section, index) => (
                      <div
                        key={`${section.heading}-${index}`}
                        className="rounded-[18px] border border-stone-200/80 bg-stone-50/70 px-4 py-4"
                      >
                        <DocumentInput
                          label={`Section ${index + 1} heading`}
                          hideLabel
                          value={section.heading}
                          onChange={(value) =>
                            updateDraft((current) => ({
                              ...current,
                              sections: current.sections.map((existingSection, sectionIndex) =>
                                sectionIndex === index
                                  ? {
                                      ...existingSection,
                                      heading: value,
                                    }
                                  : existingSection,
                              ),
                            }))
                          }
                        />
                        <div className="mt-4">
                          <DocumentTextarea
                            label={`Section ${index + 1} content`}
                            hideLabel
                            rows={Math.max(5, section.content.split("\n").length || 1)}
                            value={section.content}
                            onChange={(value) =>
                              updateDraft((current) => ({
                                ...current,
                                sections: current.sections.map((existingSection, sectionIndex) =>
                                  sectionIndex === index
                                    ? {
                                        ...existingSection,
                                        content: value,
                                      }
                                    : existingSection,
                                ),
                              }))
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-4">
                  <h3 className="text-[1.15rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
                    Recommended actions
                  </h3>
                  <DocumentTextarea
                    label="Recommended actions"
                    hideLabel
                    rows={Math.max(5, editorDraft.recommendedActions.split("\n").length || 1)}
                    value={editorDraft.recommendedActions}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        recommendedActions: value,
                      }))
                    }
                  />
                </section>

                <section className="space-y-4">
                  <h3 className="text-[1.15rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
                    Client questions
                  </h3>
                  <DocumentTextarea
                    label="Client questions"
                    hideLabel
                    rows={Math.max(5, editorDraft.clientQuestions.split("\n").length || 1)}
                    value={editorDraft.clientQuestions}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        clientQuestions: value,
                      }))
                    }
                  />
                </section>

                <section className="space-y-4">
                  <h3 className="text-[1.15rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
                    Review note
                  </h3>
                  <DocumentTextarea
                    label="Review note"
                    hideLabel
                    rows={Math.max(4, editorDraft.reviewNote.split("\n").length || 1)}
                    value={editorDraft.reviewNote}
                    onChange={(value) =>
                      updateDraft((current) => ({
                        ...current,
                        reviewNote: value,
                      }))
                    }
                  />
                </section>
              </div>

              <footer className="mt-10 border-t border-stone-300 pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {viewModel.footerLabel}
              </footer>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
