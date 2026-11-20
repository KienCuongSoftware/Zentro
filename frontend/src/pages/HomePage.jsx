import { useAuth } from '../auth/AuthContext'
import SiteHeader from '../components/SiteHeader'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5L8 5.5z" />
    </svg>
  )
}

export default function HomePage() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-white text-xs tracking-wider text-[var(--ink-soft)] uppercase">
        Đang tải...
      </div>
    )
  }

  return (
    <div className="min-h-svh bg-white text-[var(--ink)]">
      <div className="bg-[#111] px-4 py-2 text-center text-[12px] font-medium tracking-wide text-white/90 sm:text-[13px]">
        Giao hàng miễn phí cho đơn từ 499K · Đổi trả 7 ngày
      </div>

      <SiteHeader cartCount={0} />

      {/* Hero */}
      <main className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:py-20">
        <section className="auth-rise max-w-xl">
          <p className="text-[12px] font-semibold tracking-[0.14em] text-black uppercase">
            Cửa hàng trực tuyến của bạn
          </p>

          <h1 className="font-display mt-4 text-[2.4rem] leading-[1.08] font-extrabold tracking-tight text-black sm:text-5xl lg:text-[3.35rem]">
            Nâng tầm cách bạn mua sắm mỗi ngày.
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--ink-soft)] sm:text-base">
            Zentro mang đến trải nghiệm mua sắm gọn nhẹ: sản phẩm chính hãng, giao hàng nhanh và ưu đãi
            dành riêng cho thành viên.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#featured"
              className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
            >
              Khám phá sản phẩm
              <ArrowIcon />
            </a>
            <a
              href="#categories"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-5 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black text-white">
                <PlayIcon />
              </span>
              Xem danh mục
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div
                  key={letter}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#e8e8e8] text-[11px] font-bold text-black"
                  style={{ zIndex: 4 - index }}
                >
                  {letter}
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--ink-soft)]">
              <span className="font-semibold text-black">1.200+</span> khách đã mua sắm trên Zentro
            </p>
          </div>
        </section>

        <section className="auth-rise relative mx-auto w-full max-w-lg lg:max-w-none" style={{ animationDelay: '80ms' }}>
          <div className="home-hero-panel relative flex items-center justify-center overflow-visible rounded-[28px] bg-[#efefef] px-4 pb-10 pt-12 sm:px-8 sm:pb-12 sm:pt-14">
            {/* Soft glow behind laptop */}
            <div className="pointer-events-none absolute inset-x-10 top-16 bottom-16 rounded-full bg-white/80 blur-3xl" />

            {/* Laptop */}
            <div className="home-laptop relative z-10 w-full max-w-[420px]">
              {/* Lid / screen */}
              <div className="home-laptop-lid">
                <div className="home-laptop-bezel">
                  <span className="home-laptop-camera" />
                  <div className="home-laptop-screen">
                    <div className="home-screen-art" aria-hidden="true">
                      <span className="blob blob-a" />
                      <span className="blob blob-b" />
                      <span className="blob blob-c" />
                      <span className="ring ring-a" />
                      <span className="ring ring-b" />
                    </div>
                    <p className="home-screen-title">big idea.</p>
                  </div>
                </div>
              </div>

              {/* Hinge */}
              <div className="home-laptop-hinge" />

              {/* Base */}
              <div className="home-laptop-base">
                <div className="home-laptop-trackpad" />
              </div>
              <div className="home-laptop-shadow" />
            </div>

            {/* Floating badges */}
            <div className="absolute top-6 left-3 z-20 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:left-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white">
                  Z
                </span>
                <div>
                  <p className="text-[11px] font-semibold text-black">Chào bạn!</p>
                  <p className="text-[10px] text-[var(--ink-soft)]">Sẵn sàng mua sắm?</p>
                </div>
              </div>
            </div>

            <div className="absolute right-3 bottom-5 z-20 rounded-2xl bg-white px-3.5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.12)] sm:right-5 sm:bottom-7">
              <p className="text-[10px] tracking-wide text-[var(--ink-soft)] uppercase">Phù hợp</p>
              <p className="mt-0.5 text-sm font-bold text-black">98% dành cho bạn</p>
              <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-[#ececec]">
                <div className="h-full w-[98%] rounded-full bg-black" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Placeholder sections for nav anchors */}
      <section id="categories" className="border-t border-[var(--line)] bg-[#fafafa] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-black">Danh mục</p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Mua theo nhu cầu</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Điện thoại', 'Laptop', 'Phụ kiện', 'Âm thanh'].map((name) => (
              <div
                key={name}
                className="rounded-2xl border border-[var(--line)] bg-white px-5 py-8 text-center transition hover:border-black"
              >
                <p className="font-semibold">{name}</p>
                <p className="mt-1 text-sm text-[var(--ink-soft)]">Sắp ra mắt</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="border-t border-[var(--line)] bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-black">Nổi bật</p>
          <h2 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Sản phẩm đáng chú ý</h2>
          <p className="mt-3 max-w-lg text-sm text-[var(--ink-soft)]">
            Catalog đang được xây dựng. Đăng nhập để sẵn sàng mua khi sản phẩm lên kệ.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[#f7f7f7]">
                <div className="aspect-[4/3] bg-gradient-to-br from-[#ececec] to-[#dcdcdc]" />
                <div className="bg-white px-4 py-4">
                  <p className="font-medium">Sản phẩm mẫu {item}</p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">Coming soon</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-[var(--line)] bg-black px-5 py-16 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-white/50">Về Zentro</p>
            <h2 className="font-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              Mua sắm dễ dàng. Nhận hàng tận nơi.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Zentro hướng tới trải nghiệm ecommerce tối giản: nhanh, rõ ràng và đáng tin cậy — từ đăng nhập đến
              giao hàng.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/20 px-4 py-2">Miễn phí ship từ 499K</span>
            <span className="rounded-full border border-white/20 px-4 py-2">Đổi trả 7 ngày</span>
            <span className="rounded-full border border-white/20 px-4 py-2">Hàng chính hãng</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--line)] bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[var(--ink-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-black">© {new Date().getFullYear()} Zentro</p>
          <p>Giao hàng toàn quốc · Thanh toán an toàn</p>
        </div>
      </footer>
    </div>
  )
}
