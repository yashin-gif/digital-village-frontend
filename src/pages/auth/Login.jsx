import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Lock, User } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import AuthLayout from '../../components/auth/AuthLayout'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { getErrorMessage } from '../../utils/helpers'

// মোবাইল নম্বর হলে স্পেস/ড্যাশ বাদ দিয়ে পাঠায়, নইলে ইউজারনেম যেমন আছে তেমন
function cleanLoginId(value) {
  const trimmed = value.trim()
  const digits = trimmed.replace(/[\s-]/g, '')
  if (/^(\+?880|0)1[3-9]\d{8}$/.test(digits)) {
    return digits.startsWith('+880') ? `0${digits.slice(4)}`
      : digits.startsWith('880') ? `0${digits.slice(3)}`
      : digits
  }
  return trimmed
}

export default function Login() {
  const { t } = useLanguage()
  const { login, user, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const text = t.auth.login
  // লগইনের পর আগের পেজে ফেরত পাঠায় (যেমন /blood-donors?group=A%2B)
  const from = location.state?.from
  const redirectTo = from ? `${from.pathname}${from.search || ''}` : '/dashboard'

  const [form, setForm] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // আগেই লগইন করা থাকলে সরাসরি ভেতরে পাঠিয়ে দেয়
  if (!loading && user) return <Navigate to={redirectTo} replace />

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!form.username.trim()) nextErrors.username = t.auth.validation.required
    if (!form.password) nextErrors.password = t.auth.validation.required

    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    try {
      await login(cleanLoginId(form.username), form.password)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setSubmitError(getErrorMessage(error, t))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      badge={text.badge}
      title={text.title}
      subtitle={text.subtitle}
      footer={
        <>
          {text.noAccount}{' '}
          <Link to="/register" className="font-bold text-brand-700 hover:underline">
            {text.register}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {submitError && <Alert>{submitError}</Alert>}

        <Input
          label={text.loginId}
          name="username"
          icon={User}
          autoComplete="username"
          placeholder={text.loginIdPlaceholder}
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label={text.password}
          name="password"
          type="password"
          icon={Lock}
          autoComplete="current-password"
          placeholder={text.passwordPlaceholder}
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            {text.forgot}
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? text.submitting : text.submit}
        </Button>
      </form>
    </AuthLayout>
  )
}