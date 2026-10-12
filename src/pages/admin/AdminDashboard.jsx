import { Link } from 'react-router-dom'
import { ArrowRight, Droplets, House, UserCog, Users } from 'lucide-react'
import usePagedList from '../../hooks/usePagedList'
import useLanguage from '../../hooks/useLanguage'

// সংখ্যা আনি পাতার আকার ১ দিয়ে — শুধু মোট সংখ্যা (X-Total-Count) দরকার, পুরো তালিকা নয়।
// কোনো অনুরোধ ব্যর্থ হলে "—" দেখায়, পুরো পেজ আটকায় না।
function countOf(request) {
  if (request.loading) return '…'
  if (request.error) return '—'
  return request.total
}

export default function AdminDashboard() {
  const { t } = useLanguage()
  const text = t.admin.dashboard

  const users = usePagedList('/admin/users', { pageSize: 1 })
  const people = usePagedList('/people/', { pageSize: 1 })
  const families = usePagedList('/families/', { pageSize: 1 })
  const donors = usePagedList('/blood/', { pageSize: 1 })

  const stats = [
    { key: 'users', value: countOf(users), to: '/admin/users', Icon: UserCog, tint: 'bg-violet-50 text-violet-700' },
    { key: 'people', value: countOf(people), to: '/admin/people', Icon: Users, tint: 'bg-sky-50 text-sky-700' },
    { key: 'families', value: countOf(families), to: '/admin/families', Icon: House, tint: 'bg-amber-50 text-amber-700' },
    { key: 'donors', value: countOf(donors), to: '/admin/blood', Icon: Droplets, tint: 'bg-rose-50 text-rose-700' },
  ]

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{text.title}</h1>
        <p className="mt-1 text-sm text-slate-600">{text.text}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ key, value, to, Icon, tint }) => (
          <Link
            key={key}
            to={to}
            className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tint}`}>
              <Icon size={22} />
            </span>
            <p className="mt-4 text-3xl font-bold text-slate-900">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-slate-600">
              {text.stats[key]}
              <ArrowRight size={14} className="transition group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
