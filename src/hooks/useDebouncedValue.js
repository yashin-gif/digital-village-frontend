import { useEffect, useState } from 'react'

// টাইপ করার সময় প্রতিটি অক্ষরে সার্ভারে না গিয়ে, থামলে একবার
export default function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
