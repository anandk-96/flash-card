'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { db, Flashcard, getDueCards, addFlashcard, updateFlashcardReview, deleteFlashcard, getAllFlashcards } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';

interface DatabaseContextType {
  getDueCards: () => Promise<Flashcard[]>;
  getAllFlashcards: () => Promise<Flashcard[]>;
  addFlashcard: (flashcard: Omit<Flashcard, 'id'>) => Promise<number>;
  updateFlashcardReview: (id: number, remembered: boolean) => Promise<void>;
  deleteFlashcard: (id: number) => Promise<void>;
  isLoading: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  // Use Dexie's live query to reactively get data
  const flashcardsForReview = useLiveQuery(() => db.getFlashcardsForReview(), [], []);
  const allFlashcards = useLiveQuery(() => db.getAllFlashcards(), [], []);

  const isLoading = flashcardsForReview === undefined || allFlashcards === undefined;

  const value = {
    getDueCards,
    getAllFlashcards,
    addFlashcard,
    updateFlashcardReview,
    deleteFlashcard,
    isLoading,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}; 