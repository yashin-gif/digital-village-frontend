export default function Loading({ label }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-20 text-slate-500"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
      {label && <p className="text-sm font-medium">{label}</p>}
    </div>
  )
}