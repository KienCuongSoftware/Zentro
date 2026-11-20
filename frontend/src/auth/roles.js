export function isAdmin(user) {
  return Boolean(user?.roles?.some((role) => role === 'ROLE_ADMIN' || role === 'ADMIN'))
}

export function getHomePathForUser(user) {
  return isAdmin(user) ? '/admin' : '/'
}

const ROLE_LABELS = {
  ROLE_ADMIN: 'Quản trị viên',
  ADMIN: 'Quản trị viên',
  ROLE_USER: 'Người dùng',
  USER: 'Người dùng',
}

export function formatRoleLabel(role) {
  if (!role) return '—'
  return ROLE_LABELS[role] || role.replace(/^ROLE_/, '')
}
