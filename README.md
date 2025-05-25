# Flashcard App

A modern, responsive flashcard application built with Next.js and IndexedDB for efficient spaced repetition learning.

<img width="485" alt="Screenshot 2025-05-25 at 4 36 50 PM" src="https://github.com/user-attachments/assets/c8292d60-edfb-4d87-a336-45f15af8bc36" />
<img width="485" alt="Screenshot 2025-05-25 at 4 37 24 PM" src="https://github.com/user-attachments/assets/fd824a24-5e5b-4742-8f62-3f85a7c7d768" />
<img width="485" alt="Screenshot 2025-05-25 at 4 37 13 PM" src="https://github.com/user-attachments/assets/fdc9081c-1aaa-4b23-a4c9-6eb2ff41b797" />

<img width="485" alt="Screenshot 2025-05-25 at 4 37 03 PM" src="https://github.com/user-attachments/assets/8742cda5-84ae-473e-9e6d-a0f8f107dce2" />
<img width="485" alt="Screenshot 2025-05-25 at 4 37 44 PM" src="https://github.com/user-attachments/assets/ca49dc16-3b6a-46ed-99ad-416ace612bf0" />
<img width="485" alt="Screenshot 2025-05-25 at 4 42 02 PM" src="https://github.com/user-attachments/assets/46985b71-f517-4cab-ac6f-a40d1e0654ea" />


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
