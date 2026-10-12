import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import PlaceCard from '../components/places/PlaceCard'
import VillageMap from '../components/places/VillageMap'
import useFetch from '../hooks/useFetch'
import useLanguage from '../hooks/useLanguage'

export default function Places() {
  const { t } = useLanguage()
  const page = t.places
  const { data, loading, error, reload } = useFetch('/places/')
  const items = data ?? []

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="pb-4 pt-12 sm:pt-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <VillageMap />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            {page.listTitle}
          </h2>

          <DataState
            loading={loading}
            error={error}
            isEmpty={items.length === 0}
            emptyIcon="📍"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={reload}
          >
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </DataState>
        </div>
      </section>
    </>
  )
}