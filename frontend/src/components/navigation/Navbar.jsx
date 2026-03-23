import { Menu, UserCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'

function Navbar({ onMenuClick }) {
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('Logged out from simulated session')
    navigate('/auth/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-ink-800/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-ink-300 transition hover:border-accent-400/60 hover:text-accent-400 lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu size={18} />
          </button>

          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-accent-500 to-cyan-300" />
            <span className="text-base font-semibold tracking-wide text-ink-300">
              RoomServe
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-ink-300 sm:flex">
                <UserCircle2 size={16} className="text-accent-400" />
                <span>{user.name}</span>
              </div>

              <Button variant="ghost" className="px-3 py-2 text-xs" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => navigate('/auth/login')}>
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
