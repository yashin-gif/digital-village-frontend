import { Search, X } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'

export default function SearchInput({ value, onChange, placeholder }) {
  const { t } = useLanguage()

  return (
    <div className="relative">
      <Search
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        inputMode="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label={t.ui.clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:text-brand-700"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
}