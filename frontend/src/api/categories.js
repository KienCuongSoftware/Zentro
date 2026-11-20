import { apiRequest } from './client'

export async function fetchCategoryMenu() {
  return apiRequest('/api/categories/menu')
}
