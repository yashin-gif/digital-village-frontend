import { Link } from 'react-router-dom'
import { Droplets } from 'lucide-react'
import Button from '../common/Button'
import useLanguage from '../../hooks/useLanguage'
import { BLOOD_GROUPS } from '../../utils/constants'

export default function BloodEmergency() {
  const { t } = useLanguage()
  const blood = t.home.blood

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-rose-600 to-rose-800 p-8 text-white sm:p-12">
          <Droplets
            size={260}
            className="pointer-events-none absolute -right-10 -top-10 text-white/10"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold">
                {blood.badge}
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                {blood.title}
              </h2>
              <p className="mt-4 max-w-md leading-8 text-rose-100">
                {blood.text}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button to="/blood-donors" variant="light" size="lg">
                  {blood.find}
                </Button>
                <Button to="/register" variant="outlineLight" size="lg">
                  {blood.join}
                </Button>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-rose-100">
                {blood.groupLabel}
              </p>
              <div className="grid grid-cols-4 gap-3">
                {BLOOD_GROUPS.map((group) => (
                  <Link
                    key={group}
                    to={`/blood-donors?group=${encodeURIComponent(group)}`}
                    className="flex h-14 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold ring-1 ring-white/20 transition hover:bg-white hover:text-rose-700"
                  >
                    {group}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}