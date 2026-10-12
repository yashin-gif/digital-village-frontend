import { useState } from 'react'
import Alert from '../common/Alert'
import Button from '../common/Button'
import Input from '../common/Input'
import RelationPicker from '../common/RelationPicker'
import useLanguage from '../../hooks/useLanguage'
import { ADMIN_RESOURCES } from '../../utils/adminConfig'

const controlClass =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100'

const normalizeOption = (option) => (typeof option === 'string' ? { value: option, label: option } : option)

function buildInitial(fields, initial) {
  const values = {}

  fields.forEach((field) => {
    const current = initial?.[field.name]

    if (field.type === 'checkbox') {
      values[field.name] = current ?? field.default ?? false
    } else if (field.type === 'relation') {
      values[field.name] = current == null ? '' : String(current)
    } else {
      values[field.name] = current ?? field.default ?? ''
    }
  })

  return values
}

// সব রিসোর্সের জন্য এক ফর্ম — ফিল্ডের বর্ণনা দেখে নিজেই ইনপুট বানায়
export default function ResourceForm({ fields, initial, saving, error, onSubmit, onCancel }) {
  const { t } = useLanguage()
  const text = t.admin
  const [values, setValues] = useState(() => buildInitial(fields, initial))
  const [errors, setErrors] = useState({})

  const labelFor = (field) => text.fields[field.name] ?? field.name

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field.name]: value }))
    setErrors((prev) => ({ ...prev, [field.name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    fields.forEach((field) => {
      const value = values[field.name]
      if (field.required && (value === '' || value == null)) nextErrors[field.name] = text.requiredField
    })

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload = {}
    fields.forEach((field) => {
      const value = values[field.name]

      if (field.type === 'checkbox') {
        payload[field.name] = Boolean(value)
      } else if (field.type === 'relation') {
        // আইডি সংখ্যা হলে সংখ্যা হিসেবেই পাঠাবে
        payload[field.name] = value === '' ? null : Number.isNaN(Number(value)) ? value : Number(value)
      } else if (field.type === 'number') {
        payload[field.name] = value === '' ? null : Number(value)
      } else {
        const clean = typeof value === 'string' ? value.trim() : value
        if (clean === '' || clean == null) {
          payload[field.name] = null
        } else if (field.type === 'date' && field.asDateTime) {
          // ব্যাকেন্ডে datetime চায়
          payload[field.name] = `${clean}T00:00:00`
        } else {
          payload[field.name] = clean
        }
      }
    })

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && <Alert>{error}</Alert>}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const wide = field.type === 'textarea' || field.type === 'checkbox'
          const id = `field-${field.name}`
          const fieldError = errors[field.name]

          if (field.type === 'checkbox') {
            return (
              <label
                key={field.name}
                htmlFor={id}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 sm:col-span-2"
              >
                <input
                  id={id}
                  type="checkbox"
                  checked={Boolean(values[field.name])}
                  onChange={(event) => handleChange(field, event.target.checked)}
                  className="h-5 w-5 accent-brand-600"
                />
                <span className="text-sm font-semibold text-slate-700">{labelFor(field)}</span>
              </label>
            )
          }

          if (field.type === 'relation') {
            return (
              <div key={field.name}>
                <RelationPicker
                  fieldId={id}
                  label={labelFor(field)}
                  path={ADMIN_RESOURCES[field.resource].path}
                  labelFn={field.label}
                  value={values[field.name]}
                  onChange={(next) => handleChange(field, next)}
                  required={field.required}
                  error={fieldError}
                />
              </div>
            )
          }

          if (field.type === 'select') {
            const options = (field.options ?? []).map(normalizeOption).map((option) => ({
              value: option.value,
              label: text.options?.[field.name]?.[option.value] ?? option.label,
            }))

            return (
              <div key={field.name}>
                <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {labelFor(field)}
                  {field.required && <span className="text-rose-600"> *</span>}
                </label>
                <select
                  id={id}
                  value={values[field.name]}
                  onChange={(event) => handleChange(field, event.target.value)}
                  className={controlClass}
                >
                  <option value="">{text.chooseOne}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldError && <p className="mt-1.5 text-sm font-medium text-rose-600">{fieldError}</p>}
              </div>
            )
          }

          if (field.type === 'textarea') {
            return (
              <div key={field.name} className={wide ? 'sm:col-span-2' : ''}>
                <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-700">
                  {labelFor(field)}
                </label>
                <textarea
                  id={id}
                  rows={3}
                  value={values[field.name]}
                  onChange={(event) => handleChange(field, event.target.value)}
                  className={controlClass}
                />
              </div>
            )
          }

          return (
            <Input
              key={field.name}
              label={`${labelFor(field)}${field.required ? ' *' : ''}`}
              type={field.type}
              value={values[field.name]}
              error={fieldError}
              onChange={(event) => handleChange(field, event.target.value)}
            />
          )
        })}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onCancel} disabled={saving}>
          {text.cancel}
        </Button>
        <Button type="submit" disabled={saving}>
          {saving ? text.saving : text.save}
        </Button>
      </div>
    </form>
  )
}
