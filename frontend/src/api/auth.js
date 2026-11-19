import { apiRequest, clearToken, setToken } from './client'

export async function register(payload) {
  const data = await apiRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  setToken(data.accessToken)
  return data
}

export async function login(payload) {
  const data = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  setToken(data.accessToken)
  return data
}

export async function loginWithGoogle(accessToken) {
  const data = await apiRequest('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ accessToken }),
  })
  setToken(data.accessToken)
  return data
}

export async function fetchMe() {
  return apiRequest('/api/auth/me')
}

export function logout() {
  clearToken()
}
