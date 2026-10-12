import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays } from 'lucide-react'
import DataState from '../components/common/DataState'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { formatDate } from '../utils/formatDate'

export default function NewsDetail() {
  const { id } = useParams()
  const { t, language } = useLanguage()
  const { data, loading, error, reload } = useFetch(`/news/${id}`)

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline"
        >
          <ArrowLeft size={16} />
          {t.news.back}
        </Link>

        <div className="mt-6">
          <DataState
            loading={loading}
            error={error}
            isEmpty={!data}
            emptyIcon="📰"
            emptyTitle={t.news.emptyTitle}
            emptyText={t.news.emptyText}
            onRetry={reload}
          >
            {data && (
              <article>
                <time className="flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  <CalendarDays size={16} />
                  {formatDate(data.created_at, language)}
                </time>
                <h1 className="mt-3 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
                  {data.title}
                </h1>
                <p className="mt-6 whitespace-pre-line text-lg leading-9 text-slate-700">
                  {data.content}
                </p>
              </article>
            )}
          </DataState>
        </div>
      </div>
    </section>
  )
}