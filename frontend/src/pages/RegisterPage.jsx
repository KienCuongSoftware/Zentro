import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { getHomePathForUser } from '../auth/roles'
import GoogleLoginButton from '../components/GoogleLoginButton'

export default function RegisterPage() {
  const { user, register, loginWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="font-mono-label py-8 text-center text-xs tracking-wider text-[var(--ink-soft)] uppercase">
        Syncing session...
      </div>
    )
  }

  if (user) {
    return <Navigate to={getHomePathForUser(user)} replace />
  }

  function updateField(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (form.password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }

    setSubmitting(true)
    try {
      const data = await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      })
      navigate(getHomePathForUser(data.user), { replace: true })
    } catch (err) {
      setError(err.message || 'Đăng ký thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-7">
      {error && (
        <div className="border border-[#ffb4b4] bg-[#fff5f5] px-3 py-2.5 text-sm text-[#9b1c1c]">
          {error}
        </div>
      )}

      <label className="block text-sm font-medium">
        <span className="font-mono-label text-[11px] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
          Họ và tên
        </span>
        <input
          required
          autoComplete="name"
          placeholder="Nguyễn Văn A"
          value={form.fullName}
          onChange={updateField('fullName')}
          className="auth-input"
        />
      </label>

      <label className="block text-sm font-medium">
        <span className="font-mono-label text-[11px] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="ban@email.com"
          value={form.email}
          onChange={updateField('email')}
          className="auth-input"
        />
      </label>

      <label className="block text-sm font-medium">
        <span className="font-mono-label text-[11px] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
          Mật khẩu
        </span>
        <div className="auth-field">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Tối thiểu 8 ký tự"
            value={form.password}
            onChange={updateField('password')}
            className="auth-input pr-14"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="auth-toggle"
          >
            {showPassword ? 'Ẩn' : 'Hiện'}
          </button>
        </div>
      </label>

      <label className="block text-sm font-medium">
        <span className="font-mono-label text-[11px] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
          Nhập lại mật khẩu
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Nhập lại mật khẩu"
          value={form.confirmPassword}
          onChange={updateField('confirmPassword')}
          className="auth-input"
        />
      </label>

      <button type="submit" disabled={submitting} className="auth-btn mt-1">
        {submitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
      </button>

      <div className="auth-divider">
        <span>hoặc</span>
      </div>

      <GoogleLoginButton
        onSuccess={async (accessToken) => {
          setError('')
          const data = await loginWithGoogle(accessToken)
          navigate(getHomePathForUser(data.user), { replace: true })
        }}
        onError={(err) => setError(err.message || 'Đăng ký Google thất bại')}
      />
    </form>
  )
}
