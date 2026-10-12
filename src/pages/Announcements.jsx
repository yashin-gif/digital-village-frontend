import { CalendarDays } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import NewsTabs from '../components/news/NewsTabs'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { formatDate } from '../utils/formatDate'

export default function Announcements() {
  const { t, language } = useLanguage()
  const page = t.announcements
  const { data, loading, error, reload } = useFetch('/announcements/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <NewsTabs />
          </div>

          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="📢"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="space-y-4">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-amber-100 bg-amber-50/40 p-6"
                >
                  <time className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                    <CalendarDays size={14} />
                    {formatDate(item.created_at, language)}
                  </time>
                  <h2 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 whitespace-pre-line leading-8 text-slate-700">
                    {item.content}
                  </p>
                </article>
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}