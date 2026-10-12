import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HandHeart, ShieldAlert } from 'lucide-react'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import PageHeader from '../components/common/PageHeader'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { formatDate } from '../utils/formatDate'
import { api } from '../services/api'
import { getErrorMessage } from '../utils/helpers'

const REQUEST_TYPES = ['financial', 'medical', 'food', 'education', 'other']

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100'

// সাহায্যের আবেদন: লগইন করা সদস্য পাঠাবে, শুধু কল্যাণ কমিটি দেখবে
export default function Welfare() {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const text = t.welfare

  const [form, setForm] = useState({ request_type: 'financial', title: '', description: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const mine = useFetch(user ? '/my/help-requests' : null, { auth: true })

  const update = (name) => (event) => setForm((prev) => ({ ...prev, [name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    setSent(false)

    try {
      await api.post(
        '/help-requests/',
        {
          request_type: form.request_type,
          title: form.title.trim(),
          description: form.description.trim(),
          person_id: null,
        },
        { auth: true },
      )
      setForm({ request_type: 'financial', title: '', description: '' })
      setSent(true)
      mine.reload()
    } catch (err) {
      setError(getErrorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  const canSubmit = form.title.trim() && form.description.trim()

  return (
    <>
      <PageHeader badge={text.badge} title={text.title} text={text.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-rose-100 bg-rose-50/60 p-5 text-sm leading-7 text-rose-800">
            <ShieldAlert size={20} className="mt-1 shrink-0" />
            <p>
              {text.urgent}{' '}
              <Link to="/emergency" className="font-bold underline">
                {text.emergencyLink}
              </Link>
            </p>
          </div>

          {!user ? (
            <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
                <HandHeart size={28} />
              </span>
              <p className="mt-5 text-slate-600">{text.loginToApply}</p>
              <div className="mt-6">
                <Button to="/login">{text.loginToApply}</Button>
              </div>
            </div>
          ) : (
            <>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
              {sent && <Alert type="success">{text.success}</Alert>}
              {error && <Alert>{error}</Alert>}

              <div>
                <label htmlFor="help-type" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {text.requestType}
                </label>
                <select id="help-type" value={form.request_type} onChange={update('request_type')} className={inputClass}>
                  {REQUEST_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {text.types[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="help-title" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {text.subject}
                </label>
                <input
                  id="help-title"
                  value={form.title}
                  maxLength={200}
                  onChange={update('title')}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="help-description" className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {text.description}
                </label>
                <textarea
                  id="help-description"
                  rows={6}
                  value={form.description}
                  onChange={update('description')}
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={saving || !canSubmit}>
                  {saving ? text.submitting : text.submit}
                </Button>
              </div>
            </form>

            <div className="mt-12">
              <h2 className="text-xl font-bold text-slate-900">{t.myRequests.title}</h2>
              {mine.loading && <p className="mt-4 text-slate-500">…</p>}
              {!mine.loading && (mine.data ?? []).length === 0 && (
                <p className="mt-4 text-slate-600">{t.myRequests.empty}</p>
              )}
              <ul className="mt-4 space-y-3">
                {(mine.data ?? []).map((request) => (
                  <li key={request.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-bold text-slate-900">{request.title}</p>
                      <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                        {t.myRequests.status[request.status] ?? request.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      {text.types[request.request_type] ?? request.request_type} · {t.myRequests.sentOn} {formatDate(request.created_at, language)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
