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
    <aside className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.3)]">
      <div className="px-2 pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workflow navigation
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
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
              className={`w-full rounded-[22px] border p-4 text-left transition ${
                isCurrent
                  ? "border-blue-300 bg-blue-50 shadow-[0_18px_35px_-24px_rgba(37,99,235,0.6)]"
                  : "border-slate-200 bg-slate-50/80 hover:border-slate-300 hover:bg-white disabled:cursor-not-allowed disabled:opacity-75"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Step {stage.stepNumber}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-slate-900">
                    {stage.navTitle}
                  </p>
                </div>
                <StatusBadge label={status.label} tone={status.tone} />
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {stage.explanation}
              </p>

              {!status.available ? (
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-amber-700">
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
