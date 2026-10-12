import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, LogOut, Menu, X } from 'lucide-react'
import Button from '../common/Button'
import MobileMenu from './MobileMenu'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import { MAIN_NAV } from '../../utils/constants'

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors ${
    isActive
      ? 'bg-brand-50 text-brand-700'
      : 'text-slate-600 hover:bg-slate-50 hover:text-brand-700'
  }`

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage()
  const { user, loading, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef(null)


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" aria-label={t.brand.name}>
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-2xl shadow-sm">
            🏡
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-bold text-brand-800 lg:text-xl">
              {t.brand.name}
            </span>
            <span className="block text-xs font-medium text-slate-500">
              {t.brand.place}
            </span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {MAIN_NAV.map((item) =>
            item.children ? (
              <div key={item.key} ref={servicesRef} className="relative">
                <button
                  type="button"
                  onClick={() => setServicesOpen((open) => !open)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-brand-700"
                >
                  {t.nav[item.key]}
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {servicesOpen && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.to}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                      >
                        {t.services[child.key]}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.to === '/'}
                className={linkClass}
              >
                {t.nav[item.key]}
              </NavLink>
            ),
          )}
        </nav>

        {/* Language Switcher and User Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.nav.switchLanguage}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-brand-600 hover:text-brand-700"
          >
            {language === 'bn' ? 'EN' : 'বাংলা'}
          </button>

          {!loading && (
            <div className="hidden items-center gap-2 lg:flex">
              {user ? (
                <>
                  <Button to="/dashboard" variant="ghost">
                    {t.nav.dashboard}
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut size={16} />
                    {t.nav.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Button to="/login" variant="ghost">
                    {t.nav.login}
                  </Button>
                  <Button to="/register">{t.nav.register}</Button>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t.nav.close : t.nav.menu}
            aria-expanded={menuOpen}
            className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={handleLogout}
      />
    </header>
  )
}