'use client';

import React from 'react';
import { FaTimes, FaBrain, FaLightbulb, FaBook, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">How It Works</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-8">
            {/* Quick Start Guide */}
            <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 mb-3">
                <FaBook className="text-primary w-5 h-5" />
                <h3 className="text-xl font-semibold text-primary">Quick Start Guide</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Create your first flashcard using the + button</li>
                  <li>Start your review session from the home page</li>
                  <li>Review cards daily for optimal results</li>
                  <li>Track your progress in the statistics section</li>
                  <li>Adjust your learning strategy based on performance</li>
                </ol>
              </div>
            </section>

            {/* Spaced Repetition Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-3">
                <FaBrain className="text-primary w-5 h-5" />
                <h3 className="text-xl font-semibold text-primary">Spaced Repetition</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <p className="text-gray-600 dark:text-gray-300">
                  Our app uses the SuperMemo 2 algorithm to optimize your learning:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Cards are reviewed at optimal intervals based on your performance</li>
                  <li>Intervals increase exponentially as you master the content (1 day → 3 days → 7 days → 14 days → 30 days)</li>
                  <li>Difficult cards appear more frequently to strengthen weak areas</li>
                  <li>Easy cards are spaced further apart to maximize efficiency</li>
                  <li>Each card has its own learning curve and interval schedule</li>
                </ul>
              </div>
            </section>

            {/* Review Process Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 mb-3">
                <FaBook className="text-primary w-5 h-5" />
                <h3 className="text-xl font-semibold text-primary">Review Process</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <p className="text-gray-600 dark:text-gray-300">
                  Each review session follows these steps:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Review cards due for today in a randomized order</li>
                  <li>For each card:
                    <ul className="ml-6 mt-1 space-y-1">
                      <li>• Read the question carefully</li>
                      <li>• Try to recall the answer</li>
                      <li>• Flip the card to check your answer</li>
                      <li>• Mark as "Mastered" or "Not Learned"</li>
                    </ul>
                  </li>
                  <li>System calculates new intervals based on your performance</li>
                  <li>Track your progress with detailed statistics</li>
                </ol>
              </div>
            </section>

            {/* Learning Tips Section */}
            <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2 mb-3">
                <FaLightbulb className="text-primary w-5 h-5" />
                <h3 className="text-xl font-semibold text-primary">Learning Tips</h3>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Best Practices</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                        Review cards daily for best results
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                        Be honest with your self-assessment
                      </li>
                      <li className="flex items-start">
                        <FaCheckCircle className="text-primary mr-2 mt-1 flex-shrink-0" />
                        Keep cards concise and focused
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-800 dark:text-white">Common Mistakes</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <FaExclamationCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        Don't mark cards as mastered if you're unsure
                      </li>
                      <li className="flex items-start">
                        <FaExclamationCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        Avoid creating overly complex cards
                      </li>
                      <li className="flex items-start">
                        <FaExclamationCircle className="text-red-500 mr-2 mt-1 flex-shrink-0" />
                        Don't skip review sessions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal; 