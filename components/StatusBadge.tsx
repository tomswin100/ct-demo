type StatusBadgeProps = {
  label: string;
  tone?: "slate" | "blue" | "green" | "amber";
};

const toneClasses: Record<NonNullable<StatusBadgeProps["tone"]>, string> = {
  slate: "border-neutral-200 bg-neutral-100 text-neutral-700",
  blue: "border-emerald-200/80 bg-emerald-50 text-emerald-900",
  green: "border-emerald-200 bg-emerald-50 text-emerald-800",
  amber: "border-amber-200 bg-amber-50 text-amber-900",
};

export function StatusBadge({
  label,
  tone = "slate",
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-none border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}
