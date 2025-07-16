
import GlobalLayout from "@/components/layout/GlobalLayout";
import { PageLayout, PageHeader } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TextCursor, Save, Download, Eye, EyeOff, Moon, Sun, Type, Palette } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ZenPad() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("Document sans titre");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showStats, setShowStats] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState("serif");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [documents, setDocuments] = useState<Array<{id: string, title: string, content: string, lastModified: string}>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const savedDocs = localStorage.getItem('zenpad-documents');
    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    }
  }, []);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(content.length);
  }, [content]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoSave();
    }, 3000);
    return () => clearInterval(interval);
  }, [content, title]);

  const autoSave = () => {
    if (content.trim() || title !== "Document sans titre") {
      const docId = `doc-${Date.now()}`;
      const newDoc = {
        id: docId,
        title,
        content,
        lastModified: new Date().toLocaleString('fr-FR')
      };
      
      const updatedDocs = [newDoc, ...documents.slice(0, 9)];
      setDocuments(updatedDocs);
      localStorage.setItem('zenpad-documents', JSON.stringify(updatedDocs));
    }
  };

  const exportDocument = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadDocument = (doc: any) => {
    setTitle(doc.title);
    setContent(doc.content);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const fontOptions = [
    { label: "Serif", value: "serif" },
    { label: "Sans-serif", value: "sans-serif" },
    { label: "Mono", value: "monospace" }
  ];

  if (isFullscreen) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold bg-transparent border-none focus:outline-none"
              style={{ fontSize: `${fontSize + 2}px` }}
            />
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setShowStats(!showStats)}>
                {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={toggleFullscreen}>
                Quitter
              </Button>
            </div>
          </div>
          
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Commencez à écrire..."
            className="w-full h-[calc(100vh-120px)] bg-transparent border-none focus:outline-none resize-none"
            style={{
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
              lineHeight: 1.6
            }}
          />
          
          {showStats && (
            <div className="fixed bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-2 text-sm">
              {wordCount} mots • {charCount} caractères
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <GlobalLayout>
      <PageLayout className="bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
        <PageHeader
          title="ZenPad"
          description="L'éditeur de texte zen ultime pour une concentration maximale"
          icon={<TextCursor className="h-12 w-12 text-blue-500" />}
          actions={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={exportDocument}>
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
              <Button size="sm" onClick={toggleFullscreen}>
                <Eye className="h-4 w-4 mr-2" />
                Mode Focus
              </Button>
            </div>
          }
        />

        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid lg:grid-cols-4 gap-6">
            
            {/* Paramètres */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Paramètres</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs font-medium">Titre du document</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium">Taille de police</label>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="range"
                      min="12"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs">{fontSize}px</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium">Police</label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full mt-1 text-xs border rounded px-2 py-1"
                  >
                    {fontOptions.map(font => (
                      <option key={font.value} value={font.value}>{font.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs">Statistiques</span>
                  <Button size="sm" variant="ghost" onClick={() => setShowStats(!showStats)}>
                    {showStats ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Éditeur principal */}
            <div className="lg:col-span-2">
              <Card className="h-[600px]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{title}</div>
                    {showStats && (
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <Badge variant="outline">{wordCount} mots</Badge>
                        <Badge variant="outline">{charCount} caractères</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="h-full">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Commencez à écrire votre chef-d'œuvre..."
                    className="w-full h-[500px] border-none focus:outline-none resize-none bg-transparent"
                    style={{
                      fontSize: `${fontSize}px`,
                      fontFamily: fontFamily,
                      lineHeight: 1.6
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Documents récents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Documents récents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {documents.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Aucun document sauvegardé</p>
                  ) : (
                    documents.slice(0, 5).map((doc) => (
                      <div
                        key={doc.id}
                        className="p-2 border rounded text-xs hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => loadDocument(doc)}
                      >
                        <div className="font-medium truncate">{doc.title}</div>
                        <div className="text-muted-foreground">{doc.lastModified}</div>
                        <div className="text-muted-foreground">
                          {doc.content.slice(0, 50)}...
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conseils d'utilisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Conseils ZenPad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="flex items-start gap-2">
                  <Type className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Mode Focus</div>
                    <div className="text-muted-foreground">Utilisez le mode plein écran pour une concentration maximale</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Save className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Sauvegarde auto</div>
                    <div className="text-muted-foreground">Vos documents sont sauvegardés automatiquement toutes les 3 secondes</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Palette className="h-4 w-4 text-purple-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Personnalisation</div>
                    <div className="text-muted-foreground">Ajustez la police et la taille pour votre confort</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </GlobalLayout>
  );
}
