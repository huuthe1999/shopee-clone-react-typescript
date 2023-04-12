import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'

import useEventCallback from './useEventCallback'

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent
  }
}

const STORAGE_KEYS_PREFIX = 'shoppe-app_'

type SetValue<T> = Dispatch<SetStateAction<T>>

/**
 *
 *
 * @template T
 * @param {string} key
 * @param {T} initialValue
 * @returns {*}  {[T, SetValue<T>]}
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, SetValue<T>] => {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = useCallback((): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(STORAGE_KEYS_PREFIX + key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${STORAGE_KEYS_PREFIX + key}”:`, error)
      return initialValue
    }
  }, [initialValue, key])

  const [storedValue, setStoredValue] = useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = useEventCallback((value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${
          STORAGE_KEYS_PREFIX + key
        }” even though environment is not a client`
      )
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(STORAGE_KEYS_PREFIX + key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)

      // // We dispatch a custom event so every useLocalStorage hook are notified
      // window.dispatchEvent(new Event('local-storage'))
    } catch (error) {
      console.warn(`Error setting localStorage key “${STORAGE_KEYS_PREFIX + key}”:`, error)
    }
  })

  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue]
  )

  // // install the watcher
  // useEffect(() => {
  //   window.addEventListener('storage', handleStorageChange)
  //   // stop listening on remove
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange)
  //   }
  // }, [storedValue])

  // // this only works for other documents, not the current one
  // useEventListener('storage', handleStorageChange)

  // // this is a custom event, triggered in writeValueToLocalStorage
  // // See: useLocalStorage()
  // useEventListener('local-storage', handleStorageChange)

  return [storedValue, setValue]
}
export default useLocalStorage

/**
 *
 *
 * @template T
 * @param {(string | null)} value
 * @returns {*}  {(T | undefined)}
 */
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch {
    console.log('parsing error on', { value })
    return undefined
  }
}
