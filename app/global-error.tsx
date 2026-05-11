"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-bg text-brand-ink">
        <main className="flex min-h-screen items-center justify-center px-6 py-16">
          <section className="w-full max-w-2xl rounded-duna-xl border border-brand-line bg-brand-surface p-8 shadow-brand-card sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-muted">
              Fatal error
            </p>
            <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              The app needs a fresh start
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">
              A root-level error interrupted rendering. Retry the page to bring
              the demo back.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex rounded-none bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
            >
              Reload app
            </button>
            {error.digest ? (
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-brand-muted">
                Ref {error.digest}
              </p>
            ) : null}
          </section>
        </main>
      </body>
    </html>
  );
}
