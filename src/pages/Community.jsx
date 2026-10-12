import { useState } from 'react'
import { Plus } from 'lucide-react'
import Alert from '../components/common/Alert'
import Button from '../components/common/Button'
import DataState from '../components/common/DataState'
import Modal from '../components/common/Modal'
import PageHeader from '../components/common/PageHeader'
import PostCard from '../components/community/PostCard'
import useAuth from '../hooks/useAuth'
import Pagination from '../components/common/Pagination'
import usePagedList from '../hooks/usePagedList'
import useLanguage from '../hooks/useLanguage'
import { api } from '../services/api'
import { getErrorMessage } from '../utils/helpers'

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100'

export default function Community() {
  const { t } = useLanguage()
  const { user } = useAuth()
  const text = t.community

  const list = usePagedList('/community/posts', { pageSize: 10 })
  const posts = list.data
  const { loading, error, reload } = list

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ title: '', content: '' })
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')

  const closeModal = () => {
    setOpen(false)
    setFormError('')
  }

  const handlePublish = async (event) => {
    event.preventDefault()
    if (!form.title.trim() || !form.content.trim()) return

    setSaving(true)
    setFormError('')

    try {
      await api.post('/community/posts', { title: form.title.trim(), content: form.content.trim() }, { auth: true })
      setForm({ title: '', content: '' })
      closeModal()
      setNotice('')
      reload()
    } catch (err) {
      setFormError(getErrorMessage(err, t))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (post) => {
    if (!window.confirm(text.confirmDelete)) return

    try {
      await api.delete(`/community/posts/${post.id}`, { auth: true })
      reload()
    } catch (err) {
      setNotice(getErrorMessage(err, t))
    }
  }

  return (
    <>
      <PageHeader badge={text.badge} title={text.title} text={text.text} />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end">
            {user ? (
              <Button onClick={() => setOpen(true)}>
                <Plus size={18} />
                {text.newPost}
              </Button>
            ) : (
              <Button to="/login" variant="outline">
                {text.loginToPost}
              </Button>
            )}
          </div>

          {notice && (
            <div className="mt-6">
              <Alert>{notice}</Alert>
            </div>
          )}

          <div className="mt-8">
            <DataState
              loading={loading}
              error={error}
              isEmpty={posts.length === 0}
              emptyIcon="💬"
              emptyTitle={text.empty}
              emptyText={text.emptyText}
              onRetry={reload}
            >
              <div className="space-y-6">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} currentUser={user} onDelete={handleDelete} />
                ))}
              </div>
            </DataState>

            <Pagination page={list.page} pages={list.pages} onChange={list.setPage} />
          </div>
        </div>
      </section>

      <Modal open={open} onClose={closeModal} title={text.newPost}>
        <form onSubmit={handlePublish} className="space-y-5">
          {formError && <Alert>{formError}</Alert>}

          <div>
            <label htmlFor="post-title" className="mb-1.5 block text-sm font-semibold text-slate-700">
              {text.postTitle}
            </label>
            <input
              id="post-title"
              value={form.title}
              maxLength={200}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="post-content" className="mb-1.5 block text-sm font-semibold text-slate-700">
              {text.postContent}
            </label>
            <textarea
              id="post-content"
              rows={5}
              value={form.content}
              onChange={(event) => setForm((prev) => ({ ...prev, content: event.target.value }))}
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={closeModal} disabled={saving}>
              {text.cancel}
            </Button>
            <Button type="submit" disabled={saving || !form.title.trim() || !form.content.trim()}>
              {saving ? text.publishing : text.publish}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  )
}
