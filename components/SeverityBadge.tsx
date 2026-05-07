import type { SeverityLevel } from "../lib/workflowTypes";

type SeverityBadgeProps = {
  severity: SeverityLevel;
};

const toneClasses: Record<SeverityLevel, string> = {
  high: "border-rose-200 bg-rose-50 text-rose-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  low: "border-slate-200 bg-slate-100 text-slate-700",
};

export function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${toneClasses[severity]}`}
    >
      {severity}
    </span>
  );
}
