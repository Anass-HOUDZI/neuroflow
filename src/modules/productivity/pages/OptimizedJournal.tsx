
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Plus, BookOpen, TrendingUp, Calendar, Target } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProductivityStore } from '@/core/stores/productivityStore'
import { OptimizedJournalEditor } from '../components/journal/OptimizedJournalEditor'
import { OptimizedJournalList } from '../components/journal/OptimizedJournalList'

export const OptimizedJournal: React.FC = () => {
  const [showEditor, setShowEditor] = useState(false)
  const [editingEntryId, setEditingEntryId] = useState<string | undefined>()
  const { getStats } = useProductivityStore()
  
  const stats = getStats()
  
  const handleNewEntry = () => {
    setEditingEntryId(undefined)
    setShowEditor(true)
  }
  
  const handleEditEntry = (entryId: string) => {
    setEditingEntryId(entryId)
    setShowEditor(true)
  }
  
  const handleCloseEditor = () => {
    setShowEditor(false)
    setEditingEntryId(undefined)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Journal Optimisé
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Capturez vos pensées et réflexions
              </p>
            </div>
          </div>
          <Button onClick={handleNewEntry} className="gap-2">
            <Plus className="h-4 w-4" />
            Nouvelle Entrée
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Entrées</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.journal.totalEntries}</div>
              <p className="text-xs text-muted-foreground">
                Vos réflexions écrites
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mots Écrits</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.journal.wordsWritten.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Mots au total
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Série</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.journal.streak}</div>
              <p className="text-xs text-muted-foreground">
                Entrées ce mois
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Moyenne</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.journal.avgWordsPerEntry}</div>
              <p className="text-xs text-muted-foreground">
                Mots par entrée
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Journal List */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Vos Entrées</CardTitle>
          </CardHeader>
          <CardContent>
            <OptimizedJournalList onEditEntry={handleEditEntry} />
          </CardContent>
        </Card>
        
        {/* Editor Modal */}
        {showEditor && (
          <OptimizedJournalEditor
            entryId={editingEntryId}
            onClose={handleCloseEditor}
          />
        )}
      </div>
    </div>
  )
}

export default OptimizedJournal
