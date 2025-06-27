
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ZenPadStatsProps {
  isDark: boolean;
  wordCount: number;
  charCount: number;
  charCountNoSpaces: number;
  lastSaved: Date | null;
  onExportText: (format: 'txt' | 'md') => void;
  onClearContent: () => void;
}

export const ZenPadStats: React.FC<ZenPadStatsProps> = ({
  isDark,
  wordCount,
  charCount,
  charCountNoSpaces,
  lastSaved,
  onExportText,
  onClearContent
}) => {
  return (
    <Card className={`mb-6 p-4 ${isDark ? 'bg-gray-800 border-gray-700' : ''}`}>
      <div className="flex justify-between items-center text-sm">
        <div className="flex space-x-6">
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            <strong>{wordCount}</strong> mots
          </span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            <strong>{charCount}</strong> caractères
          </span>
          <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            <strong>{charCountNoSpaces}</strong> caractères (sans espaces)
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {lastSaved && (
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Dernière sauvegarde: {lastSaved.toLocaleTimeString()}
            </span>
          )}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportText('txt')}
            >
              <Download className="h-3 w-3 mr-1" />
              TXT
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExportText('md')}
            >
              <Download className="h-3 w-3 mr-1" />
              MD
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearContent}
            >
              Nouveau
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
