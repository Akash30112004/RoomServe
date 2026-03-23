import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg items-center px-4">
      <section className="glass-card w-full p-6 text-center md:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-ink-500">Access</p>
        <h1 className="mt-2 text-2xl font-semibold text-white">Unauthorized</h1>
        <p className="mt-3 text-sm text-ink-500">
          Your current role does not have permission to access this page.
        </p>
        <Link
          to="/staff/dashboard"
          className="mt-5 inline-flex rounded-xl border border-accent-500/40 bg-accent-500/10 px-4 py-2 text-sm font-medium text-accent-400 transition hover:border-accent-400 hover:bg-accent-500/20"
        >
          Go to Staff Dashboard
        </Link>
      </section>
    </main>
  )
}

export default UnauthorizedPage
