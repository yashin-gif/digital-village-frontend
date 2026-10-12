import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { CalendarDays, Lock, Mail, MapPin, Phone, User, UserRound } from 'lucide-react'
import Alert from '../../components/common/Alert'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import AuthLayout from '../../components/auth/AuthLayout'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { getErrorMessage } from '../../utils/helpers'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ব্যাকেন্ডের পাড়ার তালিকার সাথে মিলিয়ে (app/schemas/auth.py)।
// মান সবসময় বাংলা থাকে, শুধু দেখানোর লেখা ভাষা অনুযায়ী বদলায়।
const PARAS = [
  'উত্তর পাড়া',
  'দক্ষিণ পাড়া',
  'নামা পাড়া',
  'আলুর চর',
  'বান্দের পাড়',
  'ঘেগা পাড়া',
  'ইছাপুরা',
  'কলনি',
  'মধ্য পাড়া',
]

const MIN_BIRTH_YEAR = 1900

// মোবাইল থেকে স্পেস, ড্যাশ ও +880 বাদ দিয়ে 01XXXXXXXXX বানায়
function cleanPhone(value) {
  let digits = value.replace(/[\s-]/g, '')
  if (digits.startsWith('+880')) digits = `0${digits.slice(4)}`
  else if (digits.startsWith('880')) digits = `0${digits.slice(3)}`
  return digits
}

// ব্যাকএন্ডের নিয়মের সাথে মিলিয়ে
function validate(form, v) {
  const errors = {}
  const username = form.username.trim()
  const fullName = form.fullName.trim()
  const email = form.email.trim()
  const phone = cleanPhone(form.phone)
  const birthYear = form.birthYear.trim()

  if (username.length < 3 || username.length > 50) errors.username = v.usernameLength
  if (fullName.length < 2 || fullName.length > 150) errors.fullName = v.fullNameLength
  if (email && !EMAIL_PATTERN.test(email)) errors.email = v.emailInvalid
  if (!/^01[3-9]\d{8}$/.test(phone)) errors.phone = v.phoneInvalid
  if (!PARAS.includes(form.para)) errors.para = v.paraRequired
  if (birthYear) {
    const year = Number(birthYear)
    const maxYear = new Date().getFullYear()
    if (!/^\d{4}$/.test(birthYear) || year < MIN_BIRTH_YEAR || year > maxYear) {
      errors.birthYear = v.birthYearInvalid
    }
  }
  if (form.password.length < 6 || form.password.length > 100) {
    errors.password = v.passwordLength
  }
  if (form.confirmPassword !== form.password) {
    errors.confirmPassword = v.passwordMismatch
  }

  return errors
}

export default function Register() {
  const { t } = useLanguage()
  const { register, user, loading } = useAuth()
  const navigate = useNavigate()
  const text = t.auth.register

  const [form, setForm] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    para: '',
    birthYear: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/dashboard" replace />

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextErrors = validate(form, t.auth.validation)
    setErrors(nextErrors)
    setSubmitError('')
    if (Object.keys(nextErrors).length > 0) return

    setSubmitting(true)

    const payload = {
      username: form.username.trim(),
      full_name: form.fullName.trim().replace(/\s+/g, ' '),
      phone: cleanPhone(form.phone),
      para: form.para,
      password: form.password,
    }
    // ইমেইল ফাঁকা থাকলে পাঠানো হবে না (ব্যাকেন্ড এটা ঐচ্ছিক হিসেবে নেয়)
    const email = form.email.trim()
    if (email) payload.email = email
    // জন্ম সাল ফাঁকা থাকলে পাঠানো হবে না (ঐচ্ছিক)
    const birthYear = form.birthYear.trim()
    if (birthYear) payload.birth_year = Number(birthYear)

    try {
      await register(payload)
      navigate('/dashboard', { replace: true })
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
          {text.haveAccount}{' '}
          <Link to="/login" className="font-bold text-brand-700 hover:underline">
            {text.login}
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {submitError && <Alert>{submitError}</Alert>}

        <Input
          label={text.fullName}
          name="fullName"
          icon={UserRound}
          autoComplete="name"
          placeholder={text.fullNamePlaceholder}
          value={form.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          label={text.username}
          name="username"
          icon={User}
          autoComplete="username"
          placeholder={text.usernamePlaceholder}
          value={form.username}
          onChange={handleChange}
          error={errors.username}
        />

        {/* ঠিকানা: শুধু দেখানো, বদলানো যাবে না। ভাষা অনুযায়ী লেখা বদলায়। */}
        <div className="rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-slate-700">
          <p className="mb-1 flex items-center gap-2 font-semibold text-brand-800">
            <MapPin size={16} />
            {text.addressInfo}
          </p>
          <p>
            {text.division}, {text.district}, {text.upazila}: {text.upazilaName},{' '}
            {text.village}: {text.villageName}
          </p>
        </div>

        <div>
          <label htmlFor="para" className="mb-1.5 block text-sm font-semibold text-slate-700">
            {text.para} <span className="text-rose-600">*</span>
          </label>
          <select
            id="para"
            name="para"
            value={form.para}
            onChange={handleChange}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
              errors.para ? 'border-rose-400' : 'border-slate-200'
            }`}
          >
            <option value="">{text.paraPlaceholder}</option>
            {PARAS.map((para) => (
              <option key={para} value={para}>
                {text.paraList?.[para] ?? para}
              </option>
            ))}
          </select>
          {errors.para && <p className="mt-1.5 text-sm font-medium text-rose-600">{errors.para}</p>}
        </div>

        <Input
          label={`${text.birthYear} (${text.optional})`}
          name="birthYear"
          type="number"
          icon={CalendarDays}
          inputMode="numeric"
          placeholder={text.birthYearPlaceholder}
          value={form.birthYear}
          onChange={handleChange}
          error={errors.birthYear}
        />

        <Input
          label={`${text.email} (${text.optional})`}
          name="email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder={text.emailPlaceholder}
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label={text.phone}
          name="phone"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          inputMode="tel"
          placeholder={text.phonePlaceholder}
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label={text.password}
          name="password"
          type="password"
          icon={Lock}
          autoComplete="new-password"
          placeholder={text.passwordPlaceholder}
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
    </AuthLayout>
  )
}