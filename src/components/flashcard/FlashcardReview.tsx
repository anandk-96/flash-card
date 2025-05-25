'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDatabase } from '@/components/providers/DatabaseProvider';
import { Flashcard } from '@/lib/db';
import { FaCheck, FaTimes, FaRedo, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

interface FlashcardReviewProps {
  onComplete: () => void;
}

const FlashcardReview: React.FC<FlashcardReviewProps> = ({ onComplete }) => {
  const { getDueCards, updateFlashcardReview } = useDatabase();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setIsLoading(true);
      const dueCards = await getDueCards();
      setCards(dueCards);
      setError(null);
    } catch (err) {
      setError('Failed to load cards. Please try again.');
      console.error('Error loading cards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFlip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const handleResponse = async (remembered: boolean) => {
    const currentCard = cards[currentIndex];
    if (!currentCard?.id) {
      console.error('Card ID is undefined');
      return;
    }

    try {
      await updateFlashcardReview(currentCard.id, remembered);
      
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsFlipped(false);
      } else {
        onComplete();
      }
    } catch (error) {
      console.error('Error updating flashcard:', error);
      setError('Failed to update card. Please try again.');
    }
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
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={loadCards}
          className="btn btn-primary hover:scale-105 transition-transform"
        >
          <FaRedo className="mr-2" />
          Retry
        </button>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
          <FaCheck className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Cards Due</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You're all caught up with your current reviews! Would you like to check for new cards?
        </p>
        <button
          onClick={loadCards}
          className="btn btn-primary hover:scale-105 transition-transform"
        >
          <FaRedo className="mr-2" />
          Check for Cards
        </button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="mb-6">
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-right">
          {currentIndex + 1} of {cards.length}
        </div>
      </div>

      <div
        ref={cardRef}
        className="cursor-pointer h-[400px] max-h-[80vh] perspective-1000"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {!isFlipped ? (
            <div className="absolute w-full h-full backface-hidden">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {currentCard.image && (
                  <div className="relative w-full h-48 flex-shrink-0">
                    <img
                      src={currentCard.image}
                      alt="Flashcard"
                      className="w-full h-full object-cover rounded-t-xl"
                    />
                  </div>
                )}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="min-h-full flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center max-w-full break-words">
                        {currentCard.front}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 animate-pulse flex-shrink-0 border-t border-gray-200 dark:border-gray-700">
                    <span className="mr-2">Click to reveal answer</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
              <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="min-h-full flex items-center justify-center">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center max-w-full break-words">
                        {currentCard.back}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 flex justify-center space-x-4 flex-shrink-0 border-t border-gray-200 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleResponse(false);
                      }}
                      className="btn btn-secondary hover:scale-105 transition-transform"
                    >
                      <FaTimes className="mr-2" />
                      Not Learned
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleResponse(true);
                      }}
                      className="btn btn-primary hover:scale-105 transition-transform"
                    >
                      <FaCheck className="mr-2" />
                      Mastered
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardReview; 