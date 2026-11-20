export default function AdminDashboardPage() {
  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Tổng quan</h2>
          <p>Khu vực quản trị Zentro. Chọn mục bên trái để quản lý hệ thống.</p>
        </div>
      </div>

      <div className="admin-empty-card">
        <p className="admin-empty-title">Dashboard đang trống</p>
        <p className="admin-empty-text">
          Các thống kê doanh thu, đơn hàng, tồn kho sẽ được thêm sau. Hiện tại hãy dùng trang{' '}
          <strong>Người dùng</strong> để quản lý tài khoản.
        </p>
      </div>
    </div>
  )
}
