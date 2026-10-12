// ব্যাকএন্ডের সাথে কথা বলার একমাত্র জায়গা।
// ডেভেলপমেন্টে '/api' প্রক্সি ব্যবহার হয় (vite.config.js দেখো)।
const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

const ACCESS_KEY = 'village-access-token'
const REFRESH_KEY = 'village-refresh-token'

export const tokenStore = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set(access, refresh) {
    localStorage.setItem(ACCESS_KEY, access)
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh)
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

export class ApiError extends Error {
  constructor(status, detail) {
    super(typeof detail === 'string' ? detail : 'Request failed')
    this.name = 'ApiError'
    this.status = status
    this.detail = detail
  }
}

async function parseBody(response) {
  if (response.status === 204) return null

  const text = await response.text()
  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

async function refreshTokens() {
  const refreshToken = tokenStore.getRefresh()
  if (!refreshToken) return false

  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    if (!response.ok) return false

    const data = await response.json()
    tokenStore.set(data.access_token, data.refresh_token)
    return true
  } catch {
    return false
  }
}

// একসাথে অনেক রিকোয়েস্ট 401 পেলেও টোকেন রিফ্রেশ একবারই হবে
let refreshing = null

async function request(path, options = {}) {
  const {
    method = 'GET',
    body,
    form,
    rawBody,
    auth = true,
    headers = {},
    retry = true,
  } = options

  const init = { method, headers: { Accept: 'application/json', ...headers } }

  if (rawBody) {
    // ফাইল আপলোড: FormData হুবহু যাবে, Content-Type ব্রাউজার নিজে ঠিক করে
    init.body = rawBody
  } else if (form) {
    // লগইনের জন্য (FastAPI OAuth2 ফর্ম)
    init.body = new URLSearchParams(form)
  } else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json'
    init.body = JSON.stringify(body)
  }

  const token = tokenStore.getAccess()
  if (auth && token) init.headers.Authorization = `Bearer ${token}`

  let response

  try {
    response = await fetch(`${API_URL}${path}`, init)
  } catch {
    throw new ApiError(0, 'Network error')
  }

  if (response.status === 401 && auth && retry && tokenStore.getRefresh()) {
    refreshing = refreshing || refreshTokens().finally(() => {
      refreshing = null
    })

    const refreshed = await refreshing

    // FormData একবার পাঠানো হলে আবার পাঠানো যায় (একই অবজেক্ট), তাই retry নিরাপদ
    if (refreshed) return request(path, { ...options, retry: false })

    tokenStore.clear()
    window.dispatchEvent(new Event('auth:logout'))
  }

  const data = await parseBody(response)

  if (!response.ok) {
    const detail =
      data && typeof data === 'object' && 'detail' in data ? data.detail : data
    throw new ApiError(response.status, detail)
  }

  // সার্ভার মোট সংখ্যা জানালে তালিকার সাথে .total হিসেবে থাকে (পেজিনেশনের জন্য)
  const total = response.headers.get('X-Total-Count')
  if (total !== null && Array.isArray(data)) data.total = Number(total)

  return data
}

export const api = {
  get: (path, options) => request(path, options),
  post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
  patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
  delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
  postForm: (path, form, options) => request(path, { ...options, method: 'POST', form }),
  upload: (path, formData, options) => request(path, { ...options, method: 'POST', rawBody: formData }),
}