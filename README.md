# Flashcard App

A modern, responsive flashcard application built with Next.js and IndexedDB for efficient spaced repetition learning.

## Features

- 📱 **Responsive Design**: Works seamlessly on both desktop and mobile devices
- 🎯 **Spaced Repetition**: Implements a Fibonacci-based spaced repetition system
- 💾 **Offline Support**: Uses IndexedDB for local storage
- 🌙 **Dark Mode**: Built-in dark mode support
- 📊 **Progress Tracking**: Monitor your learning progress with detailed statistics
- 🔄 **Review System**: Smart review scheduling based on your performance
- 🖼️ **Image Support**: Add images to your flashcards (coming soon)

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (via Dexie.js)
- **Icons**: React Icons

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flashcard-app.git
   cd flashcard-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Add Cards**: Create new flashcards with front and back content
2. **Review**: Review cards based on the spaced repetition schedule
3. **Manage**: View and manage all your flashcards
4. **Track Progress**: Monitor your learning progress and statistics

## Spaced Repetition System

The app uses a Fibonacci-based spaced repetition system:
- Cards are scheduled for review based on your performance
- Intervals increase as you master the content
- Failed cards are reset to the beginning of the sequence

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
