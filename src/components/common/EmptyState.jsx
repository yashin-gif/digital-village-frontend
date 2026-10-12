export default function EmptyState({ icon = '🚧', title, description, children }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-4xl">
        {icon}
      </div>
      <h1 className="mt-6 text-2xl font-bold text-slate-900">{title}</h1>
      {description && (
        <p className="mt-3 leading-7 text-slate-600">{description}</p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  )
}