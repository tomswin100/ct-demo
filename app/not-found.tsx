import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-bg px-6 py-16 text-brand-ink">
      <section className="w-full max-w-2xl rounded-duna-xl border border-brand-line bg-brand-surface p-8 shadow-brand-card sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-muted">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-brand-muted sm:text-base">
          The page you requested does not exist in this demo. Head back to the
          landing page or reopen the workflow.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-none bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
          >
            Go home
          </Link>
          <Link
            href="/demo"
            className="inline-flex rounded-none border border-brand-line bg-brand-soft px-5 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-surface"
          >
            Open demo
          </Link>
        </div>
      </section>
    </main>
  );
}
