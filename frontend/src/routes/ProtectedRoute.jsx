import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ allowedRoles = [] }) {
  const { isAuthenticated, user, getLandingPath } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={getLandingPath(user.role)} replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
