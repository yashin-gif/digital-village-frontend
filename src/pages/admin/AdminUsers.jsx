import { useState } from 'react'
import { Plus } from 'lucide-react'
import Button from '../../components/common/Button'
import ConfirmDelete from '../../components/admin/ConfirmDelete'
import UserForm from '../../components/admin/UserForm'
import UserTable from '../../components/admin/UserTable'
import DataState from '../../components/common/DataState'
import Modal from '../../components/common/Modal'
import Pagination from '../../components/common/Pagination'
import SearchInput from '../../components/common/SearchInput'
import useAuth from '../../hooks/useAuth'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useLanguage from '../../hooks/useLanguage'
import usePagedList from '../../hooks/usePagedList'
import { api } from '../../services/api'
import { getErrorMessage } from '../../utils/helpers'

const PAGE_SIZE = 20

// ব্যাকেন্ড: প্রোফাইল PATCH /admin/users/{id}, ভূমিকা PATCH /admin/users/{id}/role?role=,
// সক্রিয়তা PATCH /admin/users/{id}/status?is_active=
export default function AdminUsers() {
  const { t } = useLanguage()
  const { user: me } = useAuth()
  const text = t.admin
  const page = text.pages.users

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)
  const list = usePagedList('/admin/users', { params: { q: debouncedQuery.trim() }, pageSize: PAGE_SIZE })

  const [modal, setModal] = useState(null) // null = বন্ধ, { user: null } = নতুন, { user } = সম্পাদনা
  const [toDelete, setToDelete] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const closeModal = () => {
    setModal(null)
    setFormError('')
  }

  const handleSave = async (payload) => {
    setSaving(true)
    setFormError('')

    try {
      if (modal?.user) {
        const target = modal.user
        const { role, is_active: isActive, ...profile } = payload

        await api.patch(`/admin/users/${target.id}`, profile, { auth: true })

        if (role && role !== target.role) {
          await api.patch(`/admin/users/${target.id}/role?role=${encodeURIComponent(role)}`, undefined, {
            auth: true,
          })
        }

        if (typeof isActive === 'boolean' && isActive !== target.is_active) {
          await api.patch(`/admin/users/${target.id}/status?is_active=${isActive}`, undefined, { auth: true })
        }
      } else {
        await api.post('/admin/users', payload, { auth: true })
      }

      closeModal()
      list.reload()
    } catch (err) {
      setFormError(getErrorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError('')

    try {
      await api.delete(`/admin/users/${toDelete.id}`, { auth: true })
      setToDelete(null)
      list.reload()
    } catch (err) {
      setDeleteError(getErrorMessage(err, t))
    } finally {
      setDeleting(false)
    }
  }

  const searching = debouncedQuery.trim().length > 0

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{page.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{page.text}</p>
        </div>
        <Button onClick={() => setModal({ user: null })}>
          <Plus size={18} />
          {text.add}
        </Button>
      </div>

      <div className="mt-6">
        <SearchInput value={query} onChange={setQuery} placeholder={page.searchPlaceholder} />
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {list.total} {page.found}
      </p>

      <div className="mt-4">
        <DataState
          loading={list.loading && list.data.length === 0}
          error={list.error}
          isEmpty={list.data.length === 0 && !searching}
          emptyTitle={page.emptyTitle}
          emptyText={page.emptyText}
          onRetry={list.reload}
        >
          {list.data.length === 0 ? (
            <p className="py-10 text-center text-slate-600">{text.noMatch}</p>
          ) : (
            <UserTable
              users={list.data}
              currentUserId={me?.id}
              onEdit={(user) => setModal({ user })}
              onDelete={(user) => {
                setDeleteError('')
                setToDelete(user)
              }}
            />
          )}
        </DataState>

        <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
      </div>

      <Modal open={Boolean(modal)} onClose={closeModal} title={modal?.user ? text.editTitle : text.addTitle}>
        {modal && (
          <UserForm
            key={modal.user?.id ?? 'new'}
            user={modal.user}
            saving={saving}
            error={formError}
            onSubmit={handleSave}
            onCancel={closeModal}
          />
        )}
      </Modal>

      <ConfirmDelete
        open={Boolean(toDelete)}
        name={toDelete?.username ?? ''}
        busy={deleting}
        error={deleteError}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}
