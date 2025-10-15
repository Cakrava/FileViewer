import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import WelcomeSection from "@/components/birthday/WelcomeSection";
import BirthdayInputSection from "@/components/birthday/BirthdayInputSection";
import PersonalMessageSection from "@/components/birthday/PersonalMessageSection";
import DoaSection from "@/components/birthday/DoaSection";
import WordMatchingGame from "@/components/birthday/WordMatchingGame";
import QuoteCarouselSection from "@/components/birthday/QuoteCarouselSection";
import FinaleSection from "@/components/birthday/FinaleSection";

interface BirthdayData {
  birthDate: string;
  age: number;
  personalMessage: string;
  wordGame1: string;
  wordGame2: string;
  wordGame3: string;
}

const wordGames = [
  { word: "KEBAHAGIAAN", hint: "Perasaan yang kamu rasakan hari ini" },
  { word: "KESUKSESAN", hint: "Sesuatu yang kamu kejar dalam hidup" },
  { word: "KEBERUNTUNGAN", hint: "Sesuatu yang semoga selalu menyertaimu" },
];

export default function BirthdayPage() {
  const [currentSection, setCurrentSection] = useState(1);
  const [birthdayData, setBirthdayData] = useState<Partial<BirthdayData>>({});

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("fahril-birthday-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setBirthdayData(data);
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    if (Object.keys(birthdayData).length > 0) {
      localStorage.setItem("fahril-birthday-data", JSON.stringify(birthdayData));
    }
  }, [birthdayData]);

  const handleSection1Next = () => {
    setCurrentSection(2);
  };

  const handleSection2Next = (birthDate: string, age: number) => {
    setBirthdayData((prev) => ({ ...prev, birthDate, age }));
    setCurrentSection(3);
  };

  const handleSection3Next = (message: string) => {
    setBirthdayData((prev) => ({ ...prev, personalMessage: message }));
    setCurrentSection(4);
  };

  const handleSection4Next = () => {
    setCurrentSection(5);
  };

  const handleSection5Next = (word: string) => {
    setBirthdayData((prev) => ({ ...prev, wordGame1: word }));
    setCurrentSection(6);
  };

  const handleSection6Next = (word: string) => {
    setBirthdayData((prev) => ({ ...prev, wordGame2: word }));
    setCurrentSection(7);
  };

  const handleSection7Next = (word: string) => {
    setBirthdayData((prev) => ({ ...prev, wordGame3: word }));
    setCurrentSection(8);
  };

  const handleSection8Next = () => {
    setCurrentSection(9);
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentSection === 1 && (
          <WelcomeSection key="section-1" onNext={handleSection1Next} />
        )}
        {currentSection === 2 && (
          <BirthdayInputSection key="section-2" onNext={handleSection2Next} />
        )}
        {currentSection === 3 && (
          <PersonalMessageSection key="section-3" onNext={handleSection3Next} />
        )}
        {currentSection === 4 && (
          <DoaSection key="section-4" onNext={handleSection4Next} />
        )}
        {currentSection === 5 && (
          <WordMatchingGame
            key="section-5"
            word={wordGames[0].word}
            hint={wordGames[0].hint}
            gameNumber={1}
            onNext={handleSection5Next}
          />
        )}
        {currentSection === 6 && (
          <WordMatchingGame
            key="section-6"
            word={wordGames[1].word}
            hint={wordGames[1].hint}
            gameNumber={2}
            onNext={handleSection6Next}
          />
        )}
        {currentSection === 7 && (
          <WordMatchingGame
            key="section-7"
            word={wordGames[2].word}
            hint={wordGames[2].hint}
            gameNumber={3}
            onNext={handleSection7Next}
          />
        )}
        {currentSection === 8 && (
          <QuoteCarouselSection key="section-8" onNext={handleSection8Next} />
        )}
        {currentSection === 9 && birthdayData.birthDate && birthdayData.age && (
          <FinaleSection
            key="section-9"
            birthDate={birthdayData.birthDate}
            age={birthdayData.age}
            personalMessage={birthdayData.personalMessage || ""}
            wordGame1={birthdayData.wordGame1 || ""}
            wordGame2={birthdayData.wordGame2 || ""}
            wordGame3={birthdayData.wordGame3 || ""}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
