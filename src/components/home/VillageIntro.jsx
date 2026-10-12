import { BookOpen, HeartHandshake, Lightbulb } from 'lucide-react'
import Button from '../common/Button'
import SectionHeading from '../common/SectionHeading'
import useLanguage from '../../hooks/useLanguage'

const PILLARS = [
  { key: 'connect', Icon: HeartHandshake },
  { key: 'info', Icon: Lightbulb },
  { key: 'heritage', Icon: BookOpen },
]

export default function VillageIntro() {
  const { t } = useLanguage()
  const intro = t.home.intro

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            align="left"
            badge={intro.badge}
            title={intro.title}
            text={intro.text}
          />
          <div className="mt-8">
            <Button to="/biography" variant="outline">
              {intro.more}
            </Button>
          </div>
        </div>

        <ul className="space-y-4">
          {PILLARS.map(({ key, Icon }) => (
            <li
              key={key}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={24} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {intro.pillars[key].title}
                </h3>
                <p className="mt-1 leading-7 text-slate-600">
                  {intro.pillars[key].text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}