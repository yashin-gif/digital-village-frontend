import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import Pagination from '../components/common/Pagination'
import BloodDonorCard from '../components/blood/BloodDonorCard'
import BloodSearch from '../components/blood/BloodSearch'
import useLanguage from '../hooks/useLanguage'
import usePagedList from '../hooks/usePagedList'
import { BLOOD_GROUPS } from '../utils/constants'

const PAGE_SIZE = 24

export default function BloodDonors() {
  const { t } = useLanguage()
  const page = t.blood
  const [searchParams, setSearchParams] = useSearchParams()
  const [availableOnly, setAvailableOnly] = useState(false)

  // হোম পেজ থেকে ?group=A%2B দিয়ে এলে সেই গ্রুপ আগে থেকেই বাছাই থাকে
  const rawGroup = searchParams.get('group') ?? ''
  const group = BLOOD_GROUPS.includes(rawGroup) ? rawGroup : ''

  const list = usePagedList('/blood/', {
    params: { blood_group: group, is_available: availableOnly ? 'true' : '' },
    pageSize: PAGE_SIZE,
  })

  const handleGroupChange = (next) => {
    const params = new URLSearchParams(searchParams)

    if (next) params.set('group', next)
    else params.delete('group')

    setSearchParams(params, { replace: true })
  }

  const filtered = group !== '' || availableOnly

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DataState
            loading={list.loading && list.data.length === 0}
            error={list.error}
            isEmpty={list.data.length === 0 && !filtered}
            emptyIcon="🩸"
            emptyTitle={page.emptyTitle}
            emptyText={page.emptyText}
            onRetry={list.reload}
          >
            <BloodSearch
              group={group}
              onGroupChange={handleGroupChange}
              availableOnly={availableOnly}
              onAvailableChange={setAvailableOnly}
            />

            <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">{page.note}</p>

            <p className="mt-6 text-sm font-medium text-slate-500">
              {list.total} {page.found}
            </p>

            {list.data.length === 0 ? (
              <p className="mt-10 text-center text-slate-600">{page.noMatch}</p>
            ) : (
              <div className={`mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${list.loading ? 'opacity-60' : ''}`}>
                {list.data.map((donor) => (
                  <BloodDonorCard key={donor.id} donor={donor} />
                ))}
              </div>
            )}

            <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
          </DataState>
        </div>
      </section>
    </>
  )
}
