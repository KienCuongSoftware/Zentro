import { createContext, useContext, useEffect, useState } from 'react'
import { fetchMe, login as loginApi, logout as logoutApi, register as registerApi } from '../api/auth'
import { getToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (!token) {
      setLoading(false)
      return
    }

    fetchMe()
      .then(setUser)
      .catch(() => {
        logoutApi()
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  async function register(payload) {
    const data = await registerApi(payload)
    setUser(data.user)
    return data
  }

  async function login(payload) {
    const data = await loginApi(payload)
    setUser(data.user)
    return data
  }

  function logout() {
    logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
