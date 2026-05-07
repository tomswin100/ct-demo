"use client";

import { StatusBadge } from "./StatusBadge";

type JsonSchemaViewerProps = {
  value: unknown;
};

export function JsonSchemaViewer({ value }: JsonSchemaViewerProps) {
  const formattedJson = JSON.stringify(value, null, 2);

  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-slate-100 shadow-[0_30px_60px_-38px_rgba(15,23,42,0.85)]">
      <div className="border-b border-slate-800 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.94))] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge label="Structured output" tone="blue" />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">Validated JSON</p>
          </div>
        </div>
      </div>

      <pre className="overflow-x-auto px-5 py-5 text-sm leading-7 text-slate-200">
        <code>{formattedJson}</code>
      </pre>
    </section>
  );
}
