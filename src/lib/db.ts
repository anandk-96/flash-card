import Dexie, { Table } from 'dexie';

export interface Flashcard {
  id?: number;
  front: string;
  back: string;
  image?: string;
  nextReview: Date;
  interval: number;
  easeFactor: number;
  repetitions: number;
}

// Fibonacci sequence for spacing repetitions
export const fibonacciDays = [1, 2, 3, 5, 8, 13, 21];

class FlashcardDatabase extends Dexie {
  flashcards!: Table<Flashcard>;

  constructor() {
    super('FlashcardDB');
    this.version(1).stores({
      flashcards: '++id, nextReview'
    });
    this.fixExistingCards();
  }

  private async fixExistingCards() {
    try {
      const allCards = await this.flashcards.toArray();
      for (const card of allCards) {
        const nextReview = new Date(card.nextReview);
        nextReview.setHours(0, 0, 0, 0);
        if (nextReview.getTime() !== new Date(card.nextReview).getTime()) {
          await this.flashcards.update(card.id!, { nextReview });
        }
      }
    } catch (error) {
      console.error('Error fixing existing cards:', error);
    }
  }

  async getFlashcardsForReview(): Promise<Flashcard[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.flashcards
      .where('nextReview')
      .belowOrEqual(today)
      .toArray();
  }

  async addFlashcard(flashcard: Omit<Flashcard, 'id'>): Promise<number> {
    const id = await this.flashcards.add(flashcard);
    return Number(id);
  }

  async updateFlashcardReview(id: number, remembered: boolean): Promise<void> {
    const flashcard = await this.flashcards.get(id);
    
    if (!flashcard) {
      throw new Error('Flashcard not found');
    }
    
    const fibonacci = [1, 2, 3, 5, 8, 13, 21];
    let newInterval: number;
    let newEaseFactor = flashcard.easeFactor;

    if (remembered) {
      // Move to next interval in Fibonacci sequence
      const currentIndex = fibonacci.indexOf(flashcard.interval);
      newInterval = currentIndex < fibonacci.length - 1 ? fibonacci[currentIndex + 1] : fibonacci[currentIndex];
      newEaseFactor = Math.max(1.3, flashcard.easeFactor + (0.1 - (5 - 4) * (0.08 + (5 - 4) * 0.02)));
    } else {
      // Reset to first interval
      newInterval = fibonacci[0];
      newEaseFactor = Math.max(1.3, flashcard.easeFactor - 0.2);
    }

    const nextReview = new Date();
    nextReview.setHours(0, 0, 0, 0);
    nextReview.setDate(nextReview.getDate() + newInterval);

    await this.flashcards.update(id, {
      interval: newInterval,
      easeFactor: newEaseFactor,
      nextReview,
      repetitions: flashcard.repetitions + 1
    });
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    return this.flashcards.toArray();
  }

  async deleteFlashcard(id: number): Promise<void> {
    await this.flashcards.delete(id);
  }
}

export const db = new FlashcardDatabase();

export const getDueCards = async (): Promise<Flashcard[]> => {
  const now = new Date();
  return await db.flashcards
    .where('nextReview')
    .belowOrEqual(now)
    .toArray();
};

export const getAllFlashcards = async (): Promise<Flashcard[]> => {
  return await db.getAllFlashcards();
};

export const addFlashcard = async (flashcard: Omit<Flashcard, 'id'>): Promise<number> => {
  const id = await db.flashcards.add(flashcard);
  return Number(id);
};

export const updateFlashcardReview = async (id: number, remembered: boolean): Promise<void> => {
  const flashcard = await db.flashcards.get(id);
  if (!flashcard) return;

  const fibonacci = [1, 2, 3, 5, 8, 13, 21];
  let newInterval: number;
  let newEaseFactor = flashcard.easeFactor;

  if (remembered) {
    // Move to next interval in Fibonacci sequence
    const currentIndex = fibonacci.indexOf(flashcard.interval);
    newInterval = currentIndex < fibonacci.length - 1 ? fibonacci[currentIndex + 1] : fibonacci[currentIndex];
    newEaseFactor = Math.max(1.3, flashcard.easeFactor + (0.1 - (5 - 4) * (0.08 + (5 - 4) * 0.02)));
  } else {
    // Reset to first interval
    newInterval = fibonacci[0];
    newEaseFactor = Math.max(1.3, flashcard.easeFactor - 0.2);
  }

  const nextReview = new Date();
  nextReview.setHours(0, 0, 0, 0);
  nextReview.setDate(nextReview.getDate() + newInterval);

  await db.flashcards.update(id, {
    interval: newInterval,
    easeFactor: newEaseFactor,
    nextReview,
    repetitions: flashcard.repetitions + 1
  });
};

export const deleteFlashcard = async (id: number): Promise<void> => {
  await db.flashcards.delete(id);
}; 