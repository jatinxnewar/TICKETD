"use client"

import { useCallback, useEffect, useState } from "react"
import { mockStore } from "@/lib/mock-data"

interface StoreDataState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refresh: () => void
}

/**
 * Loads data from the demo store and re-runs whenever the store mutates, so a
 * purchase made on one screen is reflected on every other mounted screen.
 *
 * The fetcher runs only after mount: the store hydrates from localStorage on the
 * client, and reading it during render would desync the server-rendered markup.
 */
export function useStoreData<T>(
  fetcher: () => Promise<T>,
  errorMessage = "Something went wrong. Please try again.",
): StoreDataState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [nonce, setNonce] = useState(0)

  const refresh = useCallback(() => setNonce(n => n + 1), [])

  useEffect(() => {
    let cancelled = false

    mockStore.hydrate()

    ;(async () => {
      try {
        setError(null)
        const result = await fetcher()
        if (!cancelled) setData(result)
      } catch (err) {
        console.error(err)
        if (!cancelled) setError(err instanceof Error ? err.message : errorMessage)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce])

  useEffect(() => {
    const unsubscribe = mockStore.subscribe(refresh)
    return () => {
      unsubscribe()
    }
  }, [refresh])

  return { data, loading, error, refresh }
}
