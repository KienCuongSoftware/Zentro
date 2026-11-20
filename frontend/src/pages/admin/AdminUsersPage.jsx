import { useEffect, useMemo, useState } from 'react'
import { fetchAdminUsers, updateUserEnabled } from '../../api/adminUsers'
import { useAuth } from '../../auth/AuthContext'
import { formatRoleLabel } from '../../auth/roles'

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString('vi-VN')
}

function formatProviderLabel(provider) {
  const value = (provider || 'LOCAL').toUpperCase()
  if (value === 'GOOGLE') return 'Google'
  if (value === 'LOCAL') return 'Email'
  return provider
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  async function loadUsers(search = query) {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminUsers(search)
      setUsers(data)
    } catch (err) {
      setError(err.message || 'Không tải được danh sách người dùng')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers('')
  }, [])

  const stats = useMemo(() => {
    const total = users.length
    const active = users.filter((item) => item.enabled).length
    const admins = users.filter((item) => item.roles?.includes('ROLE_ADMIN')).length
    return { total, active, admins }
  }, [users])

  async function handleToggle(user) {
    const nextEnabled = !user.enabled
    setBusyId(user.id)
    setError('')
    try {
      const updated = await updateUserEnabled(user.id, nextEnabled)
      setUsers((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      setError(err.message || 'Cập nhật trạng thái thất bại')
    } finally {
      setBusyId(null)
    }
  }

  function handleSearch(event) {
    event.preventDefault()
    loadUsers(query)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Quản lý người dùng</h2>
          <p>Xem danh sách tài khoản, tìm kiếm và khoá / mở khoá người dùng.</p>
        </div>
        <form className="admin-search" onSubmit={handleSearch}>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm theo email hoặc tên..."
          />
          <button type="submit">Tìm</button>
        </form>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span>Tổng user</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Đang hoạt động</span>
          <strong>{stats.active}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Admin</span>
          <strong>{stats.admins}</strong>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-muted">Đang tải người dùng...</p>
        ) : users.length === 0 ? (
          <p className="admin-muted">Không có người dùng nào.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Người dùng</th>
                <th>Đăng nhập bằng</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Tạo lúc</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isSelf = user.email === currentUser?.email
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="admin-user-cell">
                        {user.avatarUrl ? (
                          <img src={user.avatarUrl} alt={user.fullName} referrerPolicy="no-referrer" />
                        ) : (
                          <span>{user.fullName?.[0]?.toUpperCase() || 'U'}</span>
                        )}
                        <div>
                          <p>{user.fullName}</p>
                          <small>{user.email}</small>
                        </div>
                      </div>
                    </td>
                    <td>{formatProviderLabel(user.authProvider)}</td>
                    <td>
                      <div className="admin-role-list">
                        {user.roles?.map((role) => (
                          <span key={role} className="admin-role-chip">
                            {formatRoleLabel(role)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status ${user.enabled ? 'is-on' : 'is-off'}`}>
                        {user.enabled ? 'Hoạt động' : 'Đã khoá'}
                      </span>
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      <button
                        type="button"
                        className="admin-action-btn"
                        disabled={busyId === user.id || isSelf}
                        onClick={() => handleToggle(user)}
                        title={isSelf ? 'Không thể tự khoá chính mình' : undefined}
                      >
                        {busyId === user.id
                          ? '...'
                          : user.enabled
                            ? 'Khoá'
                            : 'Mở khoá'}
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
