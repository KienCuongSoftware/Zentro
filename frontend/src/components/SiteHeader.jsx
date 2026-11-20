import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { isAdmin } from '../auth/roles'
import CategoryMegaMenu from './CategoryMegaMenu'

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 7h15l-1.4 8.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.6L5.2 4.5A2 2 0 0 0 3.3 3H2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.5c1.8-3.2 4.1-4.5 7-4.5s5.2 1.3 7 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

const LOCATIONS = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ']

export default function SiteHeader({ cartCount = 0 }) {
  const { user, logout } = useAuth()
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('Hà Nội')
  const [showCategories, setShowCategories] = useState(false)
  const [showLocations, setShowLocations] = useState(false)

  function handleSearch(event) {
    event.preventDefault()
  }

  return (
    <header className="site-header sticky top-0 z-50">
      <div className="site-header-inner">
        <Link to="/" className="site-logo">
          <span className="site-logo-mark">Z</span>
          <span className="site-logo-text">zentro</span>
        </Link>

        <div className="site-header-actions">
          <div className="relative">
            <button
              type="button"
              className={`site-chip ${showCategories ? 'is-open' : ''}`}
              onClick={() => {
                setShowCategories((prev) => !prev)
                setShowLocations(false)
              }}
            >
              <GridIcon />
              <span>Danh mục</span>
              <ChevronIcon />
            </button>
            <CategoryMegaMenu open={showCategories} onClose={() => setShowCategories(false)} />
          </div>

          <div className="relative hidden md:block">
            <button
              type="button"
              className="site-chip"
              onClick={() => {
                setShowLocations((prev) => !prev)
                setShowCategories(false)
              }}
            >
              <PinIcon />
              <span>{location}</span>
              <ChevronIcon />
            </button>
            {showLocations && (
              <div className="site-dropdown">
                {LOCATIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="site-dropdown-item"
                    onClick={() => {
                      setLocation(item)
                      setShowLocations(false)
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <form className="site-search" onSubmit={handleSearch}>
          <SearchIcon />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Bạn muốn mua gì hôm nay?"
            aria-label="Tìm kiếm sản phẩm"
          />
        </form>

        <a href="#featured" className="site-cart" aria-label={`Giỏ hàng (${cartCount})`}>
          <span className="hidden lg:inline">Giỏ hàng</span>
          <span className="site-cart-icon">
            <CartIcon />
            <span className="site-cart-badge">{cartCount}</span>
          </span>
        </a>

        {user ? (
          <div className="site-account">
            {isAdmin(user) && (
              <Link to="/admin" className="site-login-btn">
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName}
                referrerPolicy="no-referrer"
                className="site-avatar"
              />
            ) : (
              <span className="site-avatar site-avatar-fallback">
                {user.fullName?.[0]?.toUpperCase() || 'U'}
              </span>
            )}
            <button type="button" onClick={logout} className="site-login-btn">
              <span className="hidden sm:inline">Đăng xuất</span>
              <UserIcon />
            </button>
          </div>
        ) : (
          <Link to="/login" className="site-login-btn">
            <span>Đăng nhập</span>
            <UserIcon />
          </Link>
        )}
      </div>
    </header>
  )
}
