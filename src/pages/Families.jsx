import { useState } from 'react'
import PageHeader from '../components/common/PageHeader'
import DataState from '../components/common/DataState'
import Pagination from '../components/common/Pagination'
import SearchInput from '../components/common/SearchInput'
import FamilyList from '../components/families/FamilyList'
import useDebouncedValue from '../hooks/useDebouncedValue'
import useLanguage from '../hooks/useLanguage'
import usePagedList from '../hooks/usePagedList'

const PAGE_SIZE = 24

export default function Families() {
  const { t } = useLanguage()
  const page = t.families

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)
  const list = usePagedList('/families/', { params: { q: debouncedQuery.trim() }, pageSize: PAGE_SIZE })

  const searching = debouncedQuery.trim().length > 0

  return (
    <>
      <PageHeader badge={page.badge} title={page.title} text={page.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SearchInput value={query} onChange={setQuery} placeholder={page.searchPlaceholder} />

          <p className="mt-4 text-sm font-medium text-slate-500">
            {list.total} {page.found}
          </p>

          <div className="mt-6">
            <DataState
              loading={list.loading && list.data.length === 0}
              error={list.error}
              isEmpty={list.data.length === 0 && !searching}
              emptyIcon="🏘️"
              emptyTitle={page.emptyTitle}
              emptyText={page.emptyText}
              onRetry={list.reload}
            >
              {list.data.length === 0 ? (
                <p className="mt-10 text-center text-slate-600">{page.noMatch}</p>
              ) : (
                <div className={list.loading ? 'opacity-60 transition' : 'transition'}>
                  <FamilyList items={list.data} />
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
