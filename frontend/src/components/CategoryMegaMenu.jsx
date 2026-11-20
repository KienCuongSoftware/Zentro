import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchCategoryMenu } from '../api/categories'

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const ICONS = {
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M11 18.5h2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  laptop: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2 19h20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  audio: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 14a4 4 0 0 1 4-4h1v8H8a4 4 0 0 1-4-4z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 10l8-3v10l-8-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  watch: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 3.5h6M9 20.5h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  home: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  accessory: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  pc: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  tv: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  'trade-in': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17 3v4h4M7 21v-4H3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  used: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  promo: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  news: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
}

function CategoryIcon({ name }) {
  return ICONS[name] || ICONS.accessory
}

export default function CategoryMegaMenu({ open, onClose }) {
  const [categories, setCategories] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) {
      setActiveId(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError('')
    setActiveId(null)

    fetchCategoryMenu()
      .then((data) => {
        if (cancelled) return
        setCategories(data.categories || [])
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Không tải được danh mục')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [open])

  const activeCategory = useMemo(
    () => categories.find((item) => item.id === activeId) || null,
    [categories, activeId]
  )

  const showPanel = Boolean(activeCategory)

  if (!open) return null

  return (
    <>
      <button type="button" className="mega-backdrop" aria-label="Đóng danh mục" onClick={onClose} />
      <div
        className={`mega-menu ${showPanel ? 'has-panel' : 'sidebar-only'}`}
        role="dialog"
        aria-label="Danh mục sản phẩm"
        onMouseLeave={() => setActiveId(null)}
      >
        <aside className="mega-sidebar">
          {loading && <p className="mega-status">Đang tải danh mục...</p>}
          {error && <p className="mega-status mega-error">{error}</p>}
          {!loading &&
            !error &&
            categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`mega-sidebar-item ${activeId === category.id ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveId(category.id)}
                onFocus={() => setActiveId(category.id)}
              >
                <span className="mega-sidebar-main">
                  <CategoryIcon name={category.icon} />
                  <span>{category.name}</span>
                </span>
                <ChevronRight />
              </button>
            ))}
        </aside>

        {showPanel && (
          <div className="mega-panel" onMouseEnter={() => setActiveId(activeCategory.id)}>
            <div className="mega-columns">
              {activeCategory.groups?.map((group) => (
                <div key={group.id} className="mega-column">
                  <h3 className="mega-column-title">{group.name}</h3>
                  <ul className="mega-column-list">
                    {group.items?.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/categories/${item.slug}`}
                          className="mega-link"
                          onClick={onClose}
                        >
                          <span>{item.name}</span>
                          {item.badge && <span className="mega-badge">{item.badge}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
