export default function SectionHeading({
  badge,
  title,
  text,
  align = 'center',
  light = false,
}) {
  const alignClass = align === 'center' ? 'mx-auto text-center' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {badge && (
        <span
          className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${
            light ? 'bg-white/10 text-brand-100' : 'bg-brand-50 text-brand-700'
          }`}
        >
          {badge}
        </span>
      )}

      <h2
        className={`mt-4 text-3xl font-bold leading-tight sm:text-4xl ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>

      {text && (
        <p
          className={`mt-4 text-base leading-8 ${
            light ? 'text-brand-100' : 'text-slate-600'
          }`}
        >
          {text}
        </p>
      )}
    </div>
  )
}