import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChartNoAxesCombined,
  ClipboardList,
  DoorOpen,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import roomserveSymbol from '../../assets/roomserve-symbol.svg'

const featureCards = [
  {
    title: 'Guest Experience',
    text: 'Guests request service in seconds using room QR and token links.',
    icon: DoorOpen,
  },
  {
    title: 'Staff Workflow',
    text: 'Teams pick up, update, and complete requests with clear status visibility.',
    icon: ClipboardList,
  },
  {
    title: 'Operations View',
    text: 'Reception and managers monitor room state, SLAs, and team performance.',
    icon: LayoutDashboard,
  },
]

const roleLinks = [
  { label: 'Customer', to: '/auth/login?as=customer' },
  { label: 'Receptionist', to: '/auth/login?as=receptionist' },
  { label: 'Staff', to: '/auth/login?as=staff' },
  { label: 'Manager', to: '/auth/login?as=manager' },
]

const aboutCards = [
  {
    title: 'What',
    text: 'One connected workspace for requests, room operations, and service delivery.',
  },
  {
    title: 'Who',
    text: 'Built for front desk teams, service staff, and hotel managers.',
  },
  {
    title: 'Why',
    text: 'Faster response time, better visibility, and smoother guest experience.',
  },
]

function LandingPage() {
  return (
    <section className="relative space-y-6 md:space-y-8 fade-slide">
      <div className="pointer-events-none absolute left-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 text-accent-400">
        <Sparkles size={16} />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 text-accent-400">
        <ShieldCheck size={16} />
      </div>

      <article className="glass-card overflow-hidden">
        <div className="grid gap-6 p-6 md:grid-cols-[1.08fr_0.92fr] md:p-8">
          <div>
            <p className="page-kicker">RoomServe Platform</p>
            <h1 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-5xl">
              Hotel service operations,
              <span className="block text-accent-400">without the chaos.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-ink-300 md:text-base">
              Track requests, assign tasks, and monitor room service flow from one clean dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/auth/login"
                className="inline-flex items-center gap-2 rounded-xl bg-accent-500 px-4 py-2.5 text-sm font-semibold text-ink-900 transition hover:bg-accent-400"
              >
                Login
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/room/ROOM501"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-ink-300 transition hover:border-white/30 hover:text-white"
              >
                View Guest Demo
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {roleLinks.map((role) => (
                <Link
                  key={role.label}
                  to={role.to}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-ink-300 transition hover:border-accent-500/40 hover:text-white"
                >
                  {role.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent-500/20 via-cyan-300/10 to-transparent p-4 md:p-5">
            <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/15 bg-ink-900/70 p-3">
              <img src={roomserveSymbol} alt="RoomServe mark" className="h-10 w-10 rounded-lg" />
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500">Flow Snapshot</p>
                <p className="text-sm font-medium text-white">From request to completion</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-ink-500">1. Guest raises request</p>
                <p className="mt-1 text-sm font-medium text-white">QR room request in seconds</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-ink-500">2. Staff executes task</p>
                <p className="mt-1 text-sm font-medium text-white">Live status from pending to complete</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs text-ink-500">3. Management tracks KPI</p>
                <p className="mt-1 text-sm font-medium text-white">Performance and response insights</p>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="grid gap-3 sm:grid-cols-3">
        <div className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Request Handling</p>
          <p className="mt-2 text-2xl font-semibold text-white">24/7</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Response Visibility</p>
          <p className="mt-2 text-2xl font-semibold text-white">Real-time</p>
        </div>
        <div className="glass-card p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Team Views</p>
          <p className="mt-2 text-2xl font-semibold text-white">Role-Based</p>
        </div>
      </article>

      <article className="grid gap-3 md:grid-cols-3">
        {featureCards.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="glass-card p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-400">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">{feature.title}</h2>
              <p className="mt-2 text-sm text-ink-500">{feature.text}</p>
            </div>
          )
        })}
      </article>

      <article className="glass-card p-6 md:p-7">
        <p className="page-kicker">About</p>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-white">Built for hotels that move fast</h2>
          <ChartNoAxesCombined className="hidden text-accent-400 md:block" size={20} />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {aboutCards.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500">{item.title}</p>
              <p className="mt-2 text-sm text-white">{item.text}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default LandingPage
