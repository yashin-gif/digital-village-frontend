import {
  BookOpen,
  Droplets,
  Heart,
  MapPinned,
  MessagesSquare,
  Users,
} from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'

const OFFERS = [
  { key: 'people', Icon: Users, tint: 'bg-sky-50 text-sky-700' },
  { key: 'blood', Icon: Droplets, tint: 'bg-rose-50 text-rose-700' },
  { key: 'mosque', Icon: BookOpen, tint: 'bg-emerald-50 text-emerald-700' },
  { key: 'map', Icon: MapPinned, tint: 'bg-orange-50 text-orange-700' },
  { key: 'community', Icon: MessagesSquare, tint: 'bg-violet-50 text-violet-700' },
  { key: 'welfare', Icon: Heart, tint: 'bg-amber-50 text-amber-700' },
]

export default function PlatformOffers() {
  const { t } = useLanguage()
  const about = t.about

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={about.offersBadge}
          title={about.offersTitle}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map(({ key, Icon, tint }) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${tint}`}
              >
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">
                {about.offers[key].title}
              </h3>
              <p className="mt-2 leading-7 text-slate-600">
                {about.offers[key].text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}