import type { SeverityLevel } from "../lib/workflowTypes";

type SeverityBadgeProps = {
  severity: SeverityLevel;
};

const toneClasses: Record<SeverityLevel, string> = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-neutral-200 bg-neutral-100 text-neutral-700",
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-none border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${toneClasses[severity]}`}
    >
      {severity}
    </span>
  );
}
