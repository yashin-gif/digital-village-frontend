import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import AuthLayout from '../../components/auth/AuthLayout'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/helpers'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ForgotPassword() {
  const { t } = useLanguage()
  const text = t.auth.forgot

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!EMAIL_PATTERN.test(email.trim())) {
      setError(t.auth.validation.emailInvalid)
      return
    }

    setError('')
    setSubmitting(true)

    try {
      await api.post('/auth/forgot-password', { email: email.trim() }, { auth: false })
      // কেউ ইমেইল আছে কি না বুঝতে না পারে, তাই সবসময় একই বার্তা
      setSent(true)
    } catch (err) {
      setSubmitError(getErrorMessage(err, t))
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
        <Link to="/login" className="font-bold text-brand-700 hover:underline">
          {text.backToLogin}
        </Link>
      }
    >
      {sent ? (
        <Alert type="success">{text.success}</Alert>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {submitError && <Alert>{submitError}</Alert>}

          <Input
            label={text.email}
            name="email"
            type="email"
            icon={Mail}
            autoComplete="email"
            placeholder={text.emailPlaceholder}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setError('')
            }}
            error={error}
          />

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? text.submitting : text.submit}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}