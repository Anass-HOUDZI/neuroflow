
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface JournalEntry {
  id: string
  date: string
  title: string
  content: string
  mood?: number
  tags: string[]
  wordCount: number
  readingTime: number
}

interface Habit {
  id: string
  name: string
  description?: string
  type: 'positive' | 'negative'
  scoringType: 'binary' | 'scale' | 'duration'
  color: string
  isActive: boolean
  createdAt: string
}

interface HabitEntry {
  habitId: string
  date: string
  value: number
  completed: boolean
  note?: string
}

interface Goal {
  id: string
  title: string
  description: string
  category: string
  priority: 'low' | 'medium' | 'high'
  status: 'not-started' | 'in-progress' | 'completed' | 'paused'
  progress: number
  targetDate?: string
  createdAt: string
  updatedAt: string
}

interface ZenDocument {
  id: string
  title: string
  content: string
  wordCount: number
  characterCount: number
  createdAt: string
  updatedAt: string
  tags: string[]
}

interface KanbanBoard {
  id: string
  title: string
  description?: string
  columns: KanbanColumn[]
  createdAt: string
  updatedAt: string
}

interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
  order: number
}

interface KanbanCard {
  id: string
  title: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  dueDate?: string
  tags: string[]
  order: number
}

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startDate: string
  endDate?: string
  allDay: boolean
  type: 'journal' | 'habit' | 'goal' | 'board' | 'custom'
  linkedId?: string
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    endDate?: string
  }
}

interface ProductivityStats {
  journal: {
    totalEntries: number
    wordsWritten: number
    streak: number
    avgWordsPerEntry: number
  }
  habits: {
    totalHabits: number
    activeHabits: number
    completionRate: number
    longestStreak: number
  }
  goals: {
    totalGoals: number
    completedGoals: number
    inProgressGoals: number
    avgCompletionTime: number
  }
  productivity: {
    focusTime: number
    documentsCreated: number
    boardsCreated: number
    tasksCompleted: number
  }
}

interface ProductivityState {
  // Journal
  journalEntries: JournalEntry[]
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'wordCount' | 'readingTime'>) => void
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void
  deleteJournalEntry: (id: string) => void
  
  // Habits
  habits: Habit[]
  habitEntries: HabitEntry[]
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt'>) => void
  updateHabit: (id: string, habit: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  addHabitEntry: (entry: HabitEntry) => void
  updateHabitEntry: (habitId: string, date: string, entry: Partial<HabitEntry>) => void
  
  // Goals
  goals: Goal[]
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateGoal: (id: string, goal: Partial<Goal>) => void
  deleteGoal: (id: string) => void
  
  // ZenPad
  zenDocuments: ZenDocument[]
  currentDocument: string | null
  addZenDocument: (doc: Omit<ZenDocument, 'id' | 'createdAt' | 'updatedAt' | 'wordCount' | 'characterCount'>) => void
  updateZenDocument: (id: string, doc: Partial<ZenDocument>) => void
  deleteZenDocument: (id: string) => void
  setCurrentDocument: (id: string | null) => void
  
  // LocalBoard
  boards: KanbanBoard[]
  currentBoard: string | null
  addBoard: (board: Omit<KanbanBoard, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBoard: (id: string, board: Partial<KanbanBoard>) => void
  deleteBoard: (id: string) => void
  setCurrentBoard: (id: string | null) => void
  addCard: (boardId: string, columnId: string, card: Omit<KanbanCard, 'id' | 'order'>) => void
  updateCard: (boardId: string, columnId: string, cardId: string, card: Partial<KanbanCard>) => void
  moveCard: (boardId: string, cardId: string, sourceColumnId: string, targetColumnId: string, targetIndex: number) => void
  
  // Calendar
  events: CalendarEvent[]
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void
  updateEvent: (id: string, event: Partial<CalendarEvent>) => void
  deleteEvent: (id: string) => void
  
  // Analytics & Stats
  getStats: () => ProductivityStats
  
  // Shared
  clearData: () => void
}

const calculateWordCount = (text: string): number => {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

const calculateReadingTime = (wordCount: number): number => {
  return Math.ceil(wordCount / 200) // 200 words per minute average
}

export const useProductivityStore = create<ProductivityState>()(
  persist(
    (set, get) => ({
      // Initial state
      journalEntries: [],
      habits: [],
      habitEntries: [],
      goals: [],
      zenDocuments: [],
      currentDocument: null,
      boards: [],
      currentBoard: null,
      events: [],
      
      // Journal actions
      addJournalEntry: (entry) => set((state) => {
        const wordCount = calculateWordCount(entry.content)
        const readingTime = calculateReadingTime(wordCount)
        
        return {
          journalEntries: [{
            ...entry,
            id: crypto.randomUUID(),
            wordCount,
            readingTime
          }, ...state.journalEntries]
        }
      }),
      
      updateJournalEntry: (id, entry) => set((state) => ({
        journalEntries: state.journalEntries.map(j => {
          if (j.id === id) {
            const updatedEntry = { ...j, ...entry }
            if (entry.content) {
              updatedEntry.wordCount = calculateWordCount(entry.content)
              updatedEntry.readingTime = calculateReadingTime(updatedEntry.wordCount)
            }
            return updatedEntry
          }
          return j
        })
      })),
      
      deleteJournalEntry: (id) => set((state) => ({
        journalEntries: state.journalEntries.filter(j => j.id !== id)
      })),
      
      // Habits actions
      addHabit: (habit) => set((state) => ({
        habits: [{
          ...habit,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString()
        }, ...state.habits]
      })),
      
      updateHabit: (id, habit) => set((state) => ({
        habits: state.habits.map(h => 
          h.id === id ? { ...h, ...habit } : h
        )
      })),
      
      deleteHabit: (id) => set((state) => ({
        habits: state.habits.filter(h => h.id !== id),
        habitEntries: state.habitEntries.filter(e => e.habitId !== id)
      })),
      
      addHabitEntry: (entry) => set((state) => {
        const existingIndex = state.habitEntries.findIndex(
          e => e.habitId === entry.habitId && e.date === entry.date
        )
        
        if (existingIndex >= 0) {
          const newEntries = [...state.habitEntries]
          newEntries[existingIndex] = entry
          return { habitEntries: newEntries }
        }
        
        return { habitEntries: [entry, ...state.habitEntries] }
      }),
      
      updateHabitEntry: (habitId, date, entry) => set((state) => ({
        habitEntries: state.habitEntries.map(e =>
          e.habitId === habitId && e.date === date ? { ...e, ...entry } : e
        )
      })),
      
      // Goals actions
      addGoal: (goal) => set((state) => ({
        goals: [{
          ...goal,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, ...state.goals]
      })),
      
      updateGoal: (id, goal) => set((state) => ({
        goals: state.goals.map(g => 
          g.id === id ? { ...g, ...goal, updatedAt: new Date().toISOString() } : g
        )
      })),
      
      deleteGoal: (id) => set((state) => ({
        goals: state.goals.filter(g => g.id !== id)
      })),
      
      // ZenPad actions
      addZenDocument: (doc) => set((state) => {
        const wordCount = calculateWordCount(doc.content)
        const characterCount = doc.content.length
        
        return {
          zenDocuments: [{
            ...doc,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            wordCount,
            characterCount
          }, ...state.zenDocuments]
        }
      }),
      
      updateZenDocument: (id, doc) => set((state) => ({
        zenDocuments: state.zenDocuments.map(d => {
          if (d.id === id) {
            const updatedDoc = { ...d, ...doc, updatedAt: new Date().toISOString() }
            if (doc.content) {
              updatedDoc.wordCount = calculateWordCount(doc.content)
              updatedDoc.characterCount = doc.content.length
            }
            return updatedDoc
          }
          return d
        })
      })),
      
      deleteZenDocument: (id) => set((state) => ({
        zenDocuments: state.zenDocuments.filter(d => d.id !== id),
        currentDocument: state.currentDocument === id ? null : state.currentDocument
      })),
      
      setCurrentDocument: (id) => set({ currentDocument: id }),
      
      // LocalBoard actions
      addBoard: (board) => set((state) => ({
        boards: [{
          ...board,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }, ...state.boards]
      })),
      
      updateBoard: (id, board) => set((state) => ({
        boards: state.boards.map(b => 
          b.id === id ? { ...b, ...board, updatedAt: new Date().toISOString() } : b
        )
      })),
      
      deleteBoard: (id) => set((state) => ({
        boards: state.boards.filter(b => b.id !== id),
        currentBoard: state.currentBoard === id ? null : state.currentBoard
      })),
      
      setCurrentBoard: (id) => set({ currentBoard: id }),
      
      addCard: (boardId, columnId, card) => set((state) => ({
        boards: state.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === columnId) {
                  return {
                    ...column,
                    cards: [...column.cards, {
                      ...card,
                      id: crypto.randomUUID(),
                      order: column.cards.length
                    }]
                  }
                }
                return column
              }),
              updatedAt: new Date().toISOString()
            }
          }
          return board
        })
      })),
      
      updateCard: (boardId, columnId, cardId, card) => set((state) => ({
        boards: state.boards.map(board => {
          if (board.id === boardId) {
            return {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === columnId) {
                  return {
                    ...column,
                    cards: column.cards.map(c => 
                      c.id === cardId ? { ...c, ...card } : c
                    )
                  }
                }
                return column
              }),
              updatedAt: new Date().toISOString()
            }
          }
          return board
        })
      })),
      
      moveCard: (boardId, cardId, sourceColumnId, targetColumnId, targetIndex) => set((state) => ({
        boards: state.boards.map(board => {
          if (board.id !== boardId) return board
          
          let cardToMove: KanbanCard | null = null
          
          // Remove card from source column
          const updatedColumns = board.columns.map(column => {
            if (column.id === sourceColumnId) {
              const cardIndex = column.cards.findIndex(c => c.id === cardId)
              if (cardIndex >= 0) {
                cardToMove = column.cards[cardIndex]
                return {
                  ...column,
                  cards: column.cards.filter(c => c.id !== cardId)
                }
              }
            }
            return column
          })
          
          // Add card to target column
          const finalColumns = updatedColumns.map(column => {
            if (column.id === targetColumnId && cardToMove) {
              const newCards = [...column.cards]
              newCards.splice(targetIndex, 0, { ...cardToMove, order: targetIndex })
              
              // Update order for all cards in target column
              return {
                ...column,
                cards: newCards.map((card, index) => ({ ...card, order: index }))
              }
            }
            return column
          })
          
          return {
            ...board,
            columns: finalColumns,
            updatedAt: new Date().toISOString()
          }
        })
      })),
      
      // Calendar actions
      addEvent: (event) => set((state) => ({
        events: [{
          ...event,
          id: crypto.randomUUID()
        }, ...state.events]
      })),
      
      updateEvent: (id, event) => set((state) => ({
        events: state.events.map(e => 
          e.id === id ? { ...e, ...event } : e
        )
      })),
      
      deleteEvent: (id) => set((state) => ({
        events: state.events.filter(e => e.id !== id)
      })),
      
      // Analytics
      getStats: () => {
        const state = get()
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        
        // Journal stats
        const recentEntries = state.journalEntries.filter(
          entry => new Date(entry.date) >= thirtyDaysAgo
        )
        const totalWords = state.journalEntries.reduce((sum, entry) => sum + entry.wordCount, 0)
        const avgWordsPerEntry = state.journalEntries.length > 0 ? 
          Math.round(totalWords / state.journalEntries.length) : 0
        
        // Habits stats
        const activeHabits = state.habits.filter(h => h.isActive)
        const recentHabitEntries = state.habitEntries.filter(
          entry => new Date(entry.date) >= thirtyDaysAgo
        )
        const completedEntries = recentHabitEntries.filter(entry => entry.completed)
        const completionRate = recentHabitEntries.length > 0 ? 
          Math.round((completedEntries.length / recentHabitEntries.length) * 100) : 0
        
        // Goals stats
        const completedGoals = state.goals.filter(g => g.status === 'completed')
        const inProgressGoals = state.goals.filter(g => g.status === 'in-progress')
        
        return {
          journal: {
            totalEntries: state.journalEntries.length,
            wordsWritten: totalWords,
            streak: recentEntries.length,
            avgWordsPerEntry
          },
          habits: {
            totalHabits: state.habits.length,
            activeHabits: activeHabits.length,
            completionRate,
            longestStreak: 0 // TODO: Calculate actual streak
          },
          goals: {
            totalGoals: state.goals.length,
            completedGoals: completedGoals.length,
            inProgressGoals: inProgressGoals.length,
            avgCompletionTime: 0 // TODO: Calculate from completed goals
          },
          productivity: {
            focusTime: 0, // TODO: Track focus sessions
            documentsCreated: state.zenDocuments.length,
            boardsCreated: state.boards.length,
            tasksCompleted: state.boards.reduce((sum, board) => 
              sum + board.columns.reduce((colSum, col) => colSum + col.cards.length, 0), 0
            )
          }
        }
      },
      
      clearData: () => set({
        journalEntries: [],
        habits: [],
        habitEntries: [],
        goals: [],
        zenDocuments: [],
        currentDocument: null,
        boards: [],
        currentBoard: null,
        events: []
      })
    }),
    {
      name: 'neuroflow-productivity-store',
      partialize: (state) => ({
        journalEntries: state.journalEntries,
        habits: state.habits,
        habitEntries: state.habitEntries,
        goals: state.goals,
        zenDocuments: state.zenDocuments,
        currentDocument: state.currentDocument,
        boards: state.boards,
        currentBoard: state.currentBoard,
        events: state.events
      })
    }
  )
)
