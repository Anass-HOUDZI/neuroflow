
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Maximize, Minimize, Eye, EyeOff } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useDebouncedSave } from '../../hooks/useDebouncedSave'

interface OptimizedZenEditorProps {
  documentId?: string
  isDark: boolean
  isFullscreen: boolean
  showStats: boolean
  onToggleFullscreen: () => void
  onToggleStats: () => void
}

export const OptimizedZenEditor: React.FC<OptimizedZenEditorProps> = ({
  documentId,
  isDark,
  isFullscreen,
  showStats,
  onToggleFullscreen,
  onToggleStats
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState('Document sans titre')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  
  const { zenDocuments, addZenDocument, updateZenDocument, setCurrentDocument } = useProductivityStore()
  
  // Load document if editing
  useEffect(() => {
    if (documentId) {
      const doc = zenDocuments.find(d => d.id === documentId)
      if (doc) {
        setTitle(doc.title)
        setContent(doc.content)
        setTags(doc.tags)
      }
    }
  }, [documentId, zenDocuments])
  
  // Auto-focus
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])
  
  // Save function
  const saveDocument = useCallback(() => {
    if (!content.trim()) return
    
    const docData = {
      title: title.trim() || 'Document sans titre',
      content: content.trim(),
      tags
    }
    
    if (documentId) {
      updateZenDocument(documentId, docData)
    } else {
      const newDoc = addZenDocument(docData)
      // Set as current document for future saves
    }
  }, [title, content, tags, documentId, addZenDocument, updateZenDocument])
  
  const { debouncedSave } = useDebouncedSave(saveDocument, 1500)
  
  // Auto-save on content change
  useEffect(() => {
    if (content.trim()) {
      debouncedSave()
    }
  }, [content, title, debouncedSave])
  
  // Calculate stats
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length
  const charCountNoSpaces = content.replace(/\s/g, '').length
  const readingTime = Math.ceil(wordCount / 200)
  
  const exportDocument = (format: 'txt' | 'md') => {
    const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }
  
  if (isFullscreen) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 opacity-20 hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFullscreen}
            className="text-current"
          >
            <Minimize className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleStats}
            className="text-current"
          >
            {showStats ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          {showStats && (
            <div className="text-xs space-x-4">
              <span>{wordCount} mots</span>
              <span>{charCount} caractères</span>
              <span>{readingTime} min</span>
            </div>
          )}
        </div>

        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Laissez vos pensées s'écouler..."
          className={`w-full h-screen resize-none border-none outline-none p-16 text-lg leading-relaxed font-serif ${
            isDark ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
          }`}
          style={{ fontFamily: 'Georgia, serif' }}
        />
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`w-full text-2xl font-bold bg-transparent border-none outline-none ${
          isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
        }`}
        placeholder="Titre de votre document..."
      />
      
      {/* Stats Bar */}
      {showStats && (
        <div className="flex items-center justify-between text-sm text-muted-foreground py-2 border-b">
          <div className="flex items-center space-x-6">
            <span>{wordCount} mots</span>
            <span>{charCount} caractères</span>
            <span>{charCountNoSpaces} sans espaces</span>
            <span>{readingTime} min de lecture</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => exportDocument('txt')}
              variant="ghost"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              TXT
            </Button>
            <Button
              onClick={() => exportDocument('md')}
              variant="ghost"
              size="sm"
            >
              <Download className="h-4 w-4 mr-1" />
              MD
            </Button>
          </div>
        </div>
      )}
      
      {/* Editor */}
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
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={onToggleFullscreen}
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Maximize className="h-4 w-4 mr-2" />
          Mode Focus
        </Button>
        <Button
          variant="outline"
          onClick={() => exportDocument('txt')}
          size="lg"
        >
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>
    </div>
  )
}
