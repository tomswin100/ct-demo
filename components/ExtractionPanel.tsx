import type {
  ExtractedFact,
  ExtractedInstruction,
  ExtractedLegalIssue,
  ExtractedTimeConstraint,
  ExtractedWorkflowData,
} from "../lib/workflowTypes";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";

type ExtractionPanelProps = {
  data: ExtractedWorkflowData;
};

type ExtractionGroup =
  | {
      title: string;
      tone: "blue" | "slate";
      items: Array<ExtractedFact | ExtractedInstruction | ExtractedTimeConstraint>;
    }
  | {
      title: string;
      tone: "amber";
      items: ExtractedLegalIssue[];
    };

export function ExtractionPanel({ data }: ExtractionPanelProps) {
  const groups: ExtractionGroup[] = [
    {
      title: "Key Facts",
      tone: "blue",
      items: data.keyFacts ?? [],
    },
    {
      title: "Instructions",
      tone: "slate",
      items: data.instructions,
    },
    {
      title: "Legal Issues",
      tone: "amber",
      items: data.legalIssues,
    },
    {
      title: "Time Constraints",
      tone: "slate",
      items: data.timeConstraints,
    },
  ];

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-duna border border-brand-line bg-brand-soft/70 px-4 py-3">
        <p className="text-sm leading-6 text-brand-muted">
          Structured extraction from the source emails.
        </p>
        <StatusBadge
          label={`${groups.reduce((sum, group) => sum + group.items.length, 0)} items`}
          tone="blue"
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        {groups.map((group) => (
          <section
            key={group.title}
            className="overflow-hidden rounded-duna border border-brand-line bg-brand-surface shadow-brand-float"
          >
            <div className="border-b border-brand-line bg-brand-soft/85 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-base tracking-tight text-brand-ink">
                  {group.title}
                </h3>
                <StatusBadge label={`${group.items.length}`} tone={group.tone} />
              </div>
            </div>

            <div className="max-h-[28rem] space-y-2.5 overflow-y-auto p-3">
              {group.items.length === 0 ? (
                <p className="px-2 py-1 text-sm leading-6 text-brand-muted">
                  No items in this group.
                </p>
              ) : null}

              {group.items.map((item) => {
                const itemKey = `${group.title}-${item.source}-${item.text}`;
                const isLegalIssue = "severity" in item;

                return (
                  <article
                    key={itemKey}
                    className="rounded-none border border-brand-line bg-brand-soft/70 px-3 py-2.5"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.confidence ? (
                        <ConfidenceBadge confidence={item.confidence} />
                      ) : null}
                      <span className="inline-flex items-center rounded-none border border-brand-line bg-brand-bg px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-muted">
                        {item.category}
                      </span>
                      {isLegalIssue && item.severity ? (
                        <SeverityBadge severity={item.severity} />
                      ) : null}
                      {isLegalIssue && item.workstream ? (
                        <span className="inline-flex items-center rounded-none border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100">
                          {item.workstream}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-brand-ink/90">
                      {item.text}
                    </p>

                    <div className="mt-2 border-t border-brand-line pt-2 text-[11px] leading-5 text-brand-muted">
                      {item.source}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
