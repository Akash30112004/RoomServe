import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import Button from '../../components/common/Button'
import { useAuth } from '../../hooks/useAuth'

function StaffSignupPage() {
  const navigate = useNavigate()
  const { loginAs } = useAuth()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInput = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error('Please complete all fields')
      return
    }

    loginAs('staff', form.name.trim())
    toast.success('Staff account created (simulated)')
    navigate('/staff/dashboard', { replace: true })
  }

  return (
    <section className="mx-auto w-full max-w-lg glass-card p-6 md:p-8 fade-slide">
      <p className="page-kicker">Staff Signup</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Create your RoomServe account</h1>
      <p className="mt-2 text-sm text-ink-500">This is a frontend simulation until backend auth is connected.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Full Name</span>
          <input
            value={form.name}
            onChange={handleInput('name')}
            className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
            placeholder="John Carter"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Work Email</span>
          <input
            type="email"
            value={form.email}
            onChange={handleInput('email')}
            className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
            placeholder="staff@hotel.com"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-xs uppercase tracking-[0.16em] text-ink-500">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={handleInput('password')}
            className="w-full rounded-xl border border-white/15 bg-ink-900 px-3 py-2.5 text-sm text-ink-300 outline-none transition focus:border-accent-500"
            placeholder="Create password"
          />
        </label>

        <Button type="submit" className="w-full">Create Account</Button>
      </form>
    </section>
  )
}

export default StaffSignupPage
