import { Link, Outlet } from 'react-router-dom'
import { LifeBuoy, Sparkles, UserRound } from 'lucide-react'
import { useState } from 'react'
import roomserveSymbol from '../assets/roomserve-symbol.svg'

function MarketingLayout() {
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false)

  return (
    <div className="min-h-dvh text-ink-300">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-900/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src={roomserveSymbol} alt="RoomServe symbol" className="h-9 w-9 rounded-xl" />
            <span className="text-sm font-semibold tracking-[0.14em] text-white sm:text-base">ROOMSERVE</span>
          </Link>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLoginMenuOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-ink-300 transition hover:border-white/30 hover:text-white sm:text-sm"
            >
              <UserRound size={14} />
              Login
            </button>

            {isLoginMenuOpen ? (
              <div className="absolute right-0 top-11 z-40 w-52 rounded-xl border border-white/10 bg-ink-900 p-2 shadow-card">
                <Link
                  to="/auth/login?as=customer"
                  onClick={() => setIsLoginMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  Login as Customer
                </Link>
                <Link
                  to="/auth/login?as=receptionist"
                  onClick={() => setIsLoginMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  Login as Receptionist
                </Link>
                <Link
                  to="/auth/login?as=staff"
                  onClick={() => setIsLoginMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  Login as Staff
                </Link>
                <Link
                  to="/auth/login?as=manager"
                  onClick={() => setIsLoginMenuOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-300 transition hover:bg-white/5 hover:text-white"
                >
                  Login as Manager
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 bg-ink-900/70">
        <div className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-3 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-ink-500">RoomServe</p>
            <p className="mt-2 text-sm text-ink-300">Hotel request operations, faster and cleaner for guests and staff.</p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Highlights</p>
            <p className="flex items-center gap-2 text-sm text-ink-300"><Sparkles size={14} className="text-accent-400" /> Mobile-first dashboards</p>
            <p className="flex items-center gap-2 text-sm text-ink-300"><LifeBuoy size={14} className="text-accent-400" /> Real-time request visibility</p>
          </div>

          <div className="md:text-right">
            <p className="text-xs uppercase tracking-[0.16em] text-ink-500">Support</p>
            <p className="mt-2 text-sm text-ink-300">support@roomserve.app</p>
            <p className="mt-1 text-xs text-ink-500">2026 RoomServe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MarketingLayout
