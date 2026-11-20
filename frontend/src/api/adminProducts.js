import { apiRequest } from './client'

export async function fetchAdminProducts(query = '') {
  const params = query ? `?q=${encodeURIComponent(query)}` : ''
  return apiRequest(`/api/admin/products${params}`)
}

export async function fetchCategoryOptions() {
  return apiRequest('/api/admin/categories/options')
}

export async function fetchProvinces() {
  return apiRequest('/api/admin/provinces')
}

export async function createAdminProduct(payload) {
  return apiRequest('/api/admin/products', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function updateAdminProduct(id, payload) {
  return apiRequest(`/api/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function updateProductActive(id, active) {
  return apiRequest(`/api/admin/products/${id}/active`, {
    method: 'PATCH',
    body: JSON.stringify({ active }),
  })
}

export async function deleteAdminProduct(id) {
  return apiRequest(`/api/admin/products/${id}`, {
    method: 'DELETE',
  })
}
