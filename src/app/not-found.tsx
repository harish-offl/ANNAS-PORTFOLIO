import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <div className="max-w-md">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404
        </p>
        <h1 className="font-heading text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
