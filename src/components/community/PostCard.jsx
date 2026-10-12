import { useState } from 'react'
import { MessageCircle, Trash2 } from 'lucide-react'
import Alert from '../common/Alert'
import Button from '../common/Button'
import useFetch from '../../hooks/useFetch'
import useLanguage from '../../hooks/useLanguage'
import { api } from '../../services/api'
import { formatDate } from '../../utils/formatDate'
import { getErrorMessage } from '../../utils/helpers'

const STAFF_ROLES = ['admin', 'moderator']

export function canManage(currentUser, ownerId) {
  return Boolean(currentUser) && (currentUser.id === ownerId || STAFF_ROLES.includes(currentUser.role))
}


export default function PostCard({ post, currentUser, onDelete }) {
  const { t, language } = useLanguage()
  const text = t.community
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')


  const comments = useFetch(open ? `/community/comments/${post.id}` : null)
  const list = comments.data ?? []

  const handleComment = async (event) => {
    event.preventDefault()
    if (!draft.trim()) return

    setSending(true)
    setError('')

    try {
      await api.post('/community/comments', { post_id: post.id, content: draft.trim() }, { auth: true })
      setDraft('')
      comments.reload()
    } catch (err) {
      setError(getErrorMessage(err, t))
    } finally {
      setSending(false)
    }
  }

  const handleDeleteComment = async (comment) => {
    if (!window.confirm(text.confirmDelete)) return

    try {
      await api.delete(`/community/comments/item/${comment.id}`, { auth: true })
      comments.reload()
    } catch (err) {
      setError(getErrorMessage(err, t))
    }
  }

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900">{post.title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {text.by} <span className="font-semibold text-slate-700">{post.author_username ?? text.unknownAuthor}</span>
            {' · '}
            {formatDate(post.created_at, language)}
          </p>
        </div>

        {canManage(currentUser, post.user_id) && (
          <button
            type="button"
            onClick={() => onDelete(post)}
            aria-label={text.deletePost}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 size={18} />
          </button>
        )}
      </header>

      <p className="mt-4 whitespace-pre-line leading-7 text-slate-700">{post.content}</p>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
      >
        <MessageCircle size={16} />
        {open ? text.hideComments : text.showComments}
      </button>

      {open && (
        <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
          {comments.loading && <p className="text-sm text-slate-500">…</p>}

          {!comments.loading && list.length === 0 && (
            <p className="text-sm text-slate-500">{text.noComments}</p>
          )}

          <ul className="space-y-3">
            {list.map((comment) => (
              <li key={comment.id} className="rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm">
                    <span className="font-bold text-slate-900">{comment.author_username ?? text.unknownAuthor}</span>
                    <span className="ml-2 text-slate-500">{formatDate(comment.created_at, language)}</span>
                  </p>
                  {canManage(currentUser, comment.user_id) && (
                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment)}
                      aria-label={text.deleteComment}
                      className="rounded-md p-1 text-slate-400 transition hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <p className="mt-1 whitespace-pre-line text-slate-700">{comment.content}</p>
              </li>
            ))}
          </ul>

          {error && <Alert>{error}</Alert>}

          {currentUser ? (
            <form onSubmit={handleComment} className="flex gap-2">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={text.commentPlaceholder}
                maxLength={1000}
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-base outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
              />
              <Button type="submit" disabled={sending || !draft.trim()}>
                {text.send}
              </Button>
            </form>
          ) : (
            <Button to="/login" variant="outline">
              {text.loginToComment}
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
