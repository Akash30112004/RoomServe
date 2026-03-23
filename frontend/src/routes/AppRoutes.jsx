import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import MainLayout from '../layouts/MainLayout'
import MarketingLayout from '../layouts/MarketingLayout'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from './ProtectedRoute'

const LandingPage = lazy(() => import('../pages/marketing/LandingPage'))
const GuestRoomPage = lazy(() => import('../pages/guest/GuestRoomPage'))
const StaffDashboardPage = lazy(() => import('../pages/staff/StaffDashboardPage'))
const AdminDashboardPage = lazy(() => import('../pages/reception/AdminDashboardPage'))
const ManagerDashboardPage = lazy(() => import('../pages/manager/ManagerDashboardPage'))
const UnauthorizedPage = lazy(() => import('../pages/auth/UnauthorizedPage'))
const SimulatedLoginPage = lazy(() => import('../pages/auth/SimulatedLoginPage'))

function RouteSkeleton() {
  return (
    <div className="glass-card min-h-[220px] animate-pulse p-6">
      <div className="h-5 w-40 rounded-md bg-white/10" />
      <div className="mt-4 h-4 w-full rounded-md bg-white/10" />
      <div className="mt-2 h-4 w-4/5 rounded-md bg-white/10" />
    </div>
  )
}

function AppRoutes() {
  const { isAuthenticated, user, getLandingPath } = useAuth()

  return (
    <Suspense
      fallback={
        <div className="mx-auto mt-8 w-full max-w-5xl px-4 md:px-6">
          <RouteSkeleton />
        </div>
      }
    >
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<SimulatedLoginPage />} />
        </Route>

        <Route element={<GuestLayout />}>
          <Route path="/room/:token" element={<GuestRoomPage />} />
        </Route>

        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route element={<MainLayout />}>
          <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
            <Route path="/staff/dashboard" element={<StaffDashboardPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
            <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? getLandingPath(user.role) : '/auth/login'}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
