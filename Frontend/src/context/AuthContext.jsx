import { useMemo, useState } from 'react'
import { loginUser, logoutUser } from '../services/authService'
import { AuthContext } from './AuthContextValue'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  async function login(credentials) {
    const nextUser = await loginUser(credentials)
    setUser(nextUser)
    return nextUser
  }

  async function logout() {
    await logoutUser()
    setUser(null)
  }

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}