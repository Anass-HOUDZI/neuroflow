interface UsageEvent {
  event: string;
  module: string;
  timestamp: number;
  properties?: Record<string, any>;
  sessionId: string;
}

interface UserSession {
  id: string;
  startTime: number;
  endTime?: number;
  pageViews: string[];
  events: UsageEvent[];
  userAgent: string;
  screenResolution: string;
}

class UsageAnalytics {
  private currentSession: UserSession | null = null;
  private events: UsageEvent[] = [];
  private isEnabled: boolean;

  constructor() {
    // Only enable analytics if user has opted in
    this.isEnabled = localStorage.getItem('neuroflow-analytics') === 'true';
    
    if (this.isEnabled) {
      this.initSession();
      this.setupEventListeners();
    }
  }

  private initSession() {
    this.currentSession = {
      id: this.generateSessionId(),
      startTime: Date.now(),
      pageViews: [window.location.pathname],
      events: [],
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`
    };

    // Load existing events from localStorage
    const storedEvents = localStorage.getItem('neuroflow-usage-events');
    if (storedEvents) {
      try {
        this.events = JSON.parse(storedEvents);
      } catch (error) {
        console.warn('Failed to parse stored events:', error);
      }
    }
  }

  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupEventListeners() {
    // Track page navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      this.trackPageView(window.location.pathname);
    };

    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      this.trackPageView(window.location.pathname);
    };

    window.addEventListener('popstate', () => {
      this.trackPageView(window.location.pathname);
    });

    // Track session end
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });

    // Track visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('app_backgrounded', 'system');
      } else {
        this.trackEvent('app_foregrounded', 'system');
      }
    });
  }

  trackEvent(event: string, module: string, properties?: Record<string, any>) {
    if (!this.isEnabled || !this.currentSession) return;

    const usageEvent: UsageEvent = {
      event,
      module,
      timestamp: Date.now(),
      properties,
      sessionId: this.currentSession.id
    };

    this.events.push(usageEvent);
    this.currentSession.events.push(usageEvent);

    // Store events locally (privacy-first approach)
    this.saveEventsToStorage();

    // Optional: Send to external analytics (only if explicitly enabled)
    if (localStorage.getItem('neuroflow-external-analytics') === 'true') {
      this.sendToExternalAnalytics(usageEvent);
    }
  }

  trackPageView(path: string) {
    if (!this.isEnabled || !this.currentSession) return;

    this.currentSession.pageViews.push(path);
    this.trackEvent('page_view', 'navigation', { path });
  }

  trackFeatureUsage(feature: string, module: string, duration?: number) {
    this.trackEvent('feature_used', module, { feature, duration });
  }

  trackError(error: string, module: string, details?: any) {
    this.trackEvent('error_occurred', module, { error, details });
  }

  private saveEventsToStorage() {
    try {
      // Keep only the last 1000 events to prevent storage bloat
      const recentEvents = this.events.slice(-1000);
      localStorage.setItem('neuroflow-usage-events', JSON.stringify(recentEvents));
    } catch (error) {
      console.warn('Failed to save events to storage:', error);
    }
  }

  private sendToExternalAnalytics(event: UsageEvent) {
    // Placeholder for external analytics integration
    // This would typically send to services like Google Analytics, Mixpanel, etc.
    console.log('External analytics:', event);
  }

  private endSession() {
    if (!this.currentSession) return;

    this.currentSession.endTime = Date.now();
    this.trackEvent('session_ended', 'system', {
      duration: this.currentSession.endTime - this.currentSession.startTime,
      pageViews: this.currentSession.pageViews.length,
      events: this.currentSession.events.length
    });
  }

  getUsageStats() {
    if (!this.isEnabled) return null;

    const now = Date.now();
    const last7Days = now - (7 * 24 * 60 * 60 * 1000);
    const last30Days = now - (30 * 24 * 60 * 60 * 1000);

    const recentEvents = this.events.filter(event => event.timestamp > last7Days);
    const monthlyEvents = this.events.filter(event => event.timestamp > last30Days);

    // Group events by module
    const moduleUsage = recentEvents.reduce((acc, event) => {
      acc[event.module] = (acc[event.module] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Calculate session statistics
    const sessions = [...new Set(recentEvents.map(event => event.sessionId))];
    const averageSessionDuration = this.calculateAverageSessionDuration(sessions);

    return {
      totalEvents: this.events.length,
      last7Days: recentEvents.length,
      last30Days: monthlyEvents.length,
      moduleUsage,
      uniqueSessions: sessions.length,
      averageSessionDuration,
      mostUsedFeatures: this.getMostUsedFeatures(recentEvents)
    };
  }

  private calculateAverageSessionDuration(sessionIds: string[]): number {
    // This would calculate based on session start/end events
    // Simplified implementation for now
    return 0;
  }

  private getMostUsedFeatures(events: UsageEvent[]): Array<{ feature: string; count: number }> {
    const featureUsage = events
      .filter(event => event.event === 'feature_used')
      .reduce((acc, event) => {
        const feature = event.properties?.feature || 'unknown';
        acc[feature] = (acc[feature] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(featureUsage)
      .map(([feature, count]) => ({ feature, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  enableAnalytics() {
    this.isEnabled = true;
    localStorage.setItem('neuroflow-analytics', 'true');
    this.initSession();
    this.setupEventListeners();
  }

  disableAnalytics() {
    this.isEnabled = false;
    localStorage.removeItem('neuroflow-analytics');
    localStorage.removeItem('neuroflow-usage-events');
    this.currentSession = null;
    this.events = [];
  }

  exportData() {
    if (!this.isEnabled) return null;

    return {
      sessions: this.currentSession ? [this.currentSession] : [],
      events: this.events,
      stats: this.getUsageStats(),
      exportDate: new Date().toISOString()
    };
  }
}

export const usageAnalytics = new UsageAnalytics();
export default UsageAnalytics;
