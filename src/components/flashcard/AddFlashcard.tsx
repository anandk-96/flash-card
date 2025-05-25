'use client';

import React, { useState } from 'react';
import { useDatabase } from '@/components/providers/DatabaseProvider';
// import { FaImage, FaSpinner } from 'react-icons/fa';
import { FaSpinner } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AddFlashcard: React.FC = () => {
  const { addFlashcard } = useDatabase();
  const router = useRouter();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  // const [image, setImage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) {
      setError('Please fill in both front and back of the card');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await addFlashcard({
        front: front.trim(),
        back: back.trim(),
        // image,
        nextReview: new Date(),
        interval: 1,
        easeFactor: 2.5,
        repetitions: 0
      });
      router.push('/');
    } catch (err) {
      setError('Failed to add flashcard. Please try again.');
      console.error('Error adding flashcard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setImage(reader.result as string);
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="front" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Front (Question)
        </label>
        <textarea
          id="front"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          className="textarea"
          rows={3}
          placeholder="Enter the question or prompt..."
          required
        />
      </div>

      <div>
        <label htmlFor="back" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Back (Answer)
        </label>
        <textarea
          id="back"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          className="textarea"
          rows={3}
          placeholder="Enter the answer..."
          required
        />
      </div>

      {/* Image upload section commented out
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Image (Optional)
        </label>
        <div className="flex items-center space-x-4">
          <label className="btn btn-outline cursor-pointer">
            <FaImage className="mr-2" />
            Choose Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
          {image && (
            <div className="relative w-20 h-20">
              <img
                src={image}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImage(undefined)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>
      */}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Adding...
          </>
        ) : (
          'Add Flashcard'
        )}
      </button>
    </form>
  );
};

export default AddFlashcard; 