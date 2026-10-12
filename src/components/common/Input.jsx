import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'

export default function Input({
  label,
  error,
  type = 'text',
  icon: Icon,
  className = '',
  ...props
}) {
  const id = useId()
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
        )}

        <input
          id={id}
          type={inputType}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border bg-white py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-100 ${
            Icon ? 'pl-11' : 'pl-4'
          } ${isPassword ? 'pr-12' : 'pr-4'} ${
            error ? 'border-rose-400' : 'border-slate-200'
          }`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((value) => !value)}
            aria-label={visible ? t.auth.hidePassword : t.auth.showPassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:text-brand-700"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}