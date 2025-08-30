import { CSPUtils, EnhancedLocalStorageEncryption, SecurityEventLogger } from '@/lib/enhanced-security';
import { ProductionLogger } from '@/core/utils/production-logger';

/**
 * Central security manager for the application
 */
export class SecurityManager {
  private static instance: SecurityManager;
  private isInitialized = false;
  
  private constructor() {}
  
  public static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }
  
  /**
   * Initialize all security measures
   */
  public initialize(): void {
    if (this.isInitialized) return;
    
    ProductionLogger.info('Initializing Security Manager');
    
    // Add Content Security Policy
    this.setupCSP();
    
    // Setup storage security
    this.setupStorageSecurity();
    
    // Setup error boundary integration
    this.setupErrorHandling();
    
    // Setup security monitoring
    this.setupSecurityMonitoring();
    
    // Cleanup old data on startup
    this.performSecurityCleanup();
    
    this.isInitialized = true;
    ProductionLogger.info('Security Manager initialized successfully');
  }
  
  /**
   * Setup Content Security Policy
   */
  private setupCSP(): void {
    try {
      const nonce = CSPUtils.addCSPMeta();
      ProductionLogger.debug('CSP setup completed', { nonce });
    } catch (error) {
      ProductionLogger.error('Failed to setup CSP', error);
    }
  }
  
  /**
   * Setup secure storage practices
   */
  private setupStorageSecurity(): void {
    // Encrypt sensitive localStorage data
    const sensitiveKeys = [
      'user_preferences',
      'analytics_data',
      'habit_data',
      'journal_data',
      'meditation_data'
    ];
    
    sensitiveKeys.forEach(key => {
      const existingData = localStorage.getItem(key);
      if (existingData && !existingData.startsWith('sec_')) {
        try {
          const parsed = JSON.parse(existingData);
          EnhancedLocalStorageEncryption.setSecureItem(key, parsed, true);
          localStorage.removeItem(key);
          ProductionLogger.debug(`Migrated ${key} to secure storage`);
        } catch (error) {
          ProductionLogger.warn(`Failed to migrate ${key} to secure storage`, error);
        }
      }
    });
  }
  
  /**
   * Setup error handling integration
   */
  private setupErrorHandling(): void {
    // Override console.error to catch unhandled errors
    const originalError = console.error;
    console.error = (...args) => {
      // Log security-relevant errors
      const errorMessage = args.join(' ');
      if (this.isSecurityRelevantError(errorMessage)) {
        SecurityEventLogger.logEvent('suspicious_activity', {
          error: errorMessage,
          timestamp: Date.now()
        });
      }
      
      // Call original console.error only in development
      if (process.env.NODE_ENV === 'development') {
        originalError.apply(console, args);
      }
    };
    
    // Global error handler
    window.addEventListener('error', (event) => {
      if (this.isSecurityRelevantError(event.message)) {
        SecurityEventLogger.logEvent('suspicious_activity', {
          message: event.message,
          filename: event.filename,
          line: event.lineno
        });
      }
    });
  }
  
  /**
   * Setup security monitoring
   */
  private setupSecurityMonitoring(): void {
    // Monitor for rapid localStorage changes (potential attack)
    let storageChangeCount = 0;
    const storageWindow = 60000; // 1 minute
    
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key: string, value: string) {
      storageChangeCount++;
      
      // Reset counter every minute
      setTimeout(() => {
        storageChangeCount = Math.max(0, storageChangeCount - 1);
      }, storageWindow);
      
      // Alert if too many changes
      if (storageChangeCount > 50) {
        SecurityEventLogger.logEvent('suspicious_activity', {
          type: 'rapid_storage_changes',
          count: storageChangeCount
        });
      }
      
      return originalSetItem.call(this, key, value);
    };
    
    // Monitor for prototype pollution attempts
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj: any, prop: string | symbol, descriptor: PropertyDescriptor) {
      if (prop === '__proto__' || prop === 'constructor' || prop === 'prototype') {
        SecurityEventLogger.logEvent('suspicious_activity', {
          type: 'prototype_pollution_attempt',
          property: prop.toString()
        });
        return obj; // Block the operation
      }
      return originalDefineProperty.call(this, obj, prop, descriptor);
    };
  }
  
  /**
   * Check if an error is security-relevant
   */
  private isSecurityRelevantError(message: string): boolean {
    const securityKeywords = [
      'script',
      'eval',
      'prototype',
      '__proto__',
      'constructor',
      'innerHTML',
      'outerHTML',
      'javascript:',
      'data:text/html',
      'vbscript:',
      'onload',
      'onerror'
    ];
    
    return securityKeywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  /**
   * Perform security cleanup
   */
  private performSecurityCleanup(): void {
    try {
      // Clean up old encrypted data
      EnhancedLocalStorageEncryption.cleanupOldData();
      
      // Clean up old security events (keep last 30 days)
      const maxAge = 30 * 24 * 60 * 60 * 1000;
      const events = SecurityEventLogger.getSecurityEvents();
      const now = Date.now();
      const filteredEvents = events.filter(event => 
        now - event.timestamp < maxAge
      );
      
      if (filteredEvents.length !== events.length) {
        EnhancedLocalStorageEncryption.setSecureItem('sec_events', filteredEvents, true);
      }
      
      ProductionLogger.debug('Security cleanup completed');
    } catch (error) {
      ProductionLogger.error('Security cleanup failed', error);
    }
  }
  
  /**
   * Get security status report
   */
  public getSecurityReport(): {
    cspEnabled: boolean;
    encryptedStorageActive: boolean;
    securityEventsCount: number;
    lastCleanup: number;
  } {
    const events = SecurityEventLogger.getSecurityEvents();
    
    return {
      cspEnabled: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]'),
      encryptedStorageActive: localStorage.getItem('sec_user_preferences') !== null,
      securityEventsCount: events.length,
      lastCleanup: Date.now()
    };
  }
}

// Auto-initialize security manager
if (typeof window !== 'undefined') {
  const securityManager = SecurityManager.getInstance();
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      securityManager.initialize();
    });
  } else {
    securityManager.initialize();
  }
}

export default SecurityManager;
