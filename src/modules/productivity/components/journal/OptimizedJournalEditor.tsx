
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Save, X, Hash } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useDebouncedSave } from '../../hooks/useDebouncedSave'

interface OptimizedJournalEditorProps {
  entryId?: string
  onClose: () => void
}

export const OptimizedJournalEditor: React.FC<OptimizedJournalEditorProps> = ({
  entryId,
  onClose
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [mood, setMood] = useState<number>()
  
  const { journalEntries, addJournalEntry, updateJournalEntry } = useProductivityStore()
  
  // Load existing entry if editing
  useEffect(() => {
    if (entryId) {
      const entry = journalEntries.find(e => e.id === entryId)
      if (entry) {
        setTitle(entry.title)
        setContent(entry.content)
        setTags(entry.tags)
        setMood(entry.mood)
      }
    }
  }, [entryId, journalEntries])
  
  // Auto-focus textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])
  
  // Debounced save function
  const saveEntry = useCallback(() => {
    if (!title.trim() || !content.trim()) return
    
    const entryData = {
      title: title.trim(),
      content: content.trim(),
      tags,
      mood,
      date: new Date().toISOString().split('T')[0]
    }
    
    if (entryId) {
      updateJournalEntry(entryId, entryData)
    } else {
      addJournalEntry(entryData)
    }
  }, [title, content, tags, mood, entryId, addJournalEntry, updateJournalEntry])
  
  const { debouncedSave, saveImmediately } = useDebouncedSave(saveEntry, 2000)
  
  // Auto-save on content change
  useEffect(() => {
    if (title.trim() && content.trim()) {
      debouncedSave()
    }
  }, [title, content, tags, mood, debouncedSave])
  
  const handleSave = () => {
    saveImmediately()
    onClose()
  }
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }
  
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const charCount = content.length
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">
            {entryId ? 'Modifier l\'entrée' : 'Nouvelle entrée'}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {wordCount} mots • {charCount} caractères
            </span>
            <Button onClick={handleSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6 max-h-[calc(90vh-8rem)] overflow-y-auto">
          {/* Title */}
          <Input
            placeholder="Titre de votre entrée..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-medium"
          />
          
          {/* Mood Selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Humeur :</span>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setMood(mood === num ? undefined : num)}
                className={`w-8 h-8 rounded-full border-2 transition-colors ${
                  mood === num 
                    ? 'border-primary bg-primary/10' 
                    : 'border-muted hover:border-primary/50'
                }`}
              >
                {num === 1 ? '😢' : num === 2 ? '😕' : num === 3 ? '😐' : num === 4 ? '😊' : '😄'}
              </button>
            ))}
          </div>
          
          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              <Input
                placeholder="Ajouter un tag..."
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                className="flex-1"
              />
              <Button onClick={handleAddTag} size="sm" variant="outline">
                Ajouter
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    {tag} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Content Editor */}
          <textarea
            ref={textareaRef}
            placeholder="Commencez à écrire vos pensées..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 resize-none border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            style={{ fontFamily: 'Georgia, serif', lineHeight: '1.6' }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
