import ResourceForm from './ResourceForm'
import useLanguage from '../../hooks/useLanguage'

// ইউজার যোগ/সম্পাদনা ফর্ম। সম্পাদনায় পাসওয়ার্ড খালি রাখলে আগেরটাই থাকবে।
export default function UserForm({ user, saving, error, onSubmit, onCancel }) {
  const { t } = useLanguage()

  const fields = [
    { name: 'username', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'tel', required: true },
    {
      name: 'role',
      type: 'select',
      required: true,
      options: ['user', 'moderator', 'admin'].map((role) => ({ value: role, label: t.dashboard.roles[role] })),
      default: 'user',
    },
    { name: 'is_active', type: 'checkbox', default: true },
    { name: 'password', type: 'password', required: !user },
  ]

  const handleSubmit = (payload) => {
    const cleaned = { ...payload }
    if (!cleaned.password) delete cleaned.password
    onSubmit(cleaned)
  }

  return (
    <ResourceForm
      fields={fields}
      initial={user}
      saving={saving}
      error={error}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  )
}
