"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6 py-16 text-brand-ink">
      <section className="w-full max-w-2xl rounded-duna-xl border border-brand-line bg-brand-surface p-8 shadow-brand-card sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-muted">
          Application error
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">
          The page hit an unexpected error. Try the action again to recover the
          current session.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex rounded-none bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
