import type { RenderedMemoSection } from "../lib/memoRenderer";

type MemoSectionProps = {
  section: RenderedMemoSection;
};

export function MemoSection({ section }: MemoSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-[1.35rem] tracking-tight text-brand-ink">
        {section.heading}
      </h2>

      <div className="space-y-3">
        {section.paragraphs.map((paragraph) => (
          <div
            key={`${section.key}-${paragraph.number}`}
            className="grid grid-cols-[38px_minmax(0,1fr)] gap-3 rounded-duna border border-brand-line/90 bg-brand-soft/70 px-4 py-3"
          >
            <div className="pt-0.5 text-right text-sm font-semibold text-brand-muted">
              {paragraph.number}.
            </div>
            <p className="text-sm leading-7 text-brand-ink/90">{paragraph.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
