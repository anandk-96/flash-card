'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaPlus, FaInfoCircle, FaHome } from 'react-icons/fa';
import InfoModal from './InfoModal';

const Footer = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2 px-4">
      <div className="max-w-md mx-auto flex items-center justify-between relative">
        {/* Left: Home */}
        <Link 
          href="/" 
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <FaHome className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {/* Center: Add Card FAB */}
        <Link 
          href="/add"
          className="absolute left-1/2 -translate-x-1/2 -top-8 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors"
        >
          <FaPlus className="w-6 h-6" />
        </Link>

        {/* Right: Info */}
        <button
          onClick={() => setShowInfo(true)}
          className="flex flex-col items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <FaInfoCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Info</span>
        </button>

        {/* Info Modal */}
        <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
      </div>
    </footer>
  );
};

export default Footer; 