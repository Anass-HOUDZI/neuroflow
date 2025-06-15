
import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

function ReloadPrompt() {
  const { toast } = useToast();

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error:', error);
    },
  });

  React.useEffect(() => {
    if (offlineReady) {
      toast({
        title: 'Application prête hors-ligne',
        description: "Vous pouvez maintenant utiliser l'application sans connexion internet.",
      });
      setOfflineReady(false); // Only show once
    }
  }, [offlineReady, setOfflineReady, toast]);

  React.useEffect(() => {
    if (needRefresh) {
      toast({
        title: 'Mise à jour disponible',
        description: "Une nouvelle version de l'application est disponible. Cliquez pour recharger.",
        action: (
          <Button onClick={() => updateServiceWorker(true)}>
            Recharger
          </Button>
        ),
        duration: Infinity, // Keep it open until user interaction
      });
    }
  }, [needRefresh, updateServiceWorker, toast]);
  
  return null; // The toast component will handle the UI
}

export default ReloadPrompt;
