import { NavLink } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { ADMIN_NAV } from '../../utils/adminConfig'

// ডেস্কটপে বাঁ পাশের মেনু, ছোট স্ক্রিনে উপরে আনুভূমিক মেনু
export default function AdminSidebar() {
  const { t } = useLanguage()
  const text = t.admin
  const { user } = useAuth()
  // ইউজার ব্যবস্থাপনা শুধু অ্যাডমিন দেখবে
  const items = ADMIN_NAV.filter((item) => item.key !== 'users' || user?.role === 'admin')

  const linkClass = ({ isActive }) =>
    `flex shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
    }`

  return (
    <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-4 py-4 lg:py-6">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-xl shadow-sm">
          🏡
        </span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-brand-800">{text.header.panel}</p>
          <p className="text-xs text-slate-500">{t.brand.name}</p>
        </div>
      </div>

      <nav aria-label={text.header.panel} className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-6">
        {items.map(({ key, to, Icon, end }) => (
          <NavLink key={key} to={to} end={end} className={linkClass}>
            <Icon size={18} />
            {text.nav[key]}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
