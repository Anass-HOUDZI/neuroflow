
import { useState, useEffect, useCallback, useRef } from 'react'

interface StorageOptions<T> {
  serializer?: {
    serialize: (value: T) => string
    deserialize: (value: string) => T
  }
  syncAcrossTabs?: boolean
}

export function useOptimizedLocalStorage<T>(
  key: string,
  initialValue: T,
  options: StorageOptions<T> = {}
) {
  const {
    serializer = JSON,
    syncAcrossTabs = true
  } = options

  // Use ref to track if we're in the initial mount
  const isInitialMount = useRef(true)
  
  // Initialize state lazily
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? serializer.deserialize(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Memoized setter function
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer.serialize(valueToStore))
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, serializer, storedValue])

  // Listen for changes from other tabs/windows
  useEffect(() => {
    if (!syncAcrossTabs) return

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(serializer.deserialize(e.newValue))
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, serializer, syncAcrossTabs])

  // Skip effect on initial mount to avoid double execution
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
  }, [])

  return [storedValue, setValue] as const
}
