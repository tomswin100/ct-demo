import Link from "next/link";

const pillars = [
  {
    title: "Designed to convert",
    body: "Turn dense email threads into a clean, partner-ready file note without losing the underlying structure.",
  },
  {
    title: "Built to scale",
    body: "Structured extraction keeps JSON consistent so teams can review, edit, and export from one surface.",
  },
  {
    title: "Audit-friendly flow",
    body: "Walk from source correspondence to final document with clear stage boundaries and export options.",
  },
];

const featureRows = [
  {
    label: "Onboard",
    headline: "Start from real threads",
    copy: "Load installed example matters, step through messages, and keep context visible while you work.",
  },
  {
    label: "Decide",
    headline: "Separate facts from noise",
    copy: "Extraction surfaces instructions, issues, timing, and key facts so nothing important is buried in replies.",
  },
  {
    label: "Deliver",
    headline: "Export with confidence",
    copy: "Edit the memo inline, inspect JSON, then print or download a PDF when the draft is ready.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink">
      <header className="sticky top-0 z-50 border-b border-brand-line/80 bg-brand-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-brand-ink"
          >
            CT Demo
          </Link>
          <nav
            className="flex items-center gap-6 text-sm font-medium text-brand-muted"
            aria-label="Primary"
          >
            <Link
              href="/demo"
              className="transition hover:text-brand-ink"
            >
              Product demo
            </Link>
            <Link
              href="/demo"
              className="rounded-none bg-brand-accent px-4 py-2 text-white shadow-brand-float transition hover:bg-brand-accent-hover"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-mesh border-b border-brand-line/60">
          <div className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24 lg:px-8">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-brand-accent-muted">
              Legal workflow
            </p>
            <h1 className="animate-fade-up-delay mt-5 max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-brand-ink sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              <span className="text-balance">
                The new standard in email-to-memo workflows.
              </span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted sm:text-xl">
              Meet an interactive demo that accelerates review, automates
              structured extraction, and gets you to a polished file note
              faster.
            </p>
            <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center rounded-none bg-brand-accent px-7 py-3.5 text-sm font-semibold text-white shadow-brand-card transition hover:bg-brand-accent-hover"
              >
                Open the demo
              </Link>
              <Link
                href="#pillars"
                className="inline-flex items-center justify-center rounded-none border border-brand-line bg-brand-surface px-7 py-3.5 text-sm font-semibold text-brand-ink transition hover:border-brand-muted/40 hover:bg-brand-soft"
              >
                Explore capabilities
              </Link>
            </div>
            <p className="mt-14 text-sm font-medium text-brand-muted">
              Built for teams where accuracy and speed both matter.
            </p>
          </div>
        </section>

        <section
          id="pillars"
          className="border-b border-brand-line/60 bg-brand-surface py-20 sm:py-24"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">
              Designed to convert. Built to scale.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-muted">
              The same principles that power modern compliance platforms —
              clarity, structure, and operator trust — applied to legal file
              notes.
            </p>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {pillars.map((item) => (
                <article
                  key={item.title}
                  className="rounded-duna-lg border border-brand-line bg-brand-bg/50 p-8 shadow-brand-float transition hover:border-brand-accent/20 hover:shadow-brand-card"
                >
                  <h3 className="font-display text-xl font-semibold tracking-tight text-brand-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent-muted">
              Product
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">
              AI-assisted, human in control.
            </h2>
            <p className="mt-4 max-w-2xl text-base text-brand-muted">
              Structured extraction multiplies throughput without handing off
              judgment. You stay in the loop from thread to PDF.
            </p>

            <div className="mt-16 space-y-12">
              {featureRows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-8 border-b border-brand-line/70 pb-12 last:border-0 last:pb-0 md:grid-cols-[140px_minmax(0,1fr)] md:gap-12"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-accent-muted">
                    {row.label}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl font-medium tracking-tight text-brand-ink">
                      {row.headline}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-muted">
                      {row.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 rounded-duna-xl border border-brand-line bg-brand-surface p-10 shadow-brand-card sm:p-12">
              <h3 className="font-display text-2xl font-medium tracking-tight text-brand-ink">
                Safe and transparent
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-muted">
                This demo runs structured extraction against your selected
                thread and shows the resulting memo and JSON side by side — so
                every change is visible before export.
              </p>
              <Link
                href="/demo"
                className="mt-8 inline-flex rounded-none bg-brand-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent-hover"
              >
                Launch workflow
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-brand-line bg-brand-soft/80 py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
            <p className="text-sm text-brand-muted">
              © {new Date().getFullYear()} CT Demo — demonstration interface.
            </p>
            <Link
              href="/demo"
              className="text-sm font-semibold text-brand-accent transition hover:text-brand-accent-hover"
            >
              Go to demo →
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
