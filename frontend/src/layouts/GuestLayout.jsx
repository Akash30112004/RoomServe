import { Outlet } from 'react-router-dom'

function GuestLayout() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <Outlet />
    </div>
  )
}

export default GuestLayout
