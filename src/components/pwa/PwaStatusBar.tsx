
import React from "react";
import { CheckCircle, WifiOff, RefreshCw } from "lucide-react";

const STATUS = {
  ONLINE: {
    label: "En ligne",
    icon: <CheckCircle className="w-3 h-3 text-emerald-600" />,
    color: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700",
  },
  OFFLINE: {
    label: "Hors ligne",
    icon: <WifiOff className="w-3 h-3 text-orange-500" />,
    color: "bg-orange-50 text-orange-900 dark:bg-orange-900/50 dark:text-orange-200 border-orange-200 dark:border-orange-700",
  },
  SYNCING: {
    label: "Synchronisation…",
    icon: <RefreshCw className="w-3 h-3 animate-spin text-sky-500" />,
    color: "bg-sky-50 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200 border-sky-100 dark:border-sky-700",
  },
};

export default function PwaStatusBar() {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const status = isOnline ? STATUS.ONLINE : STATUS.OFFLINE;

  return (
    <div className="w-full flex justify-center mb-2">
      <div
        className={`
          text-xs px-3 py-1 border rounded-full
          flex items-center justify-center gap-1.5 
          font-medium transition-all duration-200
          shadow-sm max-w-xs backdrop-blur-sm
          ${status.color}
        `}
        aria-live="polite"
        role="status"
      >
        {status.icon}
        <span>{status.label}</span>
      </div>
    </div>
  );
}
