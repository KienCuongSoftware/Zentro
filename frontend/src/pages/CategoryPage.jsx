import { Link, useParams } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader'

export default function CategoryPage() {
  const { slug } = useParams()

  return (
    <div className="min-h-svh bg-white text-[var(--ink)]">
      <div className="bg-[#111] px-4 py-2 text-center text-[12px] font-medium tracking-wide text-white/90">
        Giao hàng miễn phí cho đơn từ 499K · Đổi trả 7 ngày
      </div>
      <SiteHeader cartCount={0} />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-black">Danh mục</p>
        <h1 className="font-display mt-2 text-3xl font-bold tracking-tight">{slug}</h1>
        <p className="mt-3 max-w-2xl text-sm text-[var(--ink-soft)]">
          Trang danh mục đã được nối với database. Catalog sản phẩm sẽ hiển thị tại đây ở bước tiếp theo.
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white">
          Về trang chủ
        </Link>
      </main>
    </div>
  )
}
