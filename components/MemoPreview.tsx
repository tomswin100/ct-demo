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
      <section className="rounded-[28px] border border-dashed border-slate-300 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.92))] p-10 text-center shadow-[0_20px_45px_-34px_rgba(15,23,42,0.2)]">
        <h2 className="mt-4 text-3xl text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
          No file note yet.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          Generate the drafted file note first.
        </p>
      </section>
    );
  }

  const renderedMemo = renderMemoFromJson(memoJson);

  return (
    <section className="rounded-[30px] border border-slate-200 bg-[linear-gradient(180deg,rgba(248,250,252,0.94),rgba(241,245,249,0.82))] p-4 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.28)] sm:p-6">
      <div className="rounded-[26px] border border-slate-300/80 bg-white p-6 shadow-[0_18px_40px_-34px_rgba(15,23,42,0.18)] sm:p-8">
        <MemoHeader memo={renderedMemo} />

        <div className="mt-6 rounded-[18px] border border-amber-200 bg-amber-50/90 px-4 py-3">
          <p className="text-sm leading-6 text-amber-950">
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
