import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import NewsTabs from '../components/news/NewsTabs'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { formatDate } from '../utils/formatDate'
import { truncate } from '../utils/helpers'

export default function News() {
  const { t, language } = useLanguage()
  const page = t.news
  const { data, loading, error, reload } = useFetch('/news/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <NewsTabs />
          </div>

          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="📰"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <time className="flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                    <CalendarDays size={14} />
                    {formatDate(item.created_at, language)}
                  </time>
                  <h2 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h2>
                  <p className="mt-2 flex-1 leading-7 text-slate-600">
                    {truncate(item.content, 160)}
                  </p>
                  <Link
                    to={`/news/${item.id}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700"
                  >
                    {page.readMore}
                    <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}