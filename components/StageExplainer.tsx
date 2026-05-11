import { StatusBadge } from "./StatusBadge";

type StageExplainerProps = {
  title: string;
  explanation: string;
  doesNotDo: string[];
  inputLabel: string;
  outputLabel: string;
  statusLabel: string;
  statusTone: "slate" | "blue" | "green" | "amber";
};

export function StageExplainer({
  title,
  explanation,
  doesNotDo,
  inputLabel,
  outputLabel,
  statusLabel,
  statusTone,
}: StageExplainerProps) {
  return (
    <section className="rounded-duna-lg border border-brand-line/80 bg-brand-surface p-6 shadow-brand-card">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-muted">
                Stage boundary
              </p>
              <StatusBadge label={statusLabel} tone={statusTone} />
            </div>
            <h2 className="mt-2 font-display text-2xl tracking-tight text-brand-ink">
              {title}
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-brand-muted">
            {explanation}
          </p>
        </div>

        <div className="grid gap-4 rounded-duna-lg border border-brand-line bg-brand-soft/80 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
              Input
            </p>
            <p className="mt-2 text-sm leading-6 text-brand-ink/90">{inputLabel}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
              Output
            </p>
            <p className="mt-2 text-sm leading-6 text-brand-ink/90">
              {outputLabel}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted">
              This stage does not do
            </p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-brand-ink/90">
              {doesNotDo.map((item) => (
                <li
                  key={item}
                  className="rounded-none border border-brand-line bg-brand-bg px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
