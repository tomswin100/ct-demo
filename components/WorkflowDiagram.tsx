type WorkflowDiagramProps = {
  steps: Array<{
    label: string;
    active?: boolean;
    complete?: boolean;
  }>;
};

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  return (
    <section className="rounded-duna-xl border border-brand-line bg-brand-surface/95 p-5 shadow-brand-float backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {steps.map((step, index) => {
          const stateClasses = step.active
            ? "border-emerald-500/40 bg-emerald-500/12 text-emerald-50"
            : step.complete
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-100"
              : "border-brand-line bg-brand-soft text-brand-muted";

          return (
            <div
              key={step.label}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <div
                className={`flex min-h-[76px] flex-1 items-center rounded-duna border px-4 py-3 transition-colors ${stateClasses}`}
              >
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                    Step {index + 1}
                  </p>
                  <p className="text-sm font-medium leading-6">{step.label}</p>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="hidden text-brand-line lg:block">-&gt;</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
