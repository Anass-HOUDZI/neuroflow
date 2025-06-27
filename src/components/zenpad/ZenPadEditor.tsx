
import React from 'react';
import { Card } from '@/components/ui/card';

interface ZenPadEditorProps {
  isDark: boolean;
  content: string;
  onContentChange: (content: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const ZenPadEditor: React.FC<ZenPadEditorProps> = ({
  isDark,
  content,
  onContentChange,
  textareaRef
}) => {
  return (
    <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="p-8">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Commencez à écrire votre histoire..."
          className={`w-full h-96 resize-none border-none outline-none text-lg leading-relaxed font-serif ${
            isDark 
              ? 'bg-transparent text-white placeholder-gray-500' 
              : 'bg-transparent text-gray-900 placeholder-gray-400'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>
    </Card>
  );
};
