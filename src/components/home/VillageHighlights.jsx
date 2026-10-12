import { Link } from 'react-router-dom'
import { BookOpen, Heart, MapPinned, MessagesSquare } from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'

const ITEMS = [
  { key: 'bayan', to: '/bayan', Icon: BookOpen },
  { key: 'community', to: '/community', Icon: MessagesSquare },
  { key: 'map', to: '/places', Icon: MapPinned },
  { key: 'welfare', to: '/welfare', Icon: Heart },
]

export default function VillageHighlights() {
  const { t } = useLanguage()
  const section = t.home.highlights

  return (
    <section className="bg-brand-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          badge={section.badge}
          title={section.title}
          text={section.text}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ key, to, Icon }) => (
            <Link
              key={key}
              to={to}
              className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20 text-brand-200">
                <Icon size={24} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-white">
                {section.items[key].title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-brand-100">
                {section.items[key].text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}