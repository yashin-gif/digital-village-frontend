import { useEffect, useState } from 'react'
import { api } from '../services/api'

// পাতা অনুযায়ী তালিকা: সার্ভার থেকে শুধু একটা পাতা আনে।
// params বদলালে (যেমন খোঁজ) পাতা আপনা-আপনি ১-এ ফিরে যায়।
export default function usePagedList(path, { params = {}, pageSize = 20, auth = true } = {}) {
  const key = JSON.stringify([path, params, pageSize])

  // page এমনভাবে রাখা হয় যাতে params বদলালে পুরনো পাতা নতুন তালিকায় না থাকে
  const [pageState, setPageState] = useState({ key, page: 1 })
  const page = pageState.key === key ? pageState.page : 1

  const [reloadKey, setReloadKey] = useState(0)
  const [state, setState] = useState({ data: [], total: 0, loading: true, error: null })

  useEffect(() => {
    let cancelled = false

    const query = new URLSearchParams()
    Object.entries(params).forEach(([name, value]) => {
      if (value !== undefined && value !== null && value !== '') query.set(name, String(value))
    })
    query.set('limit', String(pageSize))
    query.set('offset', String((page - 1) * pageSize))

    setState((prev) => ({ ...prev, loading: true, error: null }))

    api
      .get(`${path}?${query.toString()}`, { auth })
      .then((data) => {
        if (!cancelled) setState({ data, total: data.total ?? data.length, loading: false, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState((prev) => ({ ...prev, loading: false, error }))
      })

    return () => {
      cancelled = true
    }
    // key এর ভেতরেই path, params ও pageSize আছে
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, page, reloadKey, auth])

  return {
    data: state.data,
    total: state.total,
    loading: state.loading,
    error: state.error,
    page,
    pages: Math.max(1, Math.ceil(state.total / pageSize)),
    pageSize,
    setPage: (next) => setPageState({ key, page: next }),
    reload: () => setReloadKey((value) => value + 1),
  }
}
