
import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, BookOpen, Calendar, Hash, Edit, Trash2 } from 'lucide-react'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { useVirtualScrolling } from '../../hooks/useVirtualScrolling'

interface OptimizedJournalListProps {
  onEditEntry: (entryId: string) => void
}

export const OptimizedJournalList: React.FC<OptimizedJournalListProps> = ({
  onEditEntry
}) => {
  const { journalEntries, deleteJournalEntry } = useProductivityStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  
  // Filter entries based on search and tag
  const filteredEntries = useMemo(() => {
    return journalEntries.filter(entry => {
      const matchesSearch = searchTerm === '' || 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesTag = selectedTag === null || entry.tags.includes(selectedTag)
      
      return matchesSearch && matchesTag
    })
  }, [journalEntries, searchTerm, selectedTag])
  
  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    journalEntries.forEach(entry => {
      entry.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [journalEntries])
  
  // Virtual scrolling for large lists
  const containerHeight = 600
  const itemHeight = 120
  
  const {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll
  } = useVirtualScrolling(filteredEntries, {
    itemHeight,
    containerHeight,
    overscan: 5
  })
  
  const handleDeleteEntry = (entryId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      deleteJournalEntry(entryId)
    }
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const getMoodEmoji = (mood?: number) => {
    if (!mood) return null
    const emojis = ['😢', '😕', '😐', '😊', '😄']
    return emojis[mood - 1]
  }
  
  if (journalEntries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Aucune entrée pour le moment</h3>
          <p className="text-muted-foreground mb-4">
            Commencez à écrire votre premier journal
          </p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher dans vos entrées..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setSelectedTag(null)}
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
            >
              Tous
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
              >
                <Hash className="h-3 w-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        )}
      </div>
      
      {filteredEntries.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-8">
            <p className="text-muted-foreground">
              Aucune entrée trouvée pour votre recherche
            </p>
          </CardContent>
        </Card>
      ) : (
        /* Virtual Scrolled List */
        <div
          className="relative border rounded-lg"
          style={{ height: Math.min(containerHeight, filteredEntries.length * itemHeight) }}
          onScroll={handleScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <div style={{ transform: `translateY(${offsetY}px)` }}>
              {visibleItems.map(({ item: entry, index }) => (
                <Card
                  key={entry.id}
                  className="mb-3 cursor-pointer hover:shadow-md transition-shadow"
                  style={{
                    position: 'absolute',
                    top: index * itemHeight,
                    width: '100%',
                    height: itemHeight - 12 // Account for margin
                  }}
                  onClick={() => onEditEntry(entry.id)}
                >
                  <CardContent className="p-4 h-full flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg truncate flex-1 mr-2">
                          {entry.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {entry.mood && (
                            <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                          )}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditEntry(entry.id)
                            }}
                            variant="ghost"
                            size="sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={(e) => handleDeleteEntry(entry.id, e)}
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {entry.content}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(entry.date)}
                        </div>
                        <span>{entry.wordCount} mots</span>
                        <span>{entry.readingTime} min de lecture</span>
                      </div>
                      
                      {entry.tags.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {entry.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {entry.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{entry.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
