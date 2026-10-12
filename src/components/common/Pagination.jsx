import Button from './Button'
import useLanguage from '../../hooks/useLanguage'


export default function Pagination({ page, pages, onChange }) {
  const { t } = useLanguage()
  const text = t.scale.pagination

  if (pages <= 1) return null

  return (
    <nav aria-label={text.label} className="mt-8 flex items-center justify-center gap-4">
      <Button variant="outline" size="md" onClick={() => onChange(page - 1)} disabled={page <= 1}>
        {text.prev}
      </Button>
      <span className="text-sm font-semibold text-slate-600">
        {text.pageOf.replace('{page}', page).replace('{pages}', pages)}
      </span>
      <Button variant="outline" size="md" onClick={() => onChange(page + 1)} disabled={page >= pages}>
        {text.next}
      </Button>
    </nav>
  )
}
