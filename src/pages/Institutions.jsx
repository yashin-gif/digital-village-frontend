import { GraduationCap, MapPin, Phone } from 'lucide-react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import InfoCard from '../components/common/InfoCard'
import MapLink from '../components/places/MapLink'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'
import { phoneHref } from '../utils/helpers'

export default function Institutions() {
  const { t } = useLanguage()
  const page = t.institutions
  const { data, loading, error, reload } = useFetch('/institutions/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="🏫"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((institution) => (
                <InfoCard
                  key={institution.id}
                  icon={GraduationCap}
                  tint="bg-violet-50 text-violet-700"
                  title={institution.name}
                  badge={institution.institution_type}
                  description={institution.description}
                  details={[
                    institution.address && { icon: MapPin, text: institution.address },
                    institution.phone && {
                      icon: Phone,
                      text: institution.phone,
                      href: phoneHref(institution.phone),
                    },
                  ].filter(Boolean)}
                >
                  <MapLink item={institution} />
                </InfoCard>
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}