
import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

interface UseKeyboardShortcutsOptions {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
}

export function useKeyboardShortcuts({ shortcuts, enabled = true }: UseKeyboardShortcutsOptions) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      const matchingShortcut = shortcuts.find(shortcut => {
        return (
          e.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!e.ctrlKey === !!shortcut.ctrlKey &&
          !!e.altKey === !!shortcut.altKey &&
          !!e.shiftKey === !!shortcut.shiftKey
        );
      });

      if (matchingShortcut) {
        e.preventDefault();
        matchingShortcut.action();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);

  return shortcuts;
}

// Raccourcis globaux prédéfinis
export const globalShortcuts: KeyboardShortcut[] = [
  {
    key: '/',
    action: () => {
      const searchInput = document.querySelector('[data-search-input]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    },
    description: 'Ouvrir la recherche'
  },
  {
    key: 'Escape',
    action: () => {
      // Fermer les modales ouvertes
      const closeButton = document.querySelector('[data-modal-close]') as HTMLButtonElement;
      if (closeButton) {
        closeButton.click();
      }
    },
    description: 'Fermer la modale'
  },
  {
    key: 'h',
    altKey: true,
    action: () => {
      window.location.href = '/';
    },
    description: 'Aller à l\'accueil'
  },
  {
    key: 'k',
    ctrlKey: true,
    action: () => {
      // Ouvrir palette de commandes (à implémenter)
      console.log('Command palette');
    },
    description: 'Ouvrir la palette de commandes'
  }
];
