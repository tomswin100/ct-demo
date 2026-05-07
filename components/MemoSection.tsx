import type { RenderedMemoSection } from "../lib/memoRenderer";

type MemoSectionProps = {
  section: RenderedMemoSection;
};

export function MemoSection({ section }: MemoSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-[1.35rem] text-slate-950 [font-family:Georgia,Times_New_Roman,serif]">
        {section.heading}
      </h2>

      <div className="space-y-3">
        {section.paragraphs.map((paragraph) => (
          <div
            key={`${section.key}-${paragraph.number}`}
            className="grid grid-cols-[38px_minmax(0,1fr)] gap-3 rounded-[18px] border border-stone-200/80 bg-stone-50/70 px-4 py-3"
          >
            <div className="pt-0.5 text-right text-sm font-semibold text-slate-500">
              {paragraph.number}.
            </div>
            <p className="text-sm leading-7 text-slate-800">{paragraph.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
