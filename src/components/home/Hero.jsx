import { MapPin, Sprout } from 'lucide-react'
import Button from '../common/Button'
import VillageIllustration from './VillageIllustration'
import useLanguage from '../../hooks/useLanguage'

export default function Hero() {
  const { t } = useLanguage()
  const h = t.home.hero

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 via-white to-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-24">
      
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {h.badge}
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.3] text-slate-900 sm:text-5xl lg:text-[3.4rem]">
            {h.titleTop}
            <span className="mt-1 block text-brand-600">{h.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {h.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/biography" size="lg">
              {h.explore}
            </Button>
            <Button to="/people" variant="outline" size="lg">
              {h.services}
            </Button>
          </div>
        </div>

        {/* ছবি */}
        <div className="relative mx-auto w-full max-w-xl">
          <div className="rounded-[2rem] bg-white p-3 shadow-2xl shadow-brand-900/10 ring-1 ring-slate-100 sm:p-4">
            <div className="aspect-[600/520] overflow-hidden rounded-3xl">
              <VillageIllustration />
            </div>
          </div>

          <div className="absolute left-4 top-8 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-lg ring-1 ring-slate-100 sm:-left-6">
            <MapPin size={16} className="text-rose-500" />
            {h.location}
          </div>

          <div className="absolute -bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-lg ring-1 ring-slate-100 sm:-right-4">
            <Sprout size={18} className="text-brand-600" />
            {h.greenVillage}
          </div>
        </div>
      </div>
    </section>
  )
}