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
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.35)]">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                Stage boundary
              </p>
              <StatusBadge label={statusLabel} tone={statusTone} />
            </div>
            <h2 className="mt-2 text-2xl text-slate-900 [font-family:Georgia,Times_New_Roman,serif]">
              {title}
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-slate-600">
            {explanation}
          </p>
        </div>

        <div className="grid gap-4 rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Input
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{inputLabel}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Output
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {outputLabel}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              This stage does not do
            </p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
              {doesNotDo.map((item) => (
                <li key={item} className="rounded-2xl bg-white px-3 py-2">
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
