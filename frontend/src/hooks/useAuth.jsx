/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)
const AUTH_STORAGE_KEY = 'roomserve.auth'

const defaultUser = {
  name: 'Alex Johnson',
  role: 'staff',
}

const roleLandingPath = {
  staff: '/staff/dashboard',
  admin: '/admin/dashboard',
  manager: '/manager/dashboard',
}

export const roleAliasMap = {
  customer: 'customer',
  receptionist: 'admin',
  staff: 'staff',
  manager: 'manager',
}

function loadAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!raw) {
      return {
        isAuthenticated: false,
        user: defaultUser,
      }
    }

    const parsed = JSON.parse(raw)
    return {
      isAuthenticated: Boolean(parsed?.isAuthenticated),
      user: {
        ...defaultUser,
        ...(parsed?.user ?? {}),
      },
    }
  } catch {
    return {
      isAuthenticated: false,
      user: defaultUser,
    }
  }
}

function persistAuthState(nextState) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState))
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(loadAuthState)
  const { isAuthenticated, user } = authState

  const loginAs = useCallback((role, name = defaultUser.name) => {
    const normalizedRole = roleAliasMap[role] ?? role

    const nextState = {
      isAuthenticated: true,
      user: {
        name,
        role: normalizedRole,
      },
    }

    persistAuthState(nextState)
    setAuthState(nextState)
  }, [])

  const logout = useCallback(() => {
    const nextState = {
      isAuthenticated: false,
      user,
    }

    persistAuthState(nextState)
    setAuthState(nextState)
  }, [user])

  const getLandingPath = useCallback(
    (role = user.role) => roleLandingPath[role] ?? '/staff/dashboard',
    [user.role],
  )

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      loginAs,
      logout,
      getLandingPath,
    }),
    [getLandingPath, isAuthenticated, loginAs, logout, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}
