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
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-stone-200 bg-stone-50/70 px-4 py-3">
        <p className="text-sm leading-6 text-stone-600">
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
            className="overflow-hidden rounded-[22px] border border-stone-200 bg-white shadow-[0_14px_32px_-28px_rgba(15,23,42,0.22)]"
          >
            <div className="border-b border-stone-200 bg-stone-50/85 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base text-stone-950 [font-family:Georgia,Times_New_Roman,serif]">
                  {group.title}
                </h3>
                <StatusBadge label={`${group.items.length}`} tone={group.tone} />
              </div>
            </div>

            <div className="max-h-[28rem] space-y-2.5 overflow-y-auto p-3">
              {group.items.length === 0 ? (
                <p className="px-2 py-1 text-sm leading-6 text-stone-500">
                  No items in this group.
                </p>
              ) : null}

              {group.items.map((item) => {
                const itemKey = `${group.title}-${item.source}-${item.text}`;
                const isLegalIssue = "severity" in item;

                return (
                  <article
                    key={itemKey}
                    className="rounded-[16px] border border-stone-200 bg-stone-50/70 px-3 py-2.5"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.confidence ? (
                        <ConfidenceBadge confidence={item.confidence} />
                      ) : null}
                      <span className="inline-flex items-center rounded-full border border-stone-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-stone-600">
                        {item.category}
                      </span>
                      {isLegalIssue && item.severity ? (
                        <SeverityBadge severity={item.severity} />
                      ) : null}
                      {isLegalIssue && item.workstream ? (
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-700">
                          {item.workstream}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-stone-800">
                      {item.text}
                    </p>

                    <div className="mt-2 border-t border-stone-200 pt-2 text-[11px] leading-5 text-stone-500">
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
