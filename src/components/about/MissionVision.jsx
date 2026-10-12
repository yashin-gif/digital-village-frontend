import { Eye, Target } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'

export default function MissionVision() {
  const { t } = useLanguage()
  const about = t.about

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <article className="rounded-3xl bg-brand-50 p-8 ring-1 ring-brand-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-sm">
            <Target size={28} />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {about.mission.title}
          </h2>
          <p className="mt-3 leading-8 text-slate-700">{about.mission.text}</p>
        </article>

        <article className="rounded-3xl bg-sky-50 p-8 ring-1 ring-sky-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-sm">
            <Eye size={28} />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            {about.vision.title}
          </h2>
          <p className="mt-3 leading-8 text-slate-700">{about.vision.text}</p>
        </article>
      </div>
    </section>
  )
}