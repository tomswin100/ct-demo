type WorkflowDiagramProps = {
  steps: Array<{
    label: string;
    active?: boolean;
    complete?: boolean;
  }>;
};

export function WorkflowDiagram({ steps }: WorkflowDiagramProps) {
  return (
    <section className="rounded-[30px] border border-blue-100 bg-white/90 p-5 shadow-[0_24px_60px_-36px_rgba(37,99,235,0.45)] backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {steps.map((step, index) => {
          const stateClasses = step.active
            ? "border-blue-300 bg-blue-50 text-blue-900"
            : step.complete
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-slate-200 bg-slate-50 text-slate-600";

          return (
            <div
              key={step.label}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <div
                className={`flex min-h-[76px] flex-1 items-center rounded-[24px] border px-4 py-3 transition-colors ${stateClasses}`}
              >
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">
                    Step {index + 1}
                  </p>
                  <p className="text-sm font-medium leading-6">{step.label}</p>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div className="hidden text-slate-300 lg:block">-&gt;</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
