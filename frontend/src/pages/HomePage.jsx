import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function HomePage() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[var(--paper)] font-mono-label text-xs tracking-wider text-[var(--ink-soft)] uppercase">
        Syncing session...
      </div>
    )
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-[var(--paper)] text-[var(--ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_20%_0%,rgba(18,184,134,0.12),transparent_42%),radial-gradient(circle_at_90%_10%,rgba(90,120,255,0.1),transparent_36%)]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          Zentro
        </Link>
        <div className="flex items-center gap-2 text-sm">
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="border border-[var(--line)] bg-white px-3.5 py-2 hover:border-[var(--ink)]"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <Link to="/login" className="px-3.5 py-2 text-[var(--ink-soft)] hover:text-[var(--ink)]">
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-[var(--ink)] px-3.5 py-2 font-medium text-white hover:bg-[#1a2030]"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="auth-rise relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-24">
        <section>
          <p className="font-mono-label text-[11px] tracking-[0.22em] text-[var(--accent-deep)] uppercase">
            Zentro commerce
          </p>
          <h1 className="font-display mt-4 max-w-xl text-5xl leading-[0.95] font-extrabold tracking-tight sm:text-6xl">
            Cửa hàng
            <br />
            trực tuyến.
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--ink-soft)]">
            Nền tảng bán hàng gọn nhẹ: auth JWT đã sẵn, tiếp theo là catalog, giỏ hàng và đơn hàng.
          </p>

          {user ? (
            <div className="mt-8 flex max-w-md items-center gap-4 border border-[var(--line)] bg-white p-5">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.fullName}
                  referrerPolicy="no-referrer"
                  className="h-14 w-14 rounded-full object-cover border border-[var(--line)]"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--paper)] text-lg font-semibold">
                  {user.fullName?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-mono-label text-[11px] tracking-[0.16em] text-[var(--ink-soft)] uppercase">
                  Signed in
                </p>
                <p className="mt-1 truncate text-lg font-semibold">{user.fullName}</p>
                <p className="mt-0.5 truncate text-sm text-[var(--ink-soft)]">{user.email}</p>
                <p className="mt-2 font-mono-label text-[11px] text-[var(--accent-deep)]">
                  {user.roles?.join(' · ')}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="bg-[var(--ink)] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1a2030]"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="border border-[var(--line)] bg-white px-5 py-2.5 text-sm font-semibold hover:border-[var(--ink)]"
              >
                Tạo tài khoản
              </Link>
            </div>
          )}
        </section>

        <aside className="border border-[var(--line)] bg-white p-5 sm:p-6">
          <p className="font-mono-label text-[11px] tracking-[0.18em] text-[var(--ink-soft)] uppercase">
            Build roadmap
          </p>
          <ul className="mt-5 space-y-3">
            {[
              ['Done', 'Auth JWT + Login/Register'],
              ['Done', 'Google OAuth login'],
              ['Next', 'Catalog sản phẩm'],
              ['Soon', 'Cart & Checkout'],
            ].map(([state, label]) => (
              <li
                key={label}
                className="flex items-center justify-between border border-[var(--line)] px-3 py-3"
              >
                <span className="text-sm font-medium">{label}</span>
                <span
                  className={`font-mono-label text-[10px] tracking-[0.14em] uppercase ${
                    state === 'Done' ? 'text-[var(--accent-deep)]' : 'text-[var(--ink-soft)]'
                  }`}
                >
                  {state}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </main>
    </div>
  )
}
