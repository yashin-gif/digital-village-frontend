import { useRef, useState } from 'react'
import { ImagePlus, Plus, Trash2 } from 'lucide-react'
import Button from '../common/Button'
import DataState from '../common/DataState'
import Modal from '../common/Modal'
import Pagination from '../common/Pagination'
import SearchInput from '../common/SearchInput'
import ConfirmDelete from './ConfirmDelete'
import ResourceForm from './ResourceForm'
import ResourceTable from './ResourceTable'
import useDebouncedValue from '../../hooks/useDebouncedValue'
import useLanguage from '../../hooks/useLanguage'
import usePagedList from '../../hooks/usePagedList'
import { api } from '../../services/api'
import { shrinkImage } from '../../utils/avatar'
import { ADMIN_RESOURCES } from '../../utils/adminConfig'
import { getErrorMessage } from '../../utils/helpers'

const PAGE_SIZE = 20

// ছবি যোগ করা যায় এমন রিসোর্স
const IMAGE_RESOURCES = ['mosques', 'institutions', 'news']

// একটা রিসোর্সের পুরো CRUD পেজ: পাতা অনুযায়ী দেখা, সার্ভারে খোঁজ, যোগ, সম্পাদনা, মোছা, ছবি
export default function ResourceManager({ resourceKey }) {
  const { t } = useLanguage()
  const text = t.admin
  const config = ADMIN_RESOURCES[resourceKey]
  const page = text.pages[resourceKey]
  const hasImage = IMAGE_RESOURCES.includes(resourceKey)

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 300)

  const list = usePagedList(config.path, {
    params: { q: debouncedQuery.trim() },
    pageSize: PAGE_SIZE,
    auth: true,
  })

  const [modal, setModal] = useState(null) // null = বন্ধ, { item: null } = নতুন, { item } = সম্পাদনা
  const [toDelete, setToDelete] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteError, setDeleteError] = useState('')

  const [imageBusyId, setImageBusyId] = useState(null)
  const [imageError, setImageError] = useState('')
  const fileInput = useRef(null)
  const [imageTarget, setImageTarget] = useState(null)

  const columns = config.columns.map((name) => config.fields.find((field) => field.name === name))

  const closeModal = () => {
    setModal(null)
    setFormError('')
  }

  const handleSave = async (payload) => {
    setSaving(true)
    setFormError('')

    try {
      if (modal?.item) {
        await api.patch(`${config.path}${modal.item.id}`, payload, { auth: true })
      } else {
        await api.post(config.path, payload, { auth: true })
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
      await api.delete(`${config.path}${toDelete.id}`, { auth: true })
      setToDelete(null)
      list.reload()
    } catch (err) {
      setDeleteError(getErrorMessage(err, t))
    } finally {
      setDeleting(false)
    }
  }

  // ছবি বাছাই: প্রথমে ব্রাউজারে ছোট করে, তারপর আপলোড
  const pickImage = (item) => {
    setImageTarget(item)
    setImageError('')
    fileInput.current?.click()
  }

  const handleImageFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !imageTarget) return

    setImageError('')
    setImageBusyId(imageTarget.id)

    try {
      const small = await shrinkImage(file)
      const form = new FormData()
      form.append('file', small)

      await api.upload(`${config.path}${imageTarget.id}/image`, form, { auth: true })
      list.reload()
    } catch (err) {
      setImageError(getErrorMessage(err, t))
    } finally {
      setImageBusyId(null)
      setImageTarget(null)
    }
  }

  const handleImageRemove = async (item) => {
    if (!window.confirm(text.imageRemoveConfirm)) return

    setImageError('')
    setImageBusyId(item.id)

    try {
      await api.delete(`${config.path}${item.id}/image`, { auth: true })
      list.reload()
    } catch (err) {
      setImageError(getErrorMessage(err, t))
    } finally {
      setImageBusyId(null)
    }
  }

  const searching = debouncedQuery.trim().length > 0
  const isEmpty = list.data.length === 0 && !searching

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{page.title}</h1>
          <p className="mt-1 text-sm text-slate-600">{page.text}</p>
        </div>
        <Button onClick={() => setModal({ item: null })}>
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

      {imageError && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{imageError}</p>
      )}

      <div className="mt-4">
        <DataState
          loading={list.loading && list.data.length === 0}
          error={list.error}
          isEmpty={isEmpty}
          emptyTitle={page.emptyTitle}
          emptyText={page.emptyText}
          onRetry={list.reload}
        >
          {list.data.length === 0 ? (
            <p className="py-10 text-center text-slate-600">{text.noMatch}</p>
          ) : (
            <div className={list.loading ? 'opacity-60 transition' : 'transition'}>
              <ResourceTable
                columns={columns}
                rows={list.data}
                onEdit={(item) => setModal({ item })}
                onDelete={(item) => {
                  setDeleteError('')
                  setToDelete(item)
                }}
                renderExtraActions={
                  hasImage
                    ? (item) => (
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => pickImage(item)}
                            disabled={imageBusyId === item.id}
                            aria-label={text.imageChange}
                            title={text.imageChange}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-700 disabled:opacity-40"
                          >
                            <ImagePlus size={16} />
                          </button>
                          {item.image_url && (
                            <button
                              type="button"
                              onClick={() => handleImageRemove(item)}
                              disabled={imageBusyId === item.id}
                              aria-label={text.imageRemove}
                              title={text.imageRemove}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-40"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      )
                    : null
                }
              />
            </div>
          )}
        </DataState>

        <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
      </div>

      <input
        ref={fileInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImageFile}
        className="hidden"
      />

      <Modal open={Boolean(modal)} onClose={closeModal} title={modal?.item ? text.editTitle : text.addTitle}>
        {modal && (
          <ResourceForm
            key={modal.item?.id ?? 'new'}
            fields={config.fields}
            initial={modal.item}
            saving={saving}
            error={formError}
            onSubmit={handleSave}
            onCancel={closeModal}
          />
        )}
      </Modal>

      <ConfirmDelete
        open={Boolean(toDelete)}
        name={toDelete ? config.display(toDelete) : ''}
        busy={deleting}
        error={deleteError}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </>
  )
}