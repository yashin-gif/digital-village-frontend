import { CircleAlert, CircleCheck } from 'lucide-react'

const styles = {
  error: 'bg-rose-50 text-rose-700 ring-rose-100',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
}

export default function Alert({ type = 'error', children }) {
  const Icon = type === 'success' ? CircleCheck : CircleAlert

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium ring-1 ${styles[type]}`}
    >
      <Icon size={18} className="mt-0.5 shrink-0" />
      <span>{children}</span>
    </div>
  )
}