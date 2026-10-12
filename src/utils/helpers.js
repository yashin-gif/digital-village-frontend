// এরর থেকে ব্যবহারকারীর ভাষায় বার্তা বানায়
export function getErrorMessage(error, t) {
  const messages = t.errors

  if (!error) return messages.generic
  if (error.status === 0) return messages.network

  if (typeof error.detail === 'string' && messages.known[error.detail]) {
    return messages.known[error.detail]
  }

  if (error.status === 404) return messages.notFound
  if (error.status === 422) return messages.invalid
  if (error.status >= 500) return messages.server

  return messages.generic
}

export function truncate(text, max = 140) {
  if (!text) return ''

  const clean = String(text).replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max).trimEnd()}…` : clean
}

export function phoneHref(phone) {
  return `tel:${String(phone).replace(/[^\d+]/g, '')}`
}

export function mapSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function mapEmbedUrl(query) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
}

// latitude/longitude কখনো স্ট্রিং, কখনো সংখ্যা আসে — দুটোই সামলায়
export function getMapQuery(item) {
  const lat = Number.parseFloat(item.latitude)
  const lng = Number.parseFloat(item.longitude)

  if (Number.isFinite(lat) && Number.isFinite(lng)) return `${lat},${lng}`

  return item.address || ''
}

export function getFullName(person) {
  return [person.first_name, person.last_name].filter(Boolean).join(' ')
}

// খোঁজার লেখা যেকোনো একটা মানে মিললেই true (বড়-ছোট হাতের অক্ষর ধরে না)
export function matchesSearch(values, query) {
  const needle = query.trim().toLowerCase()

  if (!needle) return true

  return values.some((value) =>
    String(value ?? '').toLowerCase().includes(needle),
  )
}