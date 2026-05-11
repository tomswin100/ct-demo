import type { StageDefinition } from "../lib/constants";
import type { WorkflowStage } from "../lib/workflowTypes";
import { StatusBadge } from "./StatusBadge";

type StageNavigationProps = {
  stages: StageDefinition[];
  currentStage: WorkflowStage;
  stageStatuses: Record<
    WorkflowStage,
    {
      label: string;
      tone: "slate" | "blue" | "green" | "amber";
      available: boolean;
      complete: boolean;
    }
  >;
  onSelect: (stage: WorkflowStage) => void;
};

export function StageNavigation({
  stages,
  currentStage,
  stageStatuses,
  onSelect,
}: StageNavigationProps) {
  return (
    <aside className="rounded-duna-lg border border-brand-line/90 bg-brand-surface p-4 shadow-brand-float">
      <div className="px-2 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
          Workflow navigation
        </p>
        <p className="mt-2 text-sm leading-6 text-brand-muted">
          Each stage stays separate so the reviewer can see where source
          material ends and presentation layers begin.
        </p>
      </div>

      <nav className="space-y-2">
        {stages.map((stage) => {
          const status = stageStatuses[stage.id];
          const isCurrent = currentStage === stage.id;

          return (
            <button
              key={stage.id}
              type="button"
              onClick={() => onSelect(stage.id)}
              disabled={!status.available && !isCurrent}
              className={`w-full rounded-duna border p-4 text-left transition ${
                isCurrent
                  ? "border-emerald-500/40 bg-emerald-500/10 shadow-[0_18px_35px_-24px_rgba(62,152,126,0.35)]"
                  : "border-brand-line bg-brand-soft/80 hover:border-brand-muted/40 hover:bg-brand-surface disabled:cursor-not-allowed disabled:opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-muted">
                    Step {stage.stepNumber}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-brand-ink">
                    {stage.navTitle}
                  </p>
                </div>
                <StatusBadge label={status.label} tone={status.tone} />
              </div>

              <p className="mt-3 text-sm leading-6 text-brand-muted">
                {stage.explanation}
              </p>

              {!status.available ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-amber-300">
                  Locked until earlier stage is prepared
                </p>
              ) : null}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
