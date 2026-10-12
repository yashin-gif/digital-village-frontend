export default function PageHeader({ badge, title, text }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-white">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 top-24 h-56 w-56 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        {badge && (
          <span className="inline-block rounded-full border border-brand-100 bg-white px-4 py-1.5 text-sm font-semibold text-brand-700 shadow-sm">
            {badge}
          </span>
        )}

        <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
          {title}
        </h1>

        {text && (
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
            {text}
          </p>
        )}
      </div>
    </section>
  )
}