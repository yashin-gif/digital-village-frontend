import useLanguage from '../../hooks/useLanguage'
import { BLOOD_GROUPS } from '../../utils/constants'

export default function BloodSearch({
  group,
  onGroupChange,
  availableOnly,
  onAvailableChange,
}) {
  const { t } = useLanguage()
  const text = t.blood
  const options = ['', ...BLOOD_GROUPS]

  return (
    <div>
      <p className="text-sm font-semibold text-slate-700">{text.groupLabel}</p>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={text.groupLabel}>
        {options.map((option) => {
          const active = group === option

          return (
            <button
              key={option || 'all'}
              type="button"
              aria-pressed={active}
              onClick={() => onGroupChange(option)}
              className={`min-w-14 rounded-xl px-4 py-2 text-sm font-bold ring-1 transition ${
                active
                  ? 'bg-rose-600 text-white ring-rose-600'
                  : 'bg-white text-slate-700 ring-slate-200 hover:ring-rose-300'
              }`}
            >
              {option || text.all}
            </button>
          )
        })}
      </div>

      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-700">
        <input
          type="checkbox"
          checked={availableOnly}
          onChange={(event) => onAvailableChange(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 accent-rose-600"
        />
        {text.availableOnly}
      </label>
    </div>
  )
}