import { z } from 'zod';

// File size limits (in bytes)
export const FILE_SIZE_LIMITS = {
  CSV: 10 * 1024 * 1024, // 10MB
  JSON: 5 * 1024 * 1024,  // 5MB
  GENERAL: 1024 * 1024    // 1MB default
};

// Row limits for data import
export const ROW_LIMITS = {
  CSV: 10000,
  JSON: 5000
};

// Security utility functions
export class SecurityUtils {
  /**
   * Sanitize string input to prevent XSS
   */
  static sanitizeString(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  /**
   * Validate object keys to prevent prototype pollution
   */
  static sanitizeObjectKeys(obj: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};
    
    Object.entries(obj).forEach(([key, value]) => {
      // Prevent prototype pollution
      if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
        return;
      }
      
      // Sanitize key name
      const cleanKey = this.sanitizeString(key);
      if (cleanKey && cleanKey.length > 0 && cleanKey.length < 100) {
        sanitized[cleanKey] = typeof value === 'string' ? this.sanitizeString(value) : value;
      }
    });
    
    return sanitized;
  }

  /**
   * Validate file size and type
   */
  static validateFile(file: File, allowedTypes: string[], maxSize: number): void {
    if (!file) {
      throw new Error('Aucun fichier sélectionné');
    }

    if (file.size > maxSize) {
      throw new Error(`Fichier trop volumineux. Taille maximum: ${Math.round(maxSize / 1024 / 1024)}MB`);
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !allowedTypes.includes(extension)) {
      throw new Error(`Type de fichier non autorisé. Types acceptés: ${allowedTypes.join(', ')}`);
    }
  }

  /**
   * Rate limiting for operations
   */
  static createRateLimiter(maxRequests: number, windowMs: number) {
    const requests = new Map<string, number[]>();

    return (key: string): boolean => {
      const now = Date.now();
      const windowStart = now - windowMs;

      if (!requests.has(key)) {
        requests.set(key, []);
      }

      const keyRequests = requests.get(key)!;
      
      // Remove old requests outside the window
      const validRequests = keyRequests.filter(timestamp => timestamp > windowStart);
      
      if (validRequests.length >= maxRequests) {
        return false; // Rate limit exceeded
      }

      validRequests.push(now);
      requests.set(key, validRequests);
      return true;
    };
  }
}

// Data validation schemas
export const DataValidationSchemas = {
  csvRow: z.record(z.union([z.string(), z.number(), z.null()])),
  
  jsonData: z.array(z.record(z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null()
  ]))).max(ROW_LIMITS.JSON),

  statsData: z.object({
    name: z.string().min(1).max(50),
    values: z.array(z.number()).min(1).max(1000),
    type: z.enum(['continuous', 'discrete', 'categorical'])
  })
};

// Simple encryption for sensitive localStorage data
export class LocalStorageEncryption {
  private static readonly KEY_PREFIX = 'encrypted_';
  
  static encrypt(data: any, key: string): string {
    try {
      const jsonString = JSON.stringify(data);
      // Simple base64 encoding (not cryptographically secure, but better than plain text)
      return btoa(unescape(encodeURIComponent(jsonString)));
    } catch (error) {
      console.warn('Encryption failed:', error);
      return JSON.stringify(data);
    }
  }

  static decrypt(encryptedData: string): any {
    try {
      const decoded = decodeURIComponent(escape(atob(encryptedData)));
      return JSON.parse(decoded);
    } catch (error) {
      console.warn('Decryption failed:', error);
      // Fallback to parse as regular JSON
      try {
        return JSON.parse(encryptedData);
      } catch {
        return null;
      }
    }
  }

  static setItem(key: string, data: any, encrypt: boolean = false): void {
    try {
      const value = encrypt ? this.encrypt(data, key) : JSON.stringify(data);
      const storageKey = encrypt ? this.KEY_PREFIX + key : key;
      localStorage.setItem(storageKey, value);
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static getItem(key: string, encrypted: boolean = false): any {
    try {
      const storageKey = encrypted ? this.KEY_PREFIX + key : key;
      const value = localStorage.getItem(storageKey);
      
      if (!value) return null;
      
      return encrypted ? this.decrypt(value) : JSON.parse(value);
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }
}

// CSRF protection utility
export class CSRFProtection {
  private static readonly TOKEN_KEY = 'csrf_token';
  
  static generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  static setToken(): string {
    const token = this.generateToken();
    sessionStorage.setItem(this.TOKEN_KEY, token);
    return token;
  }

  static getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  static validateToken(token: string): boolean {
    const storedToken = this.getToken();
    return storedToken !== null && storedToken === token;
  }
}