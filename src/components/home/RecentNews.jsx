import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import Button from '../common/Button'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'


export default function RecentNews({ items = [] }) {
  const { t, language } = useLanguage()
  const news = t.home.news

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={news.badge}
          title={news.title}
          text={news.text}
        />

        {items.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm">
              <Newspaper size={30} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {news.emptyTitle}
            </h3>
            <p className="mt-2 leading-7 text-slate-600">{news.emptyText}</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <time className="text-xs font-semibold text-brand-700">
                  {formatDate(item.created_at, language)}
                </time>
                <h3 className="mt-2 text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 leading-7 text-slate-600">
                  {item.summary}
                </p>
                <Link
                  to={`/news/${item.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700"
                >
                  {news.readMore}
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button to="/news" variant="outline">
            {news.all}
          </Button>
        </div>
      </div>
    </section>
  )
}