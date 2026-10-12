import { ExternalLink, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'

export default function AdminHeader() {
  const { t } = useLanguage()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="min-w-0">
        <p className="truncate text-sm font-bold text-slate-900">
          {t.admin.header.welcome}, {user?.username}
        </p>
        <p className="text-xs text-slate-500">
          {t.dashboard.role}: {t.dashboard.roles[user?.role] ?? user?.role}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button to="/" variant="outline">
          <ExternalLink size={16} />
          {t.admin.header.site}
        </Button>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut size={16} />
          {t.nav.logout}
        </Button>
      </div>
    </header>
  )
}
