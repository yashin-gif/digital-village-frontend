import { Pencil, Trash2 } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'

const roleStyles = {
  admin: 'bg-violet-50 text-violet-700 ring-violet-100',
  moderator: 'bg-sky-50 text-sky-700 ring-sky-100',
  user: 'bg-slate-100 text-slate-700 ring-slate-200',
}

// ইউজার তালিকা — নিজের অ্যাকাউন্ট মুছতে দেবে না
export default function UserTable({ users, currentUserId, onEdit, onDelete }) {
  const { t } = useLanguage()
  const text = t.admin

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-100 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">{text.fields.username}</th>
            <th className="px-4 py-3">{text.fields.email}</th>
            <th className="px-4 py-3">{text.fields.phone}</th>
            <th className="px-4 py-3">{text.fields.role}</th>
            <th className="px-4 py-3">{text.status.label}</th>
            <th className="px-4 py-3 text-right">{text.actions}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {users.map((user) => {
            const isSelf = user.id === currentUserId

            return (
              <tr key={user.id} className="transition hover:bg-slate-50/70">
                <td className="px-4 py-3 font-semibold text-slate-900">{user.username}</td>
                <td className="px-4 py-3 text-slate-700">{user.email || '—'}</td>
                <td className="px-4 py-3 text-slate-700">{user.phone || '—'}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${roleStyles[user.role] ?? roleStyles.user}`}
                  >
                    {t.dashboard.roles[user.role] ?? user.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      user.is_active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {user.is_active ? text.status.active : text.status.inactive}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      aria-label={text.edit}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user)}
                      disabled={isSelf}
                      title={isSelf ? text.cannotDeleteSelf : undefined}
                      aria-label={text.delete}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
