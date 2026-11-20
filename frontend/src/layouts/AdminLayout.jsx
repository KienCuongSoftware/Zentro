import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

const NAV_ITEMS = [
  { to: '/admin', label: 'Tổng quan', end: true },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/products', label: 'Sản phẩm' },
  { to: '/admin/orders', label: 'Đơn hàng', disabled: true },
  { to: '/admin/categories', label: 'Danh mục', disabled: true },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link to="/admin" className="admin-brand">
          <span className="admin-brand-mark">Z</span>
          <div>
            <p className="admin-brand-title">Zentro Admin</p>
            <p className="admin-brand-sub">Control panel</p>
          </div>
        </Link>

        <nav className="admin-nav">
          {NAV_ITEMS.map((item) =>
            item.disabled ? (
              <span key={item.to} className="admin-nav-item is-disabled">
                {item.label}
                <small>Soon</small>
              </span>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <div className="admin-sidebar-footer">
          <Link to="/" className="admin-nav-item">
            ← Về cửa hàng
          </Link>
          <button type="button" className="admin-nav-item admin-logout" onClick={logout}>
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-topbar-kicker">Quản trị</p>
            <h1 className="admin-topbar-title">Dashboard</h1>
          </div>
          <div className="admin-topbar-user">
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.fullName} referrerPolicy="no-referrer" />
            ) : (
              <span>{user?.fullName?.[0]?.toUpperCase() || 'A'}</span>
            )}
            <div>
              <p>{user?.fullName}</p>
              <small>{user?.email}</small>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
