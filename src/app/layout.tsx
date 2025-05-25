import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DatabaseProvider } from "@/components/providers/DatabaseProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlashLearn - Flashcard Learning App",
  description: "A spaced repetition flashcard app for effective learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 pb-20`}>
        <DatabaseProvider>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </DatabaseProvider>
      </body>
    </html>
  );
}
