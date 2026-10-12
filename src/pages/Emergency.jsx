import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Plus, ShieldAlert } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import Modal from '../components/common/Modal'
import ResourceForm from '../components/admin/ResourceForm'
import useAuth from '../hooks/useAuth'
import Pagination from '../components/common/Pagination'
import usePagedList from '../hooks/usePagedList'
import useLanguage from '../hooks/useLanguage'
import { api } from '../services/api'
import { ADMIN_RESOURCES } from '../utils/adminConfig'
import { formatDate } from '../utils/formatDate'
import { getErrorMessage, phoneHref } from '../utils/helpers'

// জরুরি সেবা: সক্রিয় রিপোর্ট সবাই দেখবে, লগইন করা সদস্য নতুন রিপোর্ট পাঠাতে পারবে
export default function Emergency() {
  const { t, language } = useLanguage()
  const { user } = useAuth()
  const page = t.admin.emergencyPage

  // শুধু সক্রিয় রিপোর্ট, সার্ভারে ফিল্টার করে, পাতা অনুযায়ী
  const list = usePagedList('/emergency/', { params: { status: 'active' }, pageSize: 12 })
  const active = list.data
  const { loading, error, reload } = list
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [sent, setSent] = useState(false)

  const handleReport = async (payload) => {
    setSaving(true)
    setFormError('')

    try {
      await api.post('/emergency/', payload, { auth: true })
      setOpen(false)
      setSent(true)
      reload()
    } catch (err) {
      setFormError(getErrorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold text-slate-500">
              {list.total} {page.found}
            </p>

            {user ? (
              <Button variant="danger" onClick={() => { setSent(false); setOpen(true) }}>
                <Plus size={18} />
                {page.report}
              </Button>
            ) : (
              <Button to="/login" variant="danger">
                {page.loginToReport}
              </Button>
            )}
          </div>

          {sent && (
            <div className="mt-6">
              <Alert type="success">{page.reported}</Alert>
            </div>
          )}

          <div className="mt-8">
            <DataState
              loading={loading}
              error={error}
              isEmpty={active.length === 0}
              emptyIcon="🛟"
              emptyTitle={page.emptyTitle}
              emptyText={page.emptyText}
              onRetry={reload}
            >
              <div className="grid gap-5 md:grid-cols-2">
                {active.map((item) => (
                  <article key={item.id} className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-700">
                        <ShieldAlert size={22} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold uppercase tracking-wide text-rose-700">
                          {t.admin.options.emergency_type[item.emergency_type] ?? item.emergency_type}
                        </span>
                        <h2 className="mt-1 text-lg font-bold text-slate-900">{item.title}</h2>
                      </div>
                    </div>

                    <p className="mt-4 leading-7 text-slate-600">{item.description}</p>

                    <div className="mt-4 space-y-1 text-sm text-slate-500">
                      {item.location && <p>📍 {item.location}</p>}
                      <p>{formatDate(item.created_at, language)}</p>
                    </div>

                    {item.contact_phone && (
                      <a
                        href={phoneHref(item.contact_phone)}
                        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-rose-700"
                      >
                        <Phone size={16} />
                        {page.call}: {item.contact_phone}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </DataState>
          </div>

          <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />

          <p className="mt-10 text-center text-sm text-slate-500">
            <Link to="/" className="font-semibold text-brand-700 hover:underline">
              ← {t.common.backHome}
            </Link>
          </p>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)} title={page.report}>
        {open && (
          <ResourceForm
            fields={ADMIN_RESOURCES.emergency.fields.filter((field) => field.name !== 'status')}
            saving={saving}
            error={formError}
            onSubmit={handleReport}
            onCancel={() => setOpen(false)}
          />
        )}
      </Modal>
    </>
  )
}
