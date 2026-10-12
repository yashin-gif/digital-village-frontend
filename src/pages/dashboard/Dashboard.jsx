import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Droplets, HandHeart, LayoutDashboard, MessagesSquare, ShieldAlert, ShieldCheck, UserRound, Users } from 'lucide-react'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'

const LINKS = [
  { key: 'profile', to: '/profile', Icon: UserRound, tint: 'bg-sky-50 text-sky-700' },
  { key: 'blood', to: '/blood-donors', Icon: Droplets, tint: 'bg-rose-50 text-rose-700' },
  { key: 'people', to: '/people', Icon: Users, tint: 'bg-amber-50 text-amber-700' },
  { key: 'emergency', to: '/emergency', Icon: ShieldAlert, tint: 'bg-red-50 text-red-700' },
  { key: 'welfare', to: '/welfare', Icon: HandHeart, tint: 'bg-amber-50 text-amber-700' },
  { key: 'bayan', to: '/bayan', Icon: BookOpen, tint: 'bg-emerald-50 text-emerald-700' },
  { key: 'community', to: '/community', Icon: MessagesSquare, tint: 'bg-violet-50 text-violet-700' },
]

// অ্যাডমিন ও মডারেটরদের জন্য অতিরিক্ত লিংক
const STAFF_LINK = { key: 'admin', to: '/admin', Icon: LayoutDashboard, tint: 'bg-emerald-50 text-emerald-700' }

export default function Dashboard() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const page = t.dashboard
  const isStaff = user.role === 'admin' || user.role === 'moderator'
  const links = isStaff ? [STAFF_LINK, ...LINKS] : LINKS

  return (
    <>
      <section className="bg-linear-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <span className="inline-block rounded-full border border-brand-100 bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            {page.badge}
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
            {page.hello}, {user.username}
          </h1>
          <p className="mt-3 leading-8 text-slate-600">{page.text}</p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-100">
            <ShieldCheck size={18} className="text-brand-600" />
            {page.role}: {page.roles[user.role] ?? user.role}
          </p>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900">{page.quickTitle}</h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {links.map(({ key, to, Icon, tint }) => (
              <Link
                key={key}
                to={to}
                className="group flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tint}`}>
                  <Icon size={24} />
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">{page.links[key].title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{page.links[key].text}</p>
                </div>
                <ArrowRight
                  size={18}
                  className="mt-1 text-brand-700 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
