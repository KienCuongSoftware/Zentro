import { useEffect, useMemo, useState } from 'react'
import {
  createAdminProduct,
  deleteAdminProduct,
  fetchAdminProducts,
  fetchCategoryOptions,
  fetchProvinces,
  updateAdminProduct,
  updateProductActive,
} from '../../api/adminProducts'

const EMPTY_FORM = {
  name: '',
  brand: '',
  price: '',
  compareAtPrice: '',
  imageUrl: '',
  description: '',
  categoryId: '',
  active: true,
}

function formatMoney(value) {
  if (value == null) return '—'
  return Number(value).toLocaleString('vi-VN') + 'đ'
}

function buildStockMap(provinces, existingStocks = []) {
  const map = {}
  const byProvince = new Map((existingStocks || []).map((item) => [item.provinceId, item.quantity]))
  for (const province of provinces) {
    map[province.id] = String(byProvince.get(province.id) ?? 0)
  }
  return map
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [provinces, setProvinces] = useState([])
  const [query, setQuery] = useState('')
  const [provinceQuery, setProvinceQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [stockByProvince, setStockByProvince] = useState({})
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState(null)

  async function loadProducts(search = query) {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminProducts(search)
      setProducts(data)
    } catch (err) {
      setError(err.message || 'Không tải được sản phẩm')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts('')
    fetchCategoryOptions()
      .then(setCategories)
      .catch(() => setCategories([]))
    fetchProvinces()
      .then(setProvinces)
      .catch(() => setProvinces([]))
  }, [])

  const stats = useMemo(() => {
    const total = products.length
    const active = products.filter((item) => item.active).length
    const outOfStock = products.filter((item) => item.stock <= 0).length
    return { total, active, outOfStock }
  }, [products])

  const filteredProvinces = useMemo(() => {
    const q = provinceQuery.trim().toLowerCase()
    if (!q) return provinces
    return provinces.filter(
      (item) => item.name.toLowerCase().includes(q) || item.slug.toLowerCase().includes(q)
    )
  }, [provinces, provinceQuery])

  const totalProvinceStock = useMemo(() => {
    return Object.values(stockByProvince).reduce((sum, value) => sum + Number(value || 0), 0)
  }, [stockByProvince])

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setStockByProvince(buildStockMap(provinces))
    setProvinceQuery('')
    setShowForm(true)
  }

  function openEdit(product) {
    setEditing(product)
    setForm({
      name: product.name || '',
      brand: product.brand || '',
      price: product.price ?? '',
      compareAtPrice: product.compareAtPrice ?? '',
      imageUrl: product.imageUrl || '',
      description: product.description || '',
      categoryId: product.categoryId ? String(product.categoryId) : '',
      active: product.active,
    })
    setStockByProvince(buildStockMap(provinces, product.stocks))
    setProvinceQuery('')
    setShowForm(true)
  }

  function updateField(field) {
    return (event) => {
      const value = field === 'active' ? event.target.checked : event.target.value
      setForm((prev) => ({ ...prev, [field]: value }))
    }
  }

  function updateProvinceStock(provinceId) {
    return (event) => {
      const value = event.target.value
      setStockByProvince((prev) => ({ ...prev, [provinceId]: value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (provinces.length === 0) {
      setError('Chưa tải được danh sách tỉnh/thành')
      return
    }

    const stocks = provinces.map((province) => ({
      provinceId: province.id,
      quantity: Math.max(0, Number(stockByProvince[province.id] || 0)),
    }))

    setSaving(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim() || null,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice === '' ? null : Number(form.compareAtPrice),
      imageUrl: form.imageUrl.trim() || null,
      description: form.description.trim() || null,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      active: Boolean(form.active),
      stocks,
    }

    try {
      if (editing) {
        const updated = await updateAdminProduct(editing.id, payload)
        setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const created = await createAdminProduct(payload)
        setProducts((prev) => [created, ...prev])
      }
      setShowForm(false)
      setEditing(null)
      setForm(EMPTY_FORM)
      setStockByProvince({})
    } catch (err) {
      setError(err.message || 'Lưu sản phẩm thất bại')
    } finally {
      setSaving(false)
    }
  }

  async function handleToggleActive(product) {
    setBusyId(product.id)
    setError('')
    try {
      const updated = await updateProductActive(product.id, !product.active)
      setProducts((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      setError(err.message || 'Cập nhật trạng thái thất bại')
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Xoá sản phẩm "${product.name}"? Tồn kho theo tỉnh cũng sẽ bị xoá.`)) return
    setBusyId(product.id)
    setError('')
    try {
      await deleteAdminProduct(product.id)
      setProducts((prev) => prev.filter((item) => item.id !== product.id))
    } catch (err) {
      setError(err.message || 'Xoá sản phẩm thất bại')
    } finally {
      setBusyId(null)
    }
  }

  function handleSearch(event) {
    event.preventDefault()
    loadProducts(query)
  }

  function topStockProvinces(product) {
    return (product.stocks || [])
      .filter((item) => item.quantity > 0)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 2)
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Quản lý sản phẩm</h2>
          <p>Thêm, sửa, ẩn/hiện và xoá sản phẩm. Tồn kho theo từng tỉnh/thành.</p>
        </div>
        <div className="admin-header-actions">
          <form className="admin-search" onSubmit={handleSearch}>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm tên, hãng, slug..."
            />
            <button type="submit">Tìm</button>
          </form>
          <button type="button" className="admin-primary-btn" onClick={openCreate} disabled={provinces.length === 0}>
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <span>Tổng sản phẩm</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Đang bán</span>
          <strong>{stats.active}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Hết hàng</span>
          <strong>{stats.outOfStock}</strong>
        </div>
        <div className="admin-stat-card">
          <span>Tỉnh/TP (2025)</span>
          <strong>{provinces.length}</strong>
        </div>
      </div>

      {error && <div className="admin-alert">{error}</div>}

      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-muted">Đang tải sản phẩm...</p>
        ) : products.length === 0 ? (
          <p className="admin-muted">Chưa có sản phẩm nào.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="admin-product-cell">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} />
                      ) : (
                        <span className="admin-product-fallback">SP</span>
                      )}
                      <div>
                        <p>{product.name}</p>
                        <small>
                          {product.brand || '—'} · {product.slug}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{product.categoryName || '—'}</td>
                  <td>
                    <div>
                      <strong>{formatMoney(product.price)}</strong>
                      {product.compareAtPrice != null && (
                        <small className="admin-price-compare">{formatMoney(product.compareAtPrice)}</small>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      <strong>{product.stock}</strong>
                      <small className="admin-stock-hint">
                        {topStockProvinces(product)
                          .map((item) => `${item.provinceName}: ${item.quantity}`)
                          .join(' · ') || 'Chưa phân bổ'}
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-status ${product.active ? 'is-on' : 'is-off'}`}>
                      {product.active ? 'Đang bán' : 'Ẩn'}
                    </span>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button type="button" className="admin-action-btn" onClick={() => openEdit(product)}>
                        Sửa
                      </button>
                      <button
                        type="button"
                        className="admin-action-btn"
                        disabled={busyId === product.id}
                        onClick={() => handleToggleActive(product)}
                      >
                        {product.active ? 'Ẩn' : 'Hiện'}
                      </button>
                      <button
                        type="button"
                        className="admin-action-btn is-danger"
                        disabled={busyId === product.id}
                        onClick={() => handleDelete(product)}
                      >
                        Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <>
          <button type="button" className="admin-modal-backdrop" onClick={() => setShowForm(false)} />
          <div className="admin-modal admin-modal-wide" role="dialog" aria-label="Form sản phẩm">
            <div className="admin-modal-header">
              <h3>{editing ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h3>
              <button type="button" className="admin-action-btn" onClick={() => setShowForm(false)}>
                Đóng
              </button>
            </div>
            <form className="admin-form" onSubmit={handleSubmit}>
              <label>
                <span>Tên sản phẩm</span>
                <input required value={form.name} onChange={updateField('name')} placeholder="iPhone 16 Pro" />
              </label>
              <div className="admin-form-grid">
                <label>
                  <span>Hãng</span>
                  <input value={form.brand} onChange={updateField('brand')} placeholder="Apple" />
                </label>
                <label>
                  <span>Danh mục</span>
                  <select value={form.categoryId} onChange={updateField('categoryId')}>
                    <option value="">— Không chọn —</option>
                    {categories.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="admin-form-grid admin-form-grid-2">
                <label>
                  <span>Giá bán</span>
                  <input required type="number" min="0" step="1000" value={form.price} onChange={updateField('price')} />
                </label>
                <label>
                  <span>Giá gốc</span>
                  <input type="number" min="0" step="1000" value={form.compareAtPrice} onChange={updateField('compareAtPrice')} />
                </label>
              </div>
              <label>
                <span>Ảnh (URL)</span>
                <input value={form.imageUrl} onChange={updateField('imageUrl')} placeholder="https://..." />
              </label>
              <label>
                <span>Mô tả</span>
                <textarea rows={3} value={form.description} onChange={updateField('description')} />
              </label>
              <label className="admin-checkbox">
                <input type="checkbox" checked={form.active} onChange={updateField('active')} />
                <span>Đang bán</span>
              </label>

              <div className="admin-province-stock">
                <div className="admin-province-stock-header">
                  <div>
                    <h4>Tồn kho theo tỉnh/thành</h4>
                    <p>Nhập số lượng cho đủ {provinces.length} tỉnh/thành. Tổng hiện tại: <strong>{totalProvinceStock}</strong></p>
                  </div>
                  <input
                    type="search"
                    value={provinceQuery}
                    onChange={(event) => setProvinceQuery(event.target.value)}
                    placeholder="Nhập tên tỉnh thành"
                  />
                </div>
                <div className="admin-province-stock-grid">
                  {filteredProvinces.map((province) => (
                    <label key={province.id} className="admin-province-stock-item">
                      <span>{province.name}</span>
                      <input
                        type="number"
                        min="0"
                        required
                        value={stockByProvince[province.id] ?? '0'}
                        onChange={updateProvinceStock(province.id)}
                      />
                    </label>
                  ))}
                </div>
                {filteredProvinces.length === 0 && (
                  <p className="admin-muted">Không tìm thấy tỉnh/thành phù hợp.</p>
                )}
              </div>

              <div className="admin-form-actions">
                <button type="button" className="admin-action-btn" onClick={() => setShowForm(false)}>
                  Huỷ
                </button>
                <button type="submit" className="admin-primary-btn" disabled={saving}>
                  {saving ? 'Đang lưu...' : editing ? 'Cập nhật' : 'Tạo sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}
