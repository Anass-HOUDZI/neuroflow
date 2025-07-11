
import React, { useCallback, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { X, Plus } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useDebouncedSave } from '@/modules/productivity/hooks/useDebouncedSave'

interface OptimizedZenEditorProps {
  documentId?: string
  className?: string
}

export const OptimizedZenEditor: React.FC<OptimizedZenEditorProps> = ({
  documentId,
  className = ''
}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  
  const { zenDocuments, addZenDocument, updateZenDocument } = useProductivityStore()
  
  // Load document if editing
  useEffect(() => {
    if (documentId) {
      const doc = zenDocuments.find(d => d.id === documentId)
      if (doc) {
        setTitle(doc.title)
        setContent(doc.content)
        setTags(doc.tags || [])
      }
    }
  }, [documentId, zenDocuments])

  const handleSave = useCallback(() => {
    const docData = {
      title: title || 'Untitled Document',
      content,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (documentId) {
      updateZenDocument(documentId, docData)
    } else {
      addZenDocument(docData)
    }
  }, [title, content, tags, documentId, addZenDocument, updateZenDocument])

  // Debounced auto-save
  const debouncedSave = useDebouncedSave(handleSave, 2000)

  // Trigger debounced save when content changes
  useEffect(() => {
    if (title || content) {
      debouncedSave(handleSave)
    }
  }, [title, content, tags, debouncedSave, handleSave])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addTag()
    }
  }

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length

  return (
    <div className={`w-full max-w-4xl mx-auto space-y-4 ${className}`}>
      {/* Minimal Header */}
      <div className="space-y-2">
        <Input
          placeholder="Document title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-none bg-transparent text-2xl font-light placeholder:text-muted-foreground/50 px-0"
        />
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="gap-1 text-xs">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        <Textarea
          placeholder="Begin writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[500px] border-none bg-transparent resize-none text-lg leading-relaxed placeholder:text-muted-foreground/50 px-0 focus-visible:ring-0"
          rows={20}
        />
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
        <div className="flex gap-4 items-center">
          <span>{wordCount} words</span>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="h-8 text-xs w-24"
            />
            <Button onClick={addTag} size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="text-xs">
          Auto-saving...
        </div>
      </div>
    </div>
  )
}
