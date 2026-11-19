import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import GoogleLoginButton from '../components/GoogleLoginButton'

export default function LoginPage() {
  const { user, login, loginWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login({ email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 border border-[var(--line)] bg-[var(--panel)] p-6 sm:p-7">
      {error && (
        <div className="border border-[#ffb4b4] bg-[#fff5f5] px-3 py-2.5 text-sm text-[#9b1c1c]">
          {error}
        </div>
      )}

      <label className="block text-sm font-medium">
        <span className="font-mono-label text-[11px] tracking-[0.08em] text-[var(--ink-soft)] uppercase">
          Email
        </span>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="ban@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input pr-16"
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

      <button type="submit" disabled={submitting} className="auth-btn">
        {submitting ? 'Đang xác thực...' : 'Đăng nhập'}
      </button>

      <div className="auth-divider">
        <span>hoặc</span>
      </div>

      <GoogleLoginButton
        onSuccess={async (accessToken) => {
          setError('')
          await loginWithGoogle(accessToken)
          navigate('/', { replace: true })
        }}
        onError={(err) => setError(err.message || 'Đăng nhập Google thất bại')}
      />
    </form>
  )
}
