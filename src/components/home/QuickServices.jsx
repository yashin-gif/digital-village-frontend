import { Link } from 'react-router-dom'
import {ArrowRight,Droplets,GraduationCap,Landmark,MapPin,Users,UsersRound,} from 'lucide-react'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'
import { SERVICE_LINKS } from '../../utils/constants'

const STYLE = {
  people: { Icon: Users, tint: 'bg-sky-50 text-sky-700' },
  families: { Icon: UsersRound, tint: 'bg-amber-50 text-amber-700' },
  blood: { Icon: Droplets, tint: 'bg-rose-50 text-rose-700' },
  mosques: { Icon: Landmark, tint: 'bg-emerald-50 text-emerald-700' },
  institutions: { Icon: GraduationCap, tint: 'bg-violet-50 text-violet-700' },
  places: { Icon: MapPin, tint: 'bg-orange-50 text-orange-700' },
}

export default function QuickServices() {
  const { t } = useLanguage()
  const section = t.home.services

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={section.badge}
          title={section.title}
          text={section.text}
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_LINKS.map(({ key, to }) => {
            const { Icon, tint } = STYLE[key]

            return (
              <Link
                key={key}
                to={to}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tint}`}
                >
                  <Icon size={28} />
                </span>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {t.services[key]}
                </h3>
                <p className="mt-2 leading-7 text-slate-600">
                  {section.items[key]}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-700">
                  {section.open}
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}