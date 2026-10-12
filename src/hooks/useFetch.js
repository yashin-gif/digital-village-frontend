import { useCallback, useEffect, useState } from 'react'
import { api } from '../services/api'

// GET রিকোয়েস্টের জন্য: { data, loading, error, reload }
export default function useFetch(path, { auth = false } = {}) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: Boolean(path),
  })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    if (!path) return undefined

    let cancelled = false

    setState((prev) => ({ ...prev, loading: true, error: null }))

    api
      .get(path, { auth })
      .then((data) => {
        if (!cancelled) setState({ data, error: null, loading: false })
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, error, loading: false })
      })

    return () => {
      cancelled = true
    }
  }, [path, auth, reloadKey])

  const reload = useCallback(() => setReloadKey((key) => key + 1), [])

  return { ...state, reload }
}