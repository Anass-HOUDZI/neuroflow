
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, Eye, EyeOff, Moon, Sun, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

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
        {/* Minimal header for fullscreen */}
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

        {/* Fullscreen textarea */}
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
        {/* Header */}
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

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowStats(!showStats)}
            >
              {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(true)}
            >
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        {showStats && (
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
                    onClick={() => exportText('txt')}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    TXT
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportText('md')}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    MD
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearContent}
                  >
                    Nouveau
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Main Editor */}
        <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm'}`}>
          <div className="p-8">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

        {/* Quick Actions */}
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
