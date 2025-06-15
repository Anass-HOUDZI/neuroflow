
import React from "react";
import { CheckCircle, WifiOff, RefreshCw } from "lucide-react";

const STATUS = {
  ONLINE: {
    label: "En ligne : toutes fonctionnalités disponibles",
    icon: <CheckCircle className="w-4 h-4 text-emerald-600 mr-1.5" />,
    color: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700",
  },
  OFFLINE: {
    label: "Hors ligne : fonctionnalités limitées",
    icon: <WifiOff className="w-4 h-4 text-orange-500 mr-1.5" />,
    color: "bg-orange-50 text-orange-900 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-700",
  },
  SYNCING: {
    label: "Synchronisation des données…",
    icon: <RefreshCw className="w-4 h-4 animate-spin text-sky-500 mr-1.5" />,
    color: "bg-sky-50 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200 border-sky-100 dark:border-sky-700",
  },
};

export default function PwaStatusBar() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  // Pour la démo, on ne gère pas la SYNC, mais c'est prévu pour extension future (queue etc)
  // const [isSyncing, setIsSyncing] = React.useState(false);

  React.useEffect(() => {
    const handle = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", handle);
    window.addEventListener("offline", handle);
    return () => {
      window.removeEventListener("online", handle);
      window.removeEventListener("offline", handle);
    };
  }, []);

  // Gestion d'état simple Online/Offline
  const status = isOnline ? STATUS.ONLINE : STATUS.OFFLINE;

  return (
    <div
      className={`w-full text-xs px-3 py-1.5 border rounded-md mx-auto mb-2 flex items-center justify-center gap-1 font-medium transition
        shadow-sm max-w-sm
        ${status.color}
      `}
      aria-live="polite"
      tabIndex={-1}
      style={{
        // Pas de sticky ni fixed : reste dans le flux
        zIndex: 2,
      }}
    >
      {status.icon}
      <span>{status.label}</span>
    </div>
  );
}
