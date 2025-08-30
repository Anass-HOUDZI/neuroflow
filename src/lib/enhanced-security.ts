import { z } from 'zod';
import { SecurityUtils } from './security';

// Enhanced localStorage encryption with integrity checks
export class EnhancedLocalStorageEncryption {
  private static readonly KEY_PREFIX = 'sec_';
  private static readonly INTEGRITY_SUFFIX = '_hash';
  
  // Generate a stronger key derivation
  private static deriveKey(baseKey: string): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(baseKey + 'neuroflow_salt_2024');
    
    // Simple hash for key derivation (not cryptographically secure but better than plain)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data[i];
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  // Generate integrity hash
  private static generateHash(data: string): string {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(16);
  }

  static encryptWithIntegrity(data: any, key: string): string {
    try {
      const jsonString = JSON.stringify(data);
      const derivedKey = this.deriveKey(key);
      
      // Simple XOR encryption with derived key
      let encrypted = '';
      for (let i = 0; i < jsonString.length; i++) {
        const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
        const dataChar = jsonString.charCodeAt(i);
        encrypted += String.fromCharCode(dataChar ^ keyChar);
      }
      
      const encoded = btoa(unescape(encodeURIComponent(encrypted)));
      const hash = this.generateHash(encoded);
      
      return JSON.stringify({ data: encoded, hash });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Enhanced encryption failed:', error);
      }
      return JSON.stringify(data);
    }
  }

  static decryptWithIntegrity(encryptedData: string, key: string): any {
    try {
      const parsed = JSON.parse(encryptedData);
      
      // Check integrity
      if (parsed.data && parsed.hash) {
        const expectedHash = this.generateHash(parsed.data);
        if (expectedHash !== parsed.hash) {
          throw new Error('Data integrity check failed');
        }
        
        const derivedKey = this.deriveKey(key);
        const decoded = decodeURIComponent(escape(atob(parsed.data)));
        
        // Decrypt with XOR
        let decrypted = '';
        for (let i = 0; i < decoded.length; i++) {
          const keyChar = derivedKey.charCodeAt(i % derivedKey.length);
          const dataChar = decoded.charCodeAt(i);
          decrypted += String.fromCharCode(dataChar ^ keyChar);
        }
        
        return JSON.parse(decrypted);
      }
      
      // Fallback for non-integrity data
      return parsed;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Enhanced decryption failed:', error);
      }
      try {
        return JSON.parse(encryptedData);
      } catch {
        return null;
      }
    }
  }

  static setSecureItem(key: string, data: any, encrypt: boolean = true): void {
    try {
      const value = encrypt 
        ? this.encryptWithIntegrity(data, key) 
        : JSON.stringify(data);
      const storageKey = encrypt ? this.KEY_PREFIX + key : key;
      localStorage.setItem(storageKey, value);
      
      // Store timestamp for audit
      if (encrypt) {
        localStorage.setItem(storageKey + '_ts', Date.now().toString());
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to save secure item:', error);
      }
    }
  }

  static getSecureItem(key: string, encrypted: boolean = true): any {
    try {
      const storageKey = encrypted ? this.KEY_PREFIX + key : key;
      const value = localStorage.getItem(storageKey);
      
      if (!value) return null;
      
      if (encrypted) {
        return this.decryptWithIntegrity(value, key);
      } else {
        return JSON.parse(value);
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to read secure item:', error);
      }
      return null;
    }
  }

  // Clean up old encrypted data
  static cleanupOldData(maxAge: number = 30 * 24 * 60 * 60 * 1000): void {
    try {
      const now = Date.now();
      const keysToRemove: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(this.KEY_PREFIX) && key.endsWith('_ts')) {
          const timestamp = parseInt(localStorage.getItem(key) || '0');
          if (now - timestamp > maxAge) {
            const dataKey = key.replace('_ts', '');
            keysToRemove.push(dataKey, key);
          }
        }
      }
      
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to cleanup old data:', error);
      }
    }
  }
}

// Enhanced security validation schemas
export const EnhancedValidationSchemas = {
  // User input with comprehensive sanitization
  userInput: z.string()
    .min(1)
    .max(1000)
    .transform(SecurityUtils.sanitizeString),
  
  // Secure object with prototype pollution protection
  secureObject: z.record(z.unknown())
    .transform(SecurityUtils.sanitizeObjectKeys),
  
  // File validation with enhanced checks
  fileMetadata: z.object({
    name: z.string().min(1).max(255).regex(/^[a-zA-Z0-9._-]+$/),
    size: z.number().min(1).max(10 * 1024 * 1024),
    type: z.string().min(1).max(100),
    lastModified: z.number().optional()
  }),
  
  // Analytics data with privacy protection
  analyticsEvent: z.object({
    event: z.string().min(1).max(50),
    timestamp: z.number(),
    properties: z.record(z.union([z.string(), z.number(), z.boolean()])).optional()
  }).transform((data) => ({
    ...data,
    properties: data.properties ? SecurityUtils.sanitizeObjectKeys(data.properties) : undefined
  }))
};

// Security event logging
export class SecurityEventLogger {
  private static readonly LOG_KEY = 'sec_events';
  private static readonly MAX_EVENTS = 100;
  
  static logEvent(type: 'validation_error' | 'integrity_check' | 'rate_limit' | 'suspicious_activity', details: any): void {
    if (process.env.NODE_ENV === 'production') {
      // In production, only log security events without sensitive data
      const sanitizedEvent = {
        type,
        timestamp: Date.now(),
        id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
        // Don't log actual details in production for privacy
        hasDetails: !!details
      };
      
      this.addToEventLog(sanitizedEvent);
    }
  }
  
  private static addToEventLog(event: any): void {
    try {
      const events = EnhancedLocalStorageEncryption.getSecureItem(this.LOG_KEY, true) || [];
      events.push(event);
      
      // Keep only recent events
      if (events.length > this.MAX_EVENTS) {
        events.splice(0, events.length - this.MAX_EVENTS);
      }
      
      EnhancedLocalStorageEncryption.setSecureItem(this.LOG_KEY, events, true);
    } catch (error) {
      // Silently fail to avoid recursive logging
    }
  }
  
  static getSecurityEvents(): any[] {
    return EnhancedLocalStorageEncryption.getSecureItem(this.LOG_KEY, true) || [];
  }
}

// Content Security Policy utilities
export class CSPUtils {
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }
  
  static addCSPMeta(): string {
    const nonce = this.generateNonce();
    
    const cspContent = [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' 'unsafe-eval'`, // unsafe-eval needed for Vite in dev
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https:",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    const existingMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existingMeta) {
      existingMeta.setAttribute('content', cspContent);
    } else {
      const meta = document.createElement('meta');
      meta.httpEquiv = 'Content-Security-Policy';
      meta.content = cspContent;
      document.head.appendChild(meta);
    }
    
    return nonce;
  }
}
