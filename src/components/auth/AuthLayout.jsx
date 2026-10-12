// লগইন, নিবন্ধন, পাসওয়ার্ড রিসেট — চার পেজের একই কার্ড-ডিজাইন
export default function AuthLayout({ badge, title, subtitle, children, footer }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-white">
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center px-4 py-12 sm:px-6">
        <div className="w-full rounded-3xl bg-white p-6 shadow-xl shadow-brand-900/5 ring-1 ring-slate-100 sm:p-8">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-3xl shadow-sm">
              🏡
            </span>
            {badge && (
              <span className="mt-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                {badge}
              </span>
            )}
            <h1 className="mt-3 text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm leading-7 text-slate-600">{subtitle}</p>
            )}
          </div>

          <div className="mt-6">{children}</div>

          {footer && (
            <div className="mt-6 border-t border-slate-100 pt-5 text-center text-sm text-slate-600">
              {footer}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}