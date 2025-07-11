
import { useCallback, useRef } from 'react'

export function useDebouncedSave<T>(
  saveFunction: (data: T) => void,
  delay: number = 2000
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const debouncedSave = useCallback((data: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      saveFunction(data)
      timeoutRef.current = null
    }, delay)
  }, [saveFunction, delay])
  
  const saveImmediately = useCallback((data: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    saveFunction(data)
  }, [saveFunction])
  
  const cancelSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])
  
  return {
    debouncedSave,
    saveImmediately,
    cancelSave,
    hasPendingSave: !!timeoutRef.current
  }
}
