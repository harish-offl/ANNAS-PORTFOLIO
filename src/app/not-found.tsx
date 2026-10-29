import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-20">
      <span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(8rem,28vw,24rem)] font-extrabold leading-none tracking-[-0.08em] text-ghost"
        aria-hidden="true"
      >
        404
      </span>

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <span className="inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-ink">
          404
        </span>
        <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.05em] text-ink">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-body">
          This page has moved on. Let&apos;s get you back to the main portfolio.
        </p>
        <Link href="/" className="btn-dark mt-6 w-full">
          Back to home
        </Link>
      </div>
    </main>
  );
}
