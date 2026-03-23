import { NavLink } from 'react-router-dom'
import { BriefcaseBusiness, Building2, LayoutDashboard, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navItemsByRole = {
  staff: [{ label: 'Staff Dashboard', to: '/staff/dashboard', icon: BriefcaseBusiness }],
  admin: [{ label: 'Reception Dashboard', to: '/admin/dashboard', icon: Building2 }],
  manager: [{ label: 'Manager Dashboard', to: '/manager/dashboard', icon: LayoutDashboard }],
}

function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth()
  const navItems = navItemsByRole[user?.role] ?? []

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/55 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-72 border-r border-white/10 bg-ink-900/95 p-5 shadow-card backdrop-blur-md transition-transform duration-300 lg:sticky lg:z-10 lg:h-[calc(100dvh-4rem)] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            Navigation
          </span>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-ink-300"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-accent-500/15 text-accent-400'
                      : 'text-ink-300 hover:bg-white/5 hover:text-white'
                  }`
                }
                onClick={onClose}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}

          {!navItems.length ? (
            <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink-500">
              No dashboard links available for this role.
            </p>
          ) : null}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
