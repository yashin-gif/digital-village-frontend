import Alert from '../common/Alert'
import Button from '../common/Button'
import Modal from '../common/Modal'
import useLanguage from '../../hooks/useLanguage'

// মুছে ফেলার আগে নিশ্চিত করা
export default function ConfirmDelete({ open, name, busy, error, onCancel, onConfirm }) {
  const { t } = useLanguage()
  const text = t.admin

  return (
    <Modal open={open} onClose={onCancel} title={text.confirm.title} size="sm">
      <p className="leading-7 text-slate-600">
        {text.confirm.text}
        {name && (
          <>
            {' '}
            <strong className="text-slate-900">{name}</strong>
          </>
        )}
      </p>

      {error && (
        <div className="mt-4">
          <Alert>{error}</Alert>
        </div>
      )}

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel} disabled={busy}>
          {text.cancel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={busy}>
          {busy ? text.deleting : text.confirm.yes}
        </Button>
      </div>
    </Modal>
  )
}
