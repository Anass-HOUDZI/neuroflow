import { useState, useEffect, useCallback } from 'react';
import { EnhancedLocalStorageEncryption, SecurityEventLogger } from '@/lib/enhanced-security';

export function useEnhancedSecureStorage<T>(
  key: string, 
  initialValue: T, 
  encrypt: boolean = true,
  options: {
    syncAcrossTabs?: boolean;
    validateData?: (data: any) => boolean;
    onError?: (error: Error) => void;
  } = {}
) {
  const { syncAcrossTabs = false, validateData, onError } = options;
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = EnhancedLocalStorageEncryption.getSecureItem(key, encrypt);
      
      if (item !== null) {
        // Validate data if validator provided
        if (validateData && !validateData(item)) {
          SecurityEventLogger.logEvent('validation_error', { key, type: 'initial_load' });
          return initialValue;
        }
        return item;
      }
      
      return initialValue;
    } catch (error) {
      SecurityEventLogger.logEvent('validation_error', { key, error: error instanceof Error ? error.message : 'unknown' });
      onError?.(error instanceof Error ? error : new Error('Storage read failed'));
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate data before storing
      if (validateData && !validateData(valueToStore)) {
        const error = new Error('Data validation failed');
        SecurityEventLogger.logEvent('validation_error', { key, type: 'before_store' });
        onError?.(error);
        return;
      }
      
      setStoredValue(valueToStore);
      EnhancedLocalStorageEncryption.setSecureItem(key, valueToStore, encrypt);
    } catch (error) {
      SecurityEventLogger.logEvent('validation_error', { key, error: error instanceof Error ? error.message : 'unknown' });
      onError?.(error instanceof Error ? error : new Error('Storage write failed'));
    }
  }, [key, encrypt, storedValue, validateData, onError]);

  // Clear data
  const clearValue = useCallback(() => {
    try {
      const storageKey = encrypt ? `sec_${key}` : key;
      localStorage.removeItem(storageKey);
      localStorage.removeItem(storageKey + '_ts');
      setStoredValue(initialValue);
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error('Storage clear failed'));
    }
  }, [key, encrypt, initialValue, onError]);

  // Listen for changes from other tabs/windows if enabled
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (e: StorageEvent) => {
      const storageKey = encrypt ? `sec_${key}` : key;
      
      if (e.key === storageKey && e.newValue !== null) {
        try {
          const newValue = encrypt 
            ? EnhancedLocalStorageEncryption.decryptWithIntegrity(e.newValue, key)
            : JSON.parse(e.newValue);
            
          if (validateData && !validateData(newValue)) {
            SecurityEventLogger.logEvent('validation_error', { key, type: 'cross_tab_sync' });
            return;
          }
          
          setStoredValue(newValue);
        } catch (error) {
          SecurityEventLogger.logEvent('validation_error', { key, error: error instanceof Error ? error.message : 'unknown' });
          onError?.(error instanceof Error ? error : new Error('Cross-tab sync failed'));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, encrypt, validateData, onError, syncAcrossTabs]);

  // Cleanup old data on mount
  useEffect(() => {
    EnhancedLocalStorageEncryption.cleanupOldData();
  }, []);

  return [storedValue, setValue, clearValue] as const;
}