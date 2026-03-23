import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-dvh text-ink-300">
      <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="mx-auto grid max-w-[1400px] lg:grid-cols-[18rem_1fr]">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
