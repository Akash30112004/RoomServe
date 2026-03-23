import { useEffect, useMemo, useState } from 'react'
import { Activity, ChartNoAxesCombined, Timer, TrendingUp } from 'lucide-react'
import LoadingSkeleton from '../../components/feedback/LoadingSkeleton'
import {
  managerActivitySeed,
  managerKpiSeed,
  managerRequestTrendSeed,
  staffPerformanceSeed,
} from '../../services/mockData'

const iconByKpi = {
  'Total Requests': ChartNoAxesCombined,
  'Pending Tasks': Activity,
  'Completed Tasks': TrendingUp,
  'Avg Response Time': Timer,
}

function ManagerDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(timeout)
  }, [])

  const maxTrendValue = useMemo(
    () => Math.max(...managerRequestTrendSeed.map((item) => item.requests)),
    [],
  )

  return (
    <section className="space-y-5 md:space-y-6 fade-slide">
      <header>
        <p className="page-kicker">Manager</p>
        <h1 className="section-title">Insights Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">Track performance, monitor service velocity, and review operational trends.</p>
      </header>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <article key={index} className="glass-card p-4">
                <LoadingSkeleton className="h-4 w-2/5" />
                <LoadingSkeleton className="mt-3 h-8 w-1/2" />
                <LoadingSkeleton className="mt-3 h-3 w-3/4" />
              </article>
            ))
          : managerKpiSeed.map((kpi) => {
              const Icon = iconByKpi[kpi.label] ?? Activity

              return (
                <article key={kpi.id} className="glass-card p-4 transition duration-300 hover:-translate-y-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-ink-500">{kpi.label}</p>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-400">
                      <Icon size={16} />
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-white">{kpi.value}</p>
                  <p className="mt-2 text-xs text-ink-500">{kpi.trend}</p>
                </article>
              )
            })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-card p-4 md:p-5">
          <header className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-white">Request Trend</h2>
            <span className="text-xs text-ink-500">Last 7 days</span>
          </header>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <LoadingSkeleton key={index} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {managerRequestTrendSeed.map((item) => (
                <div key={item.day} className="grid grid-cols-[2.8rem_1fr_auto] items-center gap-3">
                  <span className="text-xs font-medium text-ink-500">{item.day}</span>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-cyan-300 transition-all duration-500"
                      style={{ width: `${(item.requests / maxTrendValue) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-white">{item.requests}</span>
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="glass-card p-4 md:p-5">
          <header className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-white">Recent Activity</h2>
            <span className="text-xs text-ink-500">Live feed</span>
          </header>

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="rounded-xl border border-white/10 p-3">
                  <LoadingSkeleton className="h-4 w-full" />
                  <LoadingSkeleton className="mt-2 h-3 w-1/4" />
                </div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2.5">
              {managerActivitySeed.map((activity) => (
                <li key={activity.id} className="rounded-xl border border-white/10 bg-white/5 p-3 transition hover:border-white/20">
                  <p className="text-sm text-ink-300">{activity.text}</p>
                  <p className="mt-1 text-xs text-ink-500">{activity.time}</p>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>

      <article className="glass-card overflow-hidden">
        <header className="border-b border-white/10 px-4 py-3 md:px-5">
          <h2 className="text-base font-semibold text-white">Staff Performance</h2>
        </header>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-[0.16em] text-ink-500">
              <tr>
                <th className="px-4 py-3 md:px-5">Staff Name</th>
                <th className="px-4 py-3 md:px-5">Tasks Completed</th>
                <th className="px-4 py-3 md:px-5">Avg Response</th>
                <th className="px-4 py-3 md:px-5">Delays</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="px-4 py-4 md:px-5"><LoadingSkeleton className="h-4 w-24" /></td>
                      <td className="px-4 py-4 md:px-5"><LoadingSkeleton className="h-4 w-12" /></td>
                      <td className="px-4 py-4 md:px-5"><LoadingSkeleton className="h-4 w-16" /></td>
                      <td className="px-4 py-4 md:px-5"><LoadingSkeleton className="h-4 w-10" /></td>
                    </tr>
                  ))
                : staffPerformanceSeed.map((staff) => (
                    <tr key={staff.id} className="border-t border-white/10">
                      <td className="px-4 py-4 font-medium text-white md:px-5">{staff.name}</td>
                      <td className="px-4 py-4 text-ink-300 md:px-5">{staff.tasksCompleted}</td>
                      <td className="px-4 py-4 text-ink-300 md:px-5">{staff.avgResponse}</td>
                      <td className="px-4 py-4 md:px-5">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            staff.delays <= 2 ? 'bg-emerald-300/10 text-emerald-200' : 'bg-amber-300/10 text-amber-200'
                          }`}
                        >
                          {staff.delays}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

export default ManagerDashboardPage
