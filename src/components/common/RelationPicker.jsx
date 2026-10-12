import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'

export default function RelationPicker({ fieldId, label, path, labelFn, value, onChange, required, error }) {
  const { t } = useLanguage()
  const text = t.scale.picker
  const [query, setQuery] = useState('')
  const debounced = useDebouncedValue(query, 300)
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState('')


  useEffect(() => {
    if (!value) {
      setSelectedLabel('')
      return undefined
    }
    let cancelled = false
    api
      .get(`${path}${value}`, { auth: true })
      .then((item) => !cancelled && setSelectedLabel(labelFn(item)))
      .catch(() => !cancelled && setSelectedLabel(`#${value}`))
    return () => {
      cancelled = true
    }
  }, [value, path, labelFn])


  useEffect(() => {
    const needle = debounced.trim()
    if (needle.length < 2) {
      setResults([])
      return undefined
    }
    let cancelled = false
    setSearching(true)
    api
      .get(`${path}?q=${encodeURIComponent(needle)}&limit=8`, { auth: true })
      .then((rows) => !cancelled && setResults(rows))
      .catch(() => !cancelled && setResults([]))
      .finally(() => !cancelled && setSearching(false))
    return () => {
      cancelled = true
    }
  }, [debounced, path])

  const pick = (item) => {
    onChange(String(item.id))
    setSelectedLabel(labelFn(item))
    setQuery('')
    setResults([])
  }

  const clear = () => {
    onChange('')
    setSelectedLabel('')
  }

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>

      {value && selectedLabel ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3">
          <span className="font-semibold text-slate-900">{selectedLabel}</span>
          <button type="button" onClick={clear} aria-label={text.clear} className="rounded-lg p-1 text-slate-500 hover:bg-white">
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="relative">
          <input
            id={fieldId}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={text.search}
            autoComplete="off"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
          />

          {query.trim().length >= 2 && (
            <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
              {searching && <li className="px-4 py-2 text-sm text-slate-500">…</li>}
              {!searching && results.length === 0 && (
                <li className="px-4 py-2 text-sm text-slate-500">{text.noResult}</li>
              )}
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => pick(item)}
                    className="w-full px-4 py-2 text-left text-sm font-semibold text-slate-800 hover:bg-brand-50"
                  >
                    {labelFn(item)}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {query.trim().length === 1 && <p className="mt-1 text-xs text-slate-500">{text.typeMore}</p>}
        </div>
      )}

      {error && <p className="mt-1.5 text-sm font-medium text-rose-600">{error}</p>}
    </div>
  )
}
