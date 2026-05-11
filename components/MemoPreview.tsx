import type { MemoJson } from "../lib/workflowTypes";
import { renderMemoFromJson } from "../lib/memoRenderer";
import { MemoHeader } from "./MemoHeader";
import { MemoSection } from "./MemoSection";

type MemoPreviewProps = {
  memoJson: MemoJson | null;
};

export function MemoPreview({ memoJson }: MemoPreviewProps) {
  if (!memoJson) {
    return (
      <section className="rounded-duna-lg border border-dashed border-brand-line bg-[linear-gradient(180deg,rgba(255,253,248,0.98),rgba(243,237,229,0.98))] p-10 text-center shadow-brand-float">
        <h2 className="mt-4 font-display text-3xl tracking-tight text-brand-ink">
          No file note yet.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted">
          Generate the drafted file note first.
        </p>
      </section>
    );
  }

  const renderedMemo = renderMemoFromJson(memoJson);

  return (
    <section className="rounded-duna-xl border border-brand-line bg-[linear-gradient(180deg,rgba(255,253,248,0.98),rgba(243,237,229,0.98))] p-4 shadow-brand-card sm:p-6">
      <div className="rounded-duna-xl border border-brand-line bg-brand-surface p-6 shadow-brand-float sm:p-8">
        <MemoHeader memo={renderedMemo} />

        <div className="mt-6 rounded-none border border-amber-300 bg-amber-50/90 px-4 py-3">
          <p className="text-sm leading-6 text-amber-900">
            {renderedMemo.warningLabel}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          {renderedMemo.sections.map((section) => (
            <MemoSection key={section.key} section={section} />
          ))}
        </div>
      </div>
    </section>
  );
}
