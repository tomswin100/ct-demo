import type { ConfidenceLevel } from "../lib/workflowTypes";

type ConfidenceBadgeProps = {
  confidence: ConfidenceLevel;
};

const toneClasses: Record<ConfidenceLevel, string> = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-rose-200 bg-rose-50 text-rose-700",
};

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${toneClasses[confidence]}`}
    >
      {confidence}
    </span>
  );
}
