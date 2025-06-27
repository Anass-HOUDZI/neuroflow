import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ZenPadHeader } from "@/components/zenpad/ZenPadHeader";
import { ZenPadStats } from "@/components/zenpad/ZenPadStats";
import { ZenPadEditor } from "@/components/zenpad/ZenPadEditor";

const ZenPad = () => {
  const [content, setContent] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Auto-save every 3 seconds
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (content.trim()) {
        localStorage.setItem('zenpad-content', content);
        localStorage.setItem('zenpad-timestamp', new Date().toISOString());
        setLastSaved(new Date());
      }
    }, 3000);

    return () => clearInterval(saveInterval);
  }, [content]);

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('zenpad-content');
    const savedTimestamp = localStorage.getItem('zenpad-timestamp');
    
    if (savedContent) {
      setContent(savedContent);
      if (savedTimestamp) {
        setLastSaved(new Date(savedTimestamp));
      }
    }
  }, []);

  // Auto-focus textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Calculate stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const charCountNoSpaces = content.replace(/\s/g, '').length;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const exportText = (format: 'txt' | 'md') => {
    const filename = `zenpad-${new Date().toISOString().split('T')[0]}.${format}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Document exporté",
      description: `Votre texte a été sauvegardé en ${format.toUpperCase()}`,
    });
  };

  const clearContent = () => {
    setContent("");
    localStorage.removeItem('zenpad-content');
    localStorage.removeItem('zenpad-timestamp');
    setLastSaved(null);
    toast({
      title: "Document effacé",
      description: "Nouveau document créé",
    });
  };

  if (isFullscreen) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 opacity-20 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(false)}
            className="text-current"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {showStats && (
            <div className="text-xs space-x-4">
              <span>{wordCount} mots</span>
              <span>{charCount} caractères</span>
            </div>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Commencez à écrire..."
          className={`w-full h-screen resize-none border-none outline-none p-16 text-lg leading-relaxed font-serif ${
            isDark ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <ZenPadHeader
          isDark={isDark}
          showStats={showStats}
          onToggleStats={() => setShowStats(!showStats)}
          onToggleTheme={toggleTheme}
          onToggleFullscreen={() => setIsFullscreen(true)}
        />

        {showStats && (
          <ZenPadStats
            isDark={isDark}
            wordCount={wordCount}
            charCount={charCount}
            charCountNoSpaces={charCountNoSpaces}
            lastSaved={lastSaved}
            onExportText={exportText}
            onClearContent={clearContent}
          />
        )}

        <ZenPadEditor
          isDark={isDark}
          content={content}
          onContentChange={setContent}
          textareaRef={textareaRef}
        />

        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => setIsFullscreen(true)}
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Mode Focus
            </Button>
            <Button
              variant="outline"
              onClick={() => exportText('txt')}
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZenPad;
