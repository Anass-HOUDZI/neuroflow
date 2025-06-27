
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff, Moon, Sun, FileText } from 'lucide-react';

interface ZenPadHeaderProps {
  isDark: boolean;
  showStats: boolean;
  onToggleStats: () => void;
  onToggleTheme: () => void;
  onToggleFullscreen: () => void;
}

export const ZenPadHeader: React.FC<ZenPadHeaderProps> = ({
  isDark,
  showStats,
  onToggleStats,
  onToggleTheme,
  onToggleFullscreen
}) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Link to="/">
          <Button variant="ghost" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
            ZenPad
          </h1>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Écriture sans distraction
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleStats}
        >
          {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleTheme}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleFullscreen}
        >
          <FileText className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
