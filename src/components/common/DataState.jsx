import { RefreshCw } from 'lucide-react'
import Button from './Button'
import Loading from './Loading'
import useLanguage from '../../hooks/useLanguage'
import { getErrorMessage } from '../../utils/helpers'


export default function DataState({
  loading,
  error,
  isEmpty,
  emptyIcon = '📭',
  emptyTitle,
  emptyText,
  onRetry,
  children,
}) {
  const { t } = useLanguage()

  if (loading) return <Loading label={t.ui.loading} />

  if (error) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-rose-100 bg-rose-50/50 px-6 py-14 text-center">
        <span className="text-4xl">⚠️</span>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{t.ui.errorTitle}</h3>
        <p className="mt-2 leading-7 text-slate-600">{getErrorMessage(error, t)}</p>
        {onRetry && (
          <Button variant="outline" className="mt-6" onClick={onRetry}>
            <RefreshCw size={16} />
            {t.ui.retry}
          </Button>
        )}
      </div>
    )
  }

  if (isEmpty) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-14 text-center">
        <span className="text-4xl">{emptyIcon}</span>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{emptyTitle}</h3>
        {emptyText && <p className="mt-2 leading-7 text-slate-600">{emptyText}</p>}
      </div>
    )
  }

  return children
}