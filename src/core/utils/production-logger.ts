// Production-safe logging utility
export class ProductionLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development';
  
  // Log levels
  static debug(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[DEBUG] ${message}`, data);
    }
  }
  
  static info(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
  }
  
  static warn(message: string, data?: any): void {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    } else {
      // In production, log warnings to analytics or monitoring service
      this.logToMonitoring('warn', message, data);
    }
  }
  
  static error(message: string, error?: any): void {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${message}`, error);
    } else {
      // In production, log errors to monitoring service
      this.logToMonitoring('error', message, error);
    }
  }
  
  // Performance logging
  static performance(metric: string, value: number, unit: string = 'ms'): void {
    if (this.isDevelopment) {
      console.log(`[PERF] ${metric}: ${value}${unit}`);
    }
  }
  
  // Security event logging
  static security(event: string, details?: any): void {
    if (this.isDevelopment) {
      console.warn(`[SECURITY] ${event}`, details);
    } else {
      // In production, send to security monitoring
      this.logToMonitoring('security', event, details);
    }
  }
  
  private static logToMonitoring(level: string, message: string, data?: any): void {
    // Store in localStorage for potential transmission to monitoring service
    try {
      const event = {
        level,
        message,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        // Don't include sensitive data in production logs
        hasData: !!data
      };
      
      const logs = JSON.parse(localStorage.getItem('prod_logs') || '[]');
      logs.push(event);
      
      // Keep only recent logs (last 50)
      if (logs.length > 50) {
        logs.splice(0, logs.length - 50);
      }
      
      localStorage.setItem('prod_logs', JSON.stringify(logs));
    } catch (error) {
      // Silently fail to avoid recursive logging
    }
  }
  
  // Get production logs for debugging
  static getProductionLogs(): any[] {
    try {
      return JSON.parse(localStorage.getItem('prod_logs') || '[]');
    } catch {
      return [];
    }
  }
  
  // Clear production logs
  static clearProductionLogs(): void {
    localStorage.removeItem('prod_logs');
  }
}
