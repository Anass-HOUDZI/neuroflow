
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface FocusManagerContextType {
  isKeyboardUser: boolean;
  focusRing: boolean;
  announceMessage: (message: string) => void;
}

const FocusManagerContext = createContext<FocusManagerContextType | null>(null);

interface FocusManagerProps {
  children: ReactNode;
}

export function FocusManager({ children }: FocusManagerProps) {
  const [isKeyboardUser, setIsKeyboardUser] = useState(false);
  const [focusRing, setFocusRing] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        setIsKeyboardUser(true);
        setFocusRing(true);
      }
    }

    function handleMouseDown() {
      setIsKeyboardUser(false);
      setFocusRing(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      // Skip to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
          main.focus();
          announceMessage('Navigation vers le contenu principal');
        }
      }
      
      // Open navigation
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const nav = document.querySelector('[role="navigation"] button');
        if (nav instanceof HTMLElement) {
          nav.click();
          announceMessage('Menu de navigation ouvert');
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  const announceMessage = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 1000);
  };

  return (
    <FocusManagerContext.Provider value={{
      isKeyboardUser,
      focusRing,
      announceMessage
    }}>
      {children}
      
      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>
      
      {/* Skip links */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Aller au contenu principal
      </a>
    </FocusManagerContext.Provider>
  );
}

export function useFocusManager() {
  const context = useContext(FocusManagerContext);
  if (!context) {
    throw new Error('useFocusManager must be used within FocusManager');
  }
  return context;
}
