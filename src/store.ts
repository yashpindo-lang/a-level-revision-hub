import { create } from 'zustand';

export interface Topic {
  id: string;
  subject: string;
  level: 'AS' | 'A';
  title: string;
  syllabusCode: string;
  status: 'not-started' | 'learning' | 'practising' | 'mastered';
  progress: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Flashcard {
  id: string;
  topicId: string;
  front: string;
  back: string;
  difficulty: 'again' | 'hard' | 'good' | 'easy';
}

export interface Note {
  id: string;
  topicId: string;
  content: string;
  createdAt: number;
}

export interface AppState {
  topics: Topic[];
  flashcards: Flashcard[];
  notes: Note[];
  currentSubject: string | null;
  currentView: 'constellation' | 'subject' | 'topic';
  streak: number;
  lastStudyDate: string | null;
  animationsEnabled: boolean;
  
  // Actions
  initializeFromStorage: () => void;
  setCurrentSubject: (subject: string | null) => void;
  setCurrentView: (view: 'constellation' | 'subject' | 'topic') => void;
  updateTopicStatus: (topicId: string, status: Topic['status']) => void;
  updateTopicProgress: (topicId: string, progress: number) => void;
  addFlashcard: (flashcard: Flashcard) => void;
  updateFlashcardDifficulty: (cardId: string, difficulty: Flashcard['difficulty']) => void;
  addNote: (note: Note) => void;
  deleteNote: (noteId: string) => void;
  updateStreak: () => void;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const useStore = create<AppState>((set, get) => ({
  topics: [],
  flashcards: [],
  notes: [],
  currentSubject: null,
  currentView: 'constellation',
  streak: 0,
  lastStudyDate: null,
  animationsEnabled: true,

  initializeFromStorage: () => {
    const stored = localStorage.getItem('revisionHub');
    if (stored) {
      const data = JSON.parse(stored);
      set(data);
    }
  },

  setCurrentSubject: (subject) => {
    set({ currentSubject: subject });
    get().initializeFromStorage();
  },

  setCurrentView: (view) => set({ currentView: view }),

  updateTopicStatus: (topicId, status) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, status } : t
      ),
    }));
    get().updateStreak();
  },

  updateTopicProgress: (topicId, progress) => {
    set((state) => ({
      topics: state.topics.map((t) =>
        t.id === topicId ? { ...t, progress } : t
      ),
    }));
  },

  addFlashcard: (flashcard) => {
    set((state) => ({
      flashcards: [...state.flashcards, flashcard],
    }));
  },

  updateFlashcardDifficulty: (cardId, difficulty) => {
    set((state) => ({
      flashcards: state.flashcards.map((c) =>
        c.id === cardId ? { ...c, difficulty } : c
      ),
    }));
  },

  addNote: (note) => {
    set((state) => ({
      notes: [...state.notes, note],
    }));
  },

  deleteNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== noteId),
    }));
  },

  updateStreak: () => {
    const today = new Date().toISOString().split('T')[0];
    const state = get();
    if (state.lastStudyDate !== today) {
      set({
        lastStudyDate: today,
        streak: state.streak + 1,
      });
    }
  },

  setAnimationsEnabled: (enabled) => set({ animationsEnabled: enabled }),
}));

// Persist to localStorage
useStore.subscribe((state) => {
  localStorage.setItem('revisionHub', JSON.stringify(state));
});

export default useStore;