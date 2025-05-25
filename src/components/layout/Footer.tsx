'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaHome, FaPlus, FaList, FaInfoCircle } from 'react-icons/fa';
import InfoModal from './InfoModal';

const Footer = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-2">
        <nav className="flex justify-between items-center h-16">
          <Link 
            href="/" 
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2"
          >
            <FaHome className="w-5 h-5 mb-1" />
            <span className="text-xs">Review</span>
          </Link>
          <Link 
            href="/add" 
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2"
          >
            <FaPlus className="w-5 h-5 mb-1" />
            <span className="text-xs">Add</span>
          </Link>
          <Link 
            href="/manage" 
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2"
          >
            <FaList className="w-5 h-5 mb-1" />
            <span className="text-xs">Manage</span>
          </Link>
          <button
            onClick={() => setShowInfo(true)}
            className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors px-2"
          >
            <FaInfoCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Info</span>
          </button>
        </nav>
      </div>
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </footer>
  );
};

export default Footer; 