import { MapPin } from 'lucide-react'
import Button from '../common/Button'
import useLanguage from '../../hooks/useLanguage'

export default function BiographyIntro() {
  const { t } = useLanguage()
  const bio = t.biography

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {bio.aboutTitle}
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            {bio.aboutText}
          </p>
        </div>

        <div className="rounded-3xl border border-brand-100 bg-brand-50 p-6 sm:p-8 lg:col-span-2">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-rose-500 shadow-sm">
            <MapPin size={24} />
          </span>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            {bio.locationTitle}
          </h3>
          <p className="mt-2 leading-7 text-slate-700">
            {t.footer.addressText}
          </p>
          <Button to="/places" variant="outline" className="mt-6">
            {bio.mapButton}
          </Button>
        </div>
      </div>
    </section>
  )
}