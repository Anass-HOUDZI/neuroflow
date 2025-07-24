import { useState, useEffect, useCallback } from 'react';
import { LocalStorageEncryption } from '@/lib/security';

export function useSecureLocalStorage<T>(
  key: string, 
  initialValue: T, 
  encrypt: boolean = false
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = LocalStorageEncryption.getItem(key, encrypt);
      return item !== null ? item : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      LocalStorageEncryption.setItem(key, valueToStore, encrypt);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, encrypt, storedValue]);

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      const storageKey = encrypt ? `encrypted_${key}` : key;
      
      if (e.key === storageKey && e.newValue !== null) {
        try {
          const newValue = encrypt 
            ? LocalStorageEncryption.decrypt(e.newValue)
            : JSON.parse(e.newValue);
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, encrypt]);

  return [storedValue, setValue] as const;
}