import { useEffect, useState } from 'react'
import { ExternalLink, LogOut, Menu, X } from 'lucide-react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { ADMIN_NAV } from '../../utils/adminConfig'

// ডেস্কটপে বাঁ পাশের মেনু। ছোট স্ক্রিনে উপরে একটি বোতাম, যা চাপলে মেনু খোলে।
export default function AdminSidebar() {
  const { t } = useLanguage()
  const text = t.admin
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  // ইউজার ব্যবস্থাপনা শুধু অ্যাডমিন দেখবে
  const items = ADMIN_NAV.filter((item) => item.key !== 'users' || user?.role === 'admin')

  // পাতা বদলালে মোবাইল মেনু নিজে বন্ধ হয়
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
      isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
    }`

  return (
    <aside className="border-b border-slate-200 bg-white lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between gap-3 px-4 py-4 lg:py-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-xl shadow-sm">
            🏡
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-brand-800">{text.header.panel}</p>
            <p className="text-xs text-slate-500">{t.brand.name}</p>
          </div>
        </div>

        {/* শুধু ছোট স্ক্রিনে: মেনু খোলা/বন্ধ বোতাম */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? text.closeMenu : text.openMenu}
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav
        aria-label={text.header.panel}
        className={`${open ? 'grid' : 'hidden'} gap-1 px-3 pb-3 lg:grid lg:pb-6`}
      >
        {items.map(({ key, to, Icon, end }) => (
          <NavLink key={key} to={to} end={end} className={linkClass}>
            <Icon size={18} />
            {text.nav[key]}
          </NavLink>
        ))}

        {/* মোবাইল মেনুতে নিচে: ওয়েবসাইট দেখুন ও লগআউট (ডেস্কটপে হেডারেও থাকে) */}
        <div className="mt-3 grid gap-2 border-t border-slate-100 pt-3 lg:hidden">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
          >
            <ExternalLink size={18} />
            {text.header.site}
          </NavLink>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-rose-600 hover:bg-rose-50"
          >
            <LogOut size={18} />
            {t.nav.logout}
          </button>
        </div>
      </nav>
    </aside>
  )
}