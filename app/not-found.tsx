import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="text-[80px] font-bold mb-4 text-gradient-primary">404</h1>
        <h2 className="text-[32px] font-semibold mb-4">Page not found</h2>
        <p className="text-text-secondary mb-8">The page you're looking for doesn't exist.</p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 rounded-full bg-accent-primary text-bg-base font-semibold hover:bg-[#00B8D9] transition"
        >
          ← Go home
        </Link>
      </div>
    </main>
  );
}
