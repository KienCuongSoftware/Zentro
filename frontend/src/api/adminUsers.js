import { apiRequest } from './client'

export async function fetchAdminUsers(query = '') {
  const params = query ? `?q=${encodeURIComponent(query)}` : ''
  return apiRequest(`/api/admin/users${params}`)
}

export async function updateUserEnabled(userId, enabled) {
  return apiRequest(`/api/admin/users/${userId}/enabled`, {
    method: 'PATCH',
    body: JSON.stringify({ enabled }),
  })
}
