import { Link, Outlet, useLocation } from 'react-router-dom'

const PANEL_COPY = {
  login: {
    kicker: 'Thành viên Zentro',
    title: (
      <>
        Mua sắm dễ dàng.
        <br />
        Nhận hàng tận nơi.
      </>
    ),
    description:
      'Đăng nhập để xem đơn hàng, lưu địa chỉ giao hàng và nhận ưu đãi dành riêng cho bạn.',
    highlights: [
      ['Miễn phí', 'Giao từ 99K'],
      ['7 ngày', 'Đổi trả dễ'],
      ['100%', 'Hàng chính hãng'],
    ],
  },
  register: {
    kicker: 'Tạo tài khoản mới',
    title: (
      <>
        Ưu đãi thành viên.
        <br />
        Mua lần đầu giảm thêm.
      </>
    ),
    description:
      'Chỉ mất một phút để mở tài khoản. Theo dõi đơn hàng, tích điểm và thanh toán nhanh hơn mỗi lần mua.',
    highlights: [
      ['Deal hot', 'Mỗi ngày'],
      ['Tích điểm', 'Đổi quà'],
      ['CSKH', 'Hỗ trợ 24/7'],
    ],
  },
}

const FORM_COPY = {
  login: {
    eyebrow: 'Tài khoản / Đăng nhập',
    title: 'Chào mừng trở lại',
    subtitle: 'Đăng nhập để xem giỏ hàng, theo dõi đơn và nhận ưu đãi thành viên.',
    footer: (
      <>
        Chưa có tài khoản?{' '}
        <Link
          to="/register"
          className="font-medium text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
        >
          Tạo tài khoản mới
        </Link>
      </>
    ),
  },
  register: {
    eyebrow: 'Tài khoản / Đăng ký',
    title: 'Tạo tài khoản',
    subtitle: 'Mở tài khoản để mua nhanh hơn, lưu địa chỉ giao hàng và nhận khuyến mãi.',
    footer: (
      <>
        Đã có tài khoản?{' '}
        <Link
          to="/login"
          className="font-medium text-[var(--ink)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
        >
          Đăng nhập
        </Link>
      </>
    ),
  },
}

export default function AuthLayout() {
  const location = useLocation()
  const mode = location.pathname.includes('register') ? 'register' : 'login'
  const isRegister = mode === 'register'
  const panel = PANEL_COPY[mode]
  const form = FORM_COPY[mode]

  return (
    <div className="relative min-h-svh overflow-hidden bg-[var(--paper)]">
      <aside
        className={[
          'auth-brand-panel absolute inset-y-0 left-0 z-20 hidden w-1/2 overflow-hidden bg-[var(--panel-dark)] text-white lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14',
          isRegister ? 'is-register' : 'is-login',
        ].join(' ')}
      >
        <div className="tech-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(18,184,134,0.28),transparent_68%)]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(90,120,255,0.16),transparent_70%)]" />

        <div className="relative z-10">
          <Link to="/" className="font-display text-2xl font-bold tracking-tight">
            Zentro
          </Link>
          <p className="font-mono-label mt-3 text-[11px] tracking-[0.22em] text-white/45 uppercase">
            Online store
          </p>
        </div>

        <div key={mode} className="auth-copy-fade relative z-10 max-w-md">
          <p className="font-mono-label scan-line text-[11px] tracking-[0.18em] text-[var(--accent)] uppercase">
            {panel.kicker}
          </p>
          <h2 className="font-display mt-4 text-4xl leading-[1.05] font-bold xl:text-5xl">{panel.title}</h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{panel.description}</p>

          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
            {panel.highlights.map(([value, label]) => (
              <div key={`${mode}-${label}`} className="border border-white/10 bg-white/[0.03] px-3 py-3">
                <p className="font-mono-label text-[10px] text-white/40">{value}</p>
                <p className="mt-1 text-sm font-medium text-white/85">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-mono-label relative z-10 text-[11px] text-white/35">
          Giao hàng toàn quốc · Thanh toán an toàn
        </p>
      </aside>

      <div className="relative z-10 grid min-h-svh lg:grid-cols-2">
        <section
          className={[
            'relative flex min-h-svh flex-col',
            isRegister ? 'lg:col-start-1' : 'lg:col-start-2',
          ].join(' ')}
        >
          <header className="flex items-center justify-between px-5 py-4 lg:hidden">
            <Link to="/" className="font-display text-xl font-bold tracking-tight">
              Zentro
            </Link>
            <span className="font-mono-label text-[10px] tracking-[0.16em] text-[var(--ink-soft)] uppercase">
              {isRegister ? 'Register' : 'Login'}
            </span>
          </header>

          <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 py-10 sm:px-8">
            <div key={mode} className="auth-rise">
              <p className="font-mono-label text-[11px] tracking-[0.2em] text-[var(--accent-deep)] uppercase">
                {form.eyebrow}
              </p>
              <h1 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{form.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{form.subtitle}</p>
            </div>

            <div key={`${mode}-form`} className="auth-rise mt-8" style={{ animationDelay: '60ms' }}>
              <Outlet />
            </div>

            <div key={`${mode}-footer`} className="auth-rise mt-7 text-sm text-[var(--ink-soft)]" style={{ animationDelay: '100ms' }}>
              {form.footer}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
