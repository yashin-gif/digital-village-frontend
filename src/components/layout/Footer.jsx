import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'
import { MAIN_NAV } from '../../utils/constants'

export default function Footer() {
  const { t } = useLanguage()
  const quickLinks = MAIN_NAV.filter((item) => !item.children)

  return (
    <footer className="bg-brand-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-2xl">
              🏡
            </span>
            <span className="text-lg font-bold text-white">{t.brand.name}</span>
          </div>
          <p className="mt-4 font-semibold text-white">{t.footer.tagline}</p>
          <p className="mt-2 text-sm leading-7 text-slate-400">
            {t.footer.description}
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white">{t.footer.quickLinks}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((item) => (
              <li key={item.key}>
                <Link to={item.to} className="transition hover:text-white">
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">{t.footer.address}</h3>
          <p className="mt-4 flex items-start gap-2 text-sm leading-7 text-slate-400">
            <MapPin size={18} className="mt-1 shrink-0" />
            {t.footer.addressText}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} {t.brand.name} — {t.footer.copyright}
      </div>
    </footer>
  )
}