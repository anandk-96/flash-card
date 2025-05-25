'use client';

import React, { useState } from 'react';
import FlashcardReview from '@/components/flashcard/FlashcardReview';
import { FaCheckCircle } from 'react-icons/fa';

const ReviewPage: React.FC = () => {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = () => {
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div className="text-center p-8">
        <FaCheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Review Complete!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You've reviewed all your cards for today. Come back tomorrow for more!
        </p>
        <button
          onClick={() => setIsComplete(false)}
          className="btn btn-primary"
        >
          Review Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Review Cards
      </h1>
      <FlashcardReview onComplete={handleComplete} />
    </div>
  );
};

export default ReviewPage; 