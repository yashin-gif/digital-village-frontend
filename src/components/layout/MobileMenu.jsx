import { NavLink } from 'react-router-dom'
import Button from '../common/Button'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { MAIN_NAV } from '../../utils/constants'

const linkClass = ({ isActive }) =>
  `block rounded-xl px-3 py-3 text-base font-semibold transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-700 hover:bg-slate-50'
  }`

export default function MobileMenu({ open, onClose, onLogout }) {
  const { t } = useLanguage()
  const { user, loading } = useAuth()

  if (!open) return null

  return (
    <div className="border-t border-slate-100 bg-white lg:hidden">
      <nav
        className="mx-auto max-h-[calc(100vh-4rem)] max-w-7xl overflow-y-auto px-4 py-4 sm:px-6"
        aria-label="Mobile"
      >
        <ul className="space-y-1">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <li key={item.key} className="pt-2">
                <p className="px-3 pb-1 text-xs font-bold text-slate-400">
                  {t.nav[item.key]}
                </p>
                <ul className="grid grid-cols-2 gap-1">
                  {item.children.map((child) => (
                    <li key={child.key}>
                      <NavLink to={child.to} onClick={onClose} className={linkClass}>
                        {t.services[child.key]}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.key}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={onClose}
                  className={linkClass}
                >
                  {t.nav[item.key]}
                </NavLink>
              </li>
            ),
          )}
        </ul>

        {!loading && (
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            {user ? (
              <>
                <Button to="/dashboard" onClick={onClose}>
                  {t.nav.dashboard}
                </Button>
                <Button variant="outline" onClick={onLogout}>
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Button to="/login" variant="outline" onClick={onClose}>
                  {t.nav.login}
                </Button>
                <Button to="/register" onClick={onClose}>
                  {t.nav.register}
                </Button>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  )
}