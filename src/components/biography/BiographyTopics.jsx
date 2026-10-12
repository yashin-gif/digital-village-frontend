import { Info, Landmark, ScrollText, Users } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'

const TOPICS = [
  { key: 'history', Icon: ScrollText },
  { key: 'heritage', Icon: Landmark },
  { key: 'life', Icon: Users },
  { key: 'facts', Icon: Info },
]

export default function BiographyTopics() {
  const { t } = useLanguage()
  const bio = t.biography

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={bio.topicsTitle} text={bio.topicsText} />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map(({ key, Icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {bio.topics[key].title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                {bio.topics[key].text}
              </p>
              <span className="mt-4 inline-block rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                {bio.soon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}