'use client';

import React, { useState, useEffect } from 'react';
import { useDatabase } from '@/components/providers/DatabaseProvider';
import { Flashcard } from '@/lib/db';
import { FaTrash, FaSpinner, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const FlashcardList: React.FC = () => {
  const database = useDatabase();
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadFlashcards();
  }, []);

  const loadFlashcards = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allCards = await database.getAllFlashcards();
      const sortedCards = allCards.sort((a: Flashcard, b: Flashcard) => 
        new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
      );
      setFlashcards(sortedCards);
    } catch (err) {
      setError('Failed to load flashcards. Please try again.');
      console.error('Error loading flashcards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this flashcard?')) return;

    try {
      setDeletingId(id);
      await database.deleteFlashcard(id);
      setFlashcards(cards => cards.filter(card => card.id !== id));
    } catch (err) {
      setError('Failed to delete flashcard. Please try again.');
      console.error('Error deleting flashcard:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const calculateNextIntervals = (card: Flashcard) => {
    const currentInterval = card.interval;
    const easeFactor = card.easeFactor;
    
    // Calculate next intervals based on different responses
    const ifMastered = Math.round(currentInterval * easeFactor);
    const ifNotLearned = 1; // Next day
    
    return {
      ifMastered,
      ifNotLearned,
      currentInterval
    };
  };

  const formatInterval = (interval: number) => {
    if (interval < 1) return 'Today';
    if (interval === 1) return 'Tomorrow';
    if (interval < 7) return `In ${interval} days`;
    if (interval < 30) return `In ${Math.floor(interval / 7)} weeks`;
    return `In ${Math.floor(interval / 30)} months`;
  };

  const isDueForReview = (nextReview: Date) => {
    const now = new Date();
    return new Date(nextReview) <= now;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadFlashcards}
          className="btn btn-primary"
        >
          <FaSpinner className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-600 dark:text-gray-400">No flashcards yet. Add some to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {flashcards.map((card) => {
        const intervals = calculateNextIntervals(card);
        const isDue = isDueForReview(card.nextReview);
        return (
          <div
            key={card.id}
            className={`card hover-lift ${isDue ? 'ring-2 ring-primary' : ''} overflow-hidden`}
          >
            {card.image && (
              <div className="relative w-full h-48">
                <img
                  src={card.image}
                  alt="Flashcard"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
            )}
            <div className="p-4 flex flex-col h-full">
              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white break-words flex-1 min-w-0">
                  {card.front}
                </h3>
                {isDue && (
                  <span className="text-xs bg-primary text-white px-2 py-1 rounded flex-shrink-0 whitespace-nowrap">
                    Due for Review
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4 break-words">
                {card.back}
              </p>
              
              {/* Current Status */}
              <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt className="text-primary flex-shrink-0" />
                  <span className="break-words">Next Review: {new Date(card.nextReview).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Next Review Schedule */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <FaCheckCircle className="text-green-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 break-words">
                    If Mastered: {formatInterval(intervals.ifMastered)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FaTimesCircle className="text-red-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 break-words">
                    If Not Learned: {formatInterval(intervals.ifNotLearned)}
                  </span>
                </div>
              </div>

              {/* Card Stats */}
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-auto">
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary flex-shrink-0" />
                  <span>Repetitions: {card.repetitions}</span>
                </div>
                <button
                  onClick={() => card.id && handleDelete(card.id)}
                  disabled={deletingId === card.id}
                  className="text-red-500 hover:text-red-600 transition-colors flex-shrink-0"
                >
                  {deletingId === card.id ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaTrash />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlashcardList; 