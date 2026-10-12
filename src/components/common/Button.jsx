import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary: 'bg-brand-600 text-white shadow-sm hover:bg-brand-700',
  danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700',
  outline:
    'border border-slate-200 bg-white text-brand-800 hover:border-brand-600 hover:bg-brand-50',
  ghost: 'text-brand-800 hover:bg-brand-50',
  light: 'bg-white text-brand-800 shadow-sm hover:bg-brand-50',
  outlineLight: 'border border-white/40 text-white hover:bg-white/10',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}


export default function Button({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}