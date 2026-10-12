import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Mic } from 'lucide-react'
import Button from '../components/common/Button'
import DataState from '../components/common/DataState'
import PageHeader from '../components/common/PageHeader'
import Pagination from '../components/common/Pagination'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import usePagedList from '../hooks/usePagedList'
import { formatDate } from '../utils/formatDate'

const PAGE_SIZE = 12

// আজকের তারিখ (স্থানীয়) YYYY-MM-DD
function todayIso() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

// একটা মসজিদের বয়ানের সূচি। আসন্ন বয়ান আগে, অতীত বয়ান সবচেয়ে নতুন আগে।
export default function MosqueBayan() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const text = t.mosqueBayan
  const [filter, setFilter] = useState('upcoming')

  const mosque = useFetch(`/mosques/${id}`)

  const today = todayIso()
  const params = { mosque_id: id, order: filter === 'past' ? 'desc' : 'asc' }
  if (filter === 'upcoming') params.session_date_from = today
  if (filter === 'past') params.session_date_to = today

  const list = usePagedList('/bayan/', { params, pageSize: PAGE_SIZE })

  const tabs = [
    { key: 'upcoming', label: t.bayan.upcoming },
    { key: 'past', label: t.bayan.past },
    { key: 'all', label: t.bayan.all },
  ]

  return (
    <>
      <PageHeader
        badge={text.badge}
        title={mosque.data?.name ?? text.title}
        text={mosque.data?.address ?? text.text}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  aria-pressed={filter === tab.key}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    filter === tab.key
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-brand-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <Link to="/mosques" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline">
              <ArrowLeft size={16} />
              {text.back}
            </Link>
          </div>

          <DataState
            loading={list.loading && list.data.length === 0}
            error={list.error}
            isEmpty={list.data.length === 0}
            emptyIcon="🎙️"
            emptyTitle={text.empty}
            onRetry={list.reload}
          >
            <div className={`grid gap-5 md:grid-cols-2 ${list.loading ? 'opacity-60' : ''}`}>
              {list.data.map((session) => (
                <article key={session.id} className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <Mic size={22} />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-700">{formatDate(session.session_date, language)}</p>
                      <h2 className="mt-1 text-lg font-bold text-slate-900">{session.title}</h2>
                    </div>
                  </div>

                  {session.speaker_name && (
                    <p className="mt-4 text-sm text-slate-600">
                      {t.bayan.speaker}: <span className="font-semibold text-slate-800">{session.speaker_name}</span>
                    </p>
                  )}

                  {session.description && <p className="mt-3 leading-7 text-slate-600">{session.description}</p>}

                  {session.media_url && (
                    <div className="mt-auto pt-5">
                      <a
                        href={session.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-brand-800 transition hover:border-brand-600 hover:bg-brand-50"
                      >
                        <ExternalLink size={16} />
                        {t.bayan.listen}
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </DataState>

          <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />

          <div className="mt-12 text-center">
            <Button to="/" variant="outline">
              {t.common.backHome}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
