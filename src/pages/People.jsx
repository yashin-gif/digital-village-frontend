import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import Pagination from '../components/common/Pagination'
import SearchInput from '../components/common/SearchInput'
import PersonList from '../components/people/PersonList'
import useDebouncedValue from '../hooks/useDebouncedValue'
import useLanguage from '../hooks/useLanguage'
import usePagedList from '../hooks/usePagedList'
import { BLOOD_GROUPS } from '../utils/constants'

const PAGE_SIZE = 24

// হাজার হাজার মানুষের মধ্যে খোঁজ সার্ভারে হয়; প্রতি পাতায় ২৪ জন
export default function People() {
  const { t } = useLanguage()
  const page = t.people

  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  const list = usePagedList('/people/', {
    params: { q: debouncedQuery.trim(), blood_group: group },
    pageSize: PAGE_SIZE,
  })

  const searching = debouncedQuery.trim().length > 0 || group !== ''

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-[1fr_12rem]">
            <SearchInput value={query} onChange={setQuery} placeholder={page.searchPlaceholder} />

            <select
              value={group}
              onChange={(event) => setGroup(event.target.value)}
              aria-label={page.bloodFilter}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">{page.allGroups}</option>
              {BLOOD_GROUPS.map((bloodGroup) => (
                <option key={bloodGroup} value={bloodGroup}>
                  {bloodGroup}
                </option>
              ))}
            </select>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            {list.total} {page.found}
          </p>

          <div className="mt-6">
            <DataState
              loading={list.loading && list.data.length === 0}
              error={list.error}
              isEmpty={list.data.length === 0 && !searching}
              emptyIcon="👥"
              emptyTitle={page.emptyTitle}
              emptyText={page.emptyText}
              onRetry={list.reload}
            >
              {list.data.length === 0 ? (
                <p className="mt-10 text-center text-slate-600">{page.noMatch}</p>
              ) : (
                <div className={list.loading ? 'opacity-60 transition' : 'transition'}>
                  <PersonList items={list.data} />
                </div>
              )}
            </DataState>

            <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
          </div>
        </div>
      </section>
    </>
  )
}
