import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'

const roleLabels = {
  customer: 'Customer',
  receptionist: 'Receptionist',
  staff: 'Staff',
  manager: 'Manager',
}

function SimulatedLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { loginAs } = useAuth()

  const roleFromQuery = searchParams.get('as')
  const isValidRole = Boolean(roleFromQuery && roleLabels[roleFromQuery])
  const [name, setName] = useState('Alex Johnson')
  const [selectedRole, setSelectedRole] = useState(isValidRole ? roleFromQuery : '')

  const fallbackPath = useMemo(() => {
    if (!selectedRole) {
      return '/auth/login'
    }

    if (selectedRole === 'receptionist') {
      return '/admin/dashboard'
    }

    if (selectedRole === 'manager') {
      return '/manager/dashboard'
    }

    if (selectedRole === 'customer') {
      return '/room/ROOM501'
    }

    return '/staff/dashboard'
  }, [selectedRole])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!selectedRole) {
      toast.error('Please select a role to continue')
      return
    }

    if (selectedRole === 'customer') {
      toast.success('Customer access granted')
      navigate('/room/ROOM501', { replace: true })
      return
    }

    loginAs(selectedRole, name.trim() || 'Hotel Team Member')

    const fromPath = location.state?.from?.pathname
    toast.success(`${roleLabels[selectedRole] ?? 'User'} login successful`)
    navigate(fromPath ?? fallbackPath, { replace: true })
  }

  return (
    <section className="mx-auto w-full max-w-lg glass-card p-6 md:p-8 fade-slide">
      <p className="page-kicker">RoomServe Access</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">
        {selectedRole ? `${roleLabels[selectedRole]} Login` : 'Login'}
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        Choose any role below. Backend auth is not connected yet.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500">Role</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {Object.entries(roleLabels).map(([roleKey, label]) => (
              <button
                key={roleKey}
                type="button"
                onClick={() => setSelectedRole(roleKey)}
                className={`rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                  selectedRole === roleKey
                    ? 'border-accent-500/50 bg-accent-500/15 text-accent-300'
                    : 'border-white/15 bg-white/5 text-ink-300 hover:border-white/30 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {selectedRole !== 'customer' ? (
          <label className="block space-y-1">
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-ink-500">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
              placeholder="Team Member"
            />
          </label>
        ) : null}

        <Button type="submit" className="w-full" disabled={!selectedRole}>
          {selectedRole ? `Continue as ${roleLabels[selectedRole]}` : 'Select role to continue'}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-ink-500">This login page supports Customer, Receptionist, Staff, and Manager.</p>
    </section>
  )
}

export default SimulatedLoginPage
