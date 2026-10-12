import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Button from '../components/common/Button'
import EmptyState from '../components/common/EmptyState'
import Loading from '../components/common/Loading'
import useAuth from '../hooks/useAuth'
import useLanguage from '../hooks/useLanguage'

// roles দিলে শুধু ওই ভূমিকার মানুষ ঢুকতে পারবে: <ProtectedRoute roles={['admin']} />
export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()

  if (loading) return <Loading label={t.ui.loading} />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (roles && !roles.includes(user.role)) {
    return (
      <EmptyState
        icon="🔒"
        title={t.ui.forbiddenTitle}
        description={t.ui.forbiddenText}
      >
        <Button to="/">{t.common.backHome}</Button>
      </EmptyState>
    )
  }

  return <Outlet />
}