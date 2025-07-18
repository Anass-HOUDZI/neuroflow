
import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Types pour l'état global
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    colorScheme: 'blue' | 'purple' | 'green' | 'orange';
    language: 'fr' | 'en';
    accessibility: {
      reducedMotion: boolean;
      highContrast: boolean;
      fontSize: 'small' | 'medium' | 'large';
    };
  };
}

interface AppState {
  isLoading: boolean;
  error: string | null;
  lastSync: Date | null;
  connectivity: 'online' | 'offline';
}

interface NavigationState {
  currentRoute: string;
  breadcrumbs: Array<{ label: string; path: string }>;
  sidebarOpen: boolean;
}

// Store principal avec slices
interface GlobalStore {
  // User slice
  user: User | null;
  setUser: (user: User | null) => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  
  // App slice
  app: AppState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setConnectivity: (status: 'online' | 'offline') => void;
  updateLastSync: () => void;
  
  // Navigation slice
  navigation: NavigationState;
  setCurrentRoute: (route: string) => void;
  setBreadcrumbs: (breadcrumbs: Array<{ label: string; path: string }>) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Actions globales
  reset: () => void;
  hydrate: () => void;
}

const initialState = {
  user: null,
  app: {
    isLoading: false,
    error: null,
    lastSync: null,
    connectivity: 'online' as const,
  },
  navigation: {
    currentRoute: '/',
    breadcrumbs: [],
    sidebarOpen: false,
  },
};

export const useGlobalStore = create<GlobalStore>()(
  subscribeWithSelector(
    persist(
      immer((set, get) => ({
        ...initialState,
        
        // User actions
        setUser: (user) => set((state) => {
          state.user = user;
        }),
        
        updateUserPreferences: (preferences) => set((state) => {
          if (state.user) {
            state.user.preferences = { ...state.user.preferences, ...preferences };
          }
        }),
        
        // App actions
        setLoading: (loading) => set((state) => {
          state.app.isLoading = loading;
        }),
        
        setError: (error) => set((state) => {
          state.app.error = error;
        }),
        
        setConnectivity: (status) => set((state) => {
          state.app.connectivity = status;
        }),
        
        updateLastSync: () => set((state) => {
          state.app.lastSync = new Date();
        }),
        
        // Navigation actions
        setCurrentRoute: (route) => set((state) => {
          state.navigation.currentRoute = route;
        }),
        
        setBreadcrumbs: (breadcrumbs) => set((state) => {
          state.navigation.breadcrumbs = breadcrumbs;
        }),
        
        toggleSidebar: () => set((state) => {
          state.navigation.sidebarOpen = !state.navigation.sidebarOpen;
        }),
        
        setSidebarOpen: (open) => set((state) => {
          state.navigation.sidebarOpen = open;
        }),
        
        // Global actions
        reset: () => set(() => initialState),
        
        hydrate: () => {
          // Logic for hydrating from external sources if needed
          console.log('Store hydrated');
        },
      })),
      {
        name: 'neuroflow-global-store',
        partialize: (state) => ({
          user: state.user,
          navigation: {
            sidebarOpen: state.navigation.sidebarOpen,
          },
        }),
      }
    )
  )
);

// Selectors optimisés
export const useUser = () => useGlobalStore((state) => state.user);
export const useAppState = () => useGlobalStore((state) => state.app);
export const useNavigation = () => useGlobalStore((state) => state.navigation);
export const useConnectivity = () => useGlobalStore((state) => state.app.connectivity);

// Hook pour les actions optimisé pour éviter les re-renders
export const useGlobalActions = () => {
  const setUser = useGlobalStore((state) => state.setUser);
  const updateUserPreferences = useGlobalStore((state) => state.updateUserPreferences);
  const setLoading = useGlobalStore((state) => state.setLoading);
  const setError = useGlobalStore((state) => state.setError);
  const setConnectivity = useGlobalStore((state) => state.setConnectivity);
  const updateLastSync = useGlobalStore((state) => state.updateLastSync);
  const setCurrentRoute = useGlobalStore((state) => state.setCurrentRoute);
  const setBreadcrumbs = useGlobalStore((state) => state.setBreadcrumbs);
  const toggleSidebar = useGlobalStore((state) => state.toggleSidebar);
  const setSidebarOpen = useGlobalStore((state) => state.setSidebarOpen);
  const reset = useGlobalStore((state) => state.reset);

  return {
    setUser,
    updateUserPreferences,
    setLoading,
    setError,
    setConnectivity,
    updateLastSync,
    setCurrentRoute,
    setBreadcrumbs,
    toggleSidebar,
    setSidebarOpen,
    reset,
  };
};
