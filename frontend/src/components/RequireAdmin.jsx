import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isAdmin } from '../auth/roles'

export default function RequireAdmin({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f7f7f7] text-sm text-[var(--ink-soft)]">
        Đang kiểm tra quyền admin...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin(user)) {
    return <Navigate to="/" replace />
  }

  return children
}
