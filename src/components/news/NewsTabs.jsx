import { NavLink } from 'react-router-dom'
import useLanguage from '../../hooks/useLanguage'

const tabClass = ({ isActive }) =>
  `rounded-xl px-5 py-2.5 text-sm font-bold transition ${
    isActive
      ? 'bg-brand-600 text-white shadow-sm'
      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:text-brand-700'
  }`

export default function NewsTabs() {
  const { t } = useLanguage()

  return (
    <nav aria-label={t.news.title} className="flex justify-center gap-3">
      <NavLink to="/news" end className={tabClass}>
        {t.news.tabNews}
      </NavLink>
      <NavLink to="/announcements" className={tabClass}>
        {t.news.tabAnnouncements}
      </NavLink>
    </nav>
  )
}