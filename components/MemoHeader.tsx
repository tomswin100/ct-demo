import type { RenderedMemo } from "../lib/memoRenderer";
import { StatusBadge } from "./StatusBadge";

type MemoHeaderProps = {
  memo: RenderedMemo;
};

export function MemoHeader({ memo }: MemoHeaderProps) {
  return (
    <header className="border-b border-stone-200 pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
          {memo.title}
        </p>
        <StatusBadge label="Draft for review" tone="amber" />
      </div>

      <dl className="mt-5 grid gap-x-8 gap-y-3 border-y border-stone-200 py-5 sm:grid-cols-[150px_minmax(0,1fr)]">
        {memo.headerFields.map((field) => (
          <div key={field.label} className="contents">
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {field.label}
            </dt>
            <dd className="text-sm leading-7 text-slate-800">{field.value}</dd>
          </div>
        ))}
        {memo.sourceMaterialLabel ? (
          <>
            <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              SOURCE EMAILS
            </dt>
            <dd className="text-sm leading-7 text-slate-800">
              {memo.sourceMaterialLabel}
            </dd>
          </>
        ) : null}
      </dl>
    </header>
  );
}
