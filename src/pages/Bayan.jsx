import { useMemo, useState } from 'react'
import { ExternalLink, Mic } from 'lucide-react'
import Button from '../components/common/Button'
import DataState from '../components/common/DataState'
import PageHeader from '../components/common/PageHeader'
import Pagination from '../components/common/Pagination'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import usePagedList from '../hooks/usePagedList'
import { formatDate } from '../utils/formatDate'

const PAGE_SIZE = 12

function todayIso() {
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  return new Date(now.getTime() - offset).toISOString().slice(0, 10)
}

// সব মসজিদের বয়ান এক জায়গায়; কিতাব পাঠের অগ্রগতি নিচে
export default function Bayan() {
  const { t, language } = useLanguage()
  const page = t.bayan
  const [filter, setFilter] = useState('upcoming')

  const today = todayIso()
  const params = { order: filter === 'past' ? 'desc' : 'asc' }
  if (filter === 'upcoming') params.session_date_from = today
  if (filter === 'past') params.session_date_to = today

  const sessions = usePagedList('/bayan/', { params, pageSize: PAGE_SIZE })

  // কিতাব ও পাঠের অগ্রগতি: এই দুটো তালিকা ছোট, তাই একবারে আনি
  const kitabs = useFetch('/kitab/')
  const progress = useFetch('/kitab-progress/?limit=200')

  const kitabGroups = useMemo(() => {
    const byKitab = new Map()
    ;(progress.data ?? []).forEach((row) => {
      if (!byKitab.has(row.kitab_id)) byKitab.set(row.kitab_id, [])
      byKitab.get(row.kitab_id).push(row)
    })
    return (kitabs.data ?? [])
      .filter((k) => byKitab.has(k.id))
      .map((k) => ({
        kitab: k,
        entries: byKitab.get(k.id).sort((a, b) => a.read_date.localeCompare(b.read_date)),
      }))
  }, [kitabs.data, progress.data])

  const tabs = [
    { key: 'upcoming', label: page.upcoming },
    { key: 'past', label: page.past },
    { key: 'all', label: page.all },
  ]

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-2">
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

          <DataState
            loading={sessions.loading && sessions.data.length === 0}
            error={sessions.error}
            isEmpty={sessions.data.length === 0}
            emptyIcon="🎙️"
            emptyTitle={page.empty}
            onRetry={sessions.reload}
          >
            <div className={`grid gap-5 md:grid-cols-2 ${sessions.loading ? 'opacity-60' : ''}`}>
              {sessions.data.map((session) => (
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

                  <div className="mt-4 space-y-1 text-sm text-slate-600">
                    {session.speaker_name && (
                      <p>
                        {page.speaker}: <span className="font-semibold text-slate-800">{session.speaker_name}</span>
                      </p>
                    )}
                    {session.mosque_name && <p>{page.mosque}: {session.mosque_name}</p>}
                  </div>

                  {session.description && <p className="mt-4 leading-7 text-slate-600">{session.description}</p>}

                  {session.media_url && (
                    <div className="mt-auto pt-5">
                      <a
                        href={session.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-brand-800 transition hover:border-brand-600 hover:bg-brand-50"
                      >
                        <ExternalLink size={16} />
                        {page.listen}
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </DataState>

          <Pagination page={sessions.page} pages={sessions.pages} onChange={sessions.setPage} />

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900">{page.kitabTitle}</h2>

            {kitabGroups.length === 0 ? (
              <p className="mt-4 text-slate-600">{page.kitabEmpty}</p>
            ) : (
              <div className="mt-6 space-y-6">
                {kitabGroups.map(({ kitab, entries }) => (
                  <div key={kitab.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900">{kitab.title}</h3>
                    {kitab.author && <p className="text-sm text-slate-500">{page.by} {kitab.author}</p>}

                    <ol className="mt-5 space-y-4 border-l-2 border-brand-100 pl-5">
                      {entries.map((entry) => (
                        <li key={entry.id} className="relative">
                          <span className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full bg-brand-600" />
                          <p className="text-sm font-semibold text-brand-700">
                            {page.readOn} {formatDate(entry.read_date, language)}
                          </p>
                          {(entry.from_reference || entry.to_reference) && (
                            <p className="text-sm text-slate-700">
                              {entry.from_reference && `${page.from} ${entry.from_reference}`}{' '}
                              {entry.to_reference && `${page.to} ${entry.to_reference}`}
                            </p>
                          )}
                          {entry.note && <p className="mt-1 text-sm text-slate-600">{entry.note}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
          </div>

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
