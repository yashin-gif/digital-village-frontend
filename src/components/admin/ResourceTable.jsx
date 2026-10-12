import { Pencil, Trash2 } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'
import { formatDate } from '../../utils/formatDate'

// সব রিসোর্সের জন্য এক টেবিল — কলামের বর্ণনা দেখে ঘর ভরে।
// renderExtraActions দিলে প্রতিটি সারির কাজের ঘরে অতিরিক্ত বোতাম বসে (যেমন ছবি)।
export default function ResourceTable({ columns, rows, onEdit, onDelete, renderExtraActions }) {
  const { t, language } = useLanguage()
  const text = t.admin

  const renderCell = (field, item) => {
    const value = item[field.name]

    if (field.type === 'relation') return item[field.shows] ?? '—'
    if (field.type === 'checkbox') return value ? text.yes : text.no
    if (field.type === 'date') return value ? formatDate(value, language) : '—'
    return value === null || value === undefined || value === '' ? '—' : String(value)
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((field) => (
              <th key={field.name} className="whitespace-nowrap px-4 py-3">
                {text.fields[field.name] ?? field.name}
              </th>
            ))}
            <th className="px-4 py-3 text-right">{text.actions}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((item) => (
            <tr key={item.id} className="transition hover:bg-slate-50/70">
              {columns.map((field) => (
                <td key={field.name} className="px-4 py-3 text-slate-700">
                  {renderCell(field, item)}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex flex-wrap justify-end gap-2">
                  {renderExtraActions?.(item)}
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    aria-label={text.edit}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    aria-label={text.delete}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}