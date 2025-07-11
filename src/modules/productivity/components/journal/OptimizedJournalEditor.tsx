
import React, { useCallback, useEffect, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Save, X } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useDebouncedSave } from '@/modules/productivity/hooks/useDebouncedSave'

interface OptimizedJournalEditorProps {
  entryId?: string
  onSave?: () => void
}

export const OptimizedJournalEditor: React.FC<OptimizedJournalEditorProps> = ({
  entryId,
  onSave
}) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState<number>(5)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  
  const { journalEntries, addJournalEntry, updateJournalEntry } = useProductivityStore()
  
  // Load entry if editing
  useEffect(() => {
    if (entryId) {
      const entry = journalEntries.find(e => e.id === entryId)
      if (entry) {
        setTitle(entry.title)
        setContent(entry.content)
        setMood(entry.mood)
        setTags(entry.tags || [])
      }
    }
  }, [entryId, journalEntries])

  const handleSave = useCallback(() => {
    const entryData = {
      title: title || 'Untitled Entry',
      content,
      mood,
      tags,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (entryId) {
      updateJournalEntry(entryId, entryData)
    } else {
      addJournalEntry(entryData)
    }
    
    onSave?.()
  }, [title, content, mood, tags, entryId, addJournalEntry, updateJournalEntry, onSave])

  // Debounced auto-save
  const debouncedSave = useDebouncedSave(handleSave, 2000)

  // Trigger debounced save when content changes
  useEffect(() => {
    if (title || content) {
      debouncedSave(handleSave)
    }
  }, [title, content, mood, tags, debouncedSave, handleSave])

  const handleManualSave = () => {
    handleSave()
  }

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Journal Entry</CardTitle>
        <Button onClick={handleManualSave} size="sm" className="gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <Input
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-medium"
        />

        {/* Mood Slider */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Mood (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-muted-foreground">
            Current mood: {mood}/10
          </div>
        </div>

        {/* Content */}
        <Textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] resize-none"
          rows={12}
        />

        {/* Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeTag(tag)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={addTag} size="sm" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Word Count */}
        <div className="text-right text-sm text-muted-foreground">
          {content.split(/\s+/).filter(word => word.length > 0).length} words
        </div>
      </CardContent>
    </Card>
  )
}
