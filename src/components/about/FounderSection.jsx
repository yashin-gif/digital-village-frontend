import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import useLanguage from '../../hooks/useLanguage'
export default function FounderSection() {
  const { t } = useLanguage()
  const founder = t.about.founder
  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <article className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
            {founder.badge}
          </span>
          <h2 className="mt-4 text-2xl font-bold text-slate-900">{founder.title}</h2>
          <p className="mt-2 text-sm font-semibold text-brand-700">{founder.role}</p>

          <div className="mt-4 space-y-4 leading-8 text-slate-700">
            {founder.short.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {open && (
            <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 leading-8 text-slate-700">
              {founder.more.map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:underline"
            >
              {open ? founder.less : founder.more_btn}
              <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <a
              href={founder.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {founder.linkedin}
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}