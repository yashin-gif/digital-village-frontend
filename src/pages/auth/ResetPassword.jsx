import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import AuthLayout from '../../components/auth/AuthLayout'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/helpers'

export default function ResetPassword() {
  const { t } = useLanguage()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const text = t.auth.reset

  const [form, setForm] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [done, setDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    const nextErrors = {}
    if (form.password.length < 6 || form.password.length > 100) {
      nextErrors.password = t.auth.validation.passwordLength
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = t.auth.validation.passwordMismatch
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    try {
      await api.post(
        '/auth/reset-password',
        { token, new_password: form.password },
        { auth: false },
      )
      setDone(true)
    } catch (error) {
      setSubmitError(getErrorMessage(error, t))
    } finally {
      setSubmitting(false)
    }
  }

  let content

  if (!token) {
    content = (
      <div className="space-y-4">
        <Alert>{text.missingToken}</Alert>
        <Button to="/forgot-password" size="lg" className="w-full">
          {text.requestAgain}
        </Button>
      </div>
    )
  } else if (done) {
    content = (
      <div className="space-y-4">
        <Alert type="success">{text.success}</Alert>
        <Button to="/login" size="lg" className="w-full">
          {text.goLogin}
        </Button>
      </div>
    )
  } else {
    content = (
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {submitError && <Alert>{submitError}</Alert>}

        <Input
          label={text.newPassword}
          name="password"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <Input
          label={text.confirmPassword}
          name="confirmPassword"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? text.submitting : text.submit}
        </Button>
      </form>
    )
  }

  return (
    <AuthLayout
      badge={text.badge}
      title={text.title}
      subtitle={text.subtitle}
      footer={
        <Link to="/login" className="font-bold text-brand-700 hover:underline">
          {t.auth.forgot.backToLogin}
        </Link>
      }
    >
      {content}
    </AuthLayout>
  )
}