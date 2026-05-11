"use client";

import { StatusBadge } from "./StatusBadge";

type JsonSchemaViewerProps = {
  value: unknown;
};

export function JsonSchemaViewer({ value }: JsonSchemaViewerProps) {
  const formattedJson = JSON.stringify(value, null, 2);

  return (
    <section className="overflow-hidden rounded-duna-lg border border-emerald-900/30 bg-neutral-950 text-neutral-100 shadow-brand-card">
      <div className="border-b border-emerald-950/80 bg-[linear-gradient(135deg,rgba(10,46,38,0.95),rgba(14,24,22,0.98))] px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge label="Structured output" tone="blue" />
            </div>
            <p className="mt-3 text-sm leading-7 text-emerald-100/85">
              Validated JSON
            </p>
          </div>
        </div>
      </div>

      <pre className="overflow-x-auto px-5 py-5 text-sm leading-7 text-neutral-200">
        <code>{formattedJson}</code>
      </pre>
    </section>
  );
}
