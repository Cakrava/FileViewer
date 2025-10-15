import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Gamepad2, Check } from "lucide-react";

interface WordMatchingGameProps {
  word: string;
  hint: string;
  gameNumber: number;
  onNext: (completedWord: string) => void;
}

export default function WordMatchingGame({ word, hint, gameNumber, onNext }: WordMatchingGameProps) {
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const [pattern, setPattern] = useState<(string | null)[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Create pattern: show some letters, hide others
    const wordArray = word.toUpperCase().split("");
    const newPattern: (string | null)[] = wordArray.map((char, idx) => {
      // Show letters at positions 0, 2, 4, etc.
      return idx % 2 === 0 ? char : null;
    });
    setPattern(newPattern);
    
    // Initialize user inputs
    const emptyCount = newPattern.filter(p => p === null).length;
    setUserInputs(new Array(emptyCount).fill(""));
  }, [word]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...userInputs];
    newInputs[index] = value.toUpperCase().slice(0, 1); // Only one character
    setUserInputs(newInputs);

    // Check if complete
    const completedWord = buildCompletedWord(newInputs);
    if (completedWord.length === word.length && completedWord === word.toUpperCase()) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };

  const buildCompletedWord = (inputs: string[]) => {
    let inputIndex = 0;
    return pattern.map(char => {
      if (char === null) {
        return inputs[inputIndex++] || "";
      }
      return char;
    }).join("");
  };

  const currentWord = buildCompletedWord(userInputs);
  const isValid = currentWord.length >= 10 && isComplete;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
    >
      <Card className="max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-full">
            <Gamepad2 className="w-8 h-8 text-accent" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-primary mb-2"
        >
          Game Pencocokan Kata #{gameNumber}
        </motion.h2>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-foreground/70 mb-8"
        >
          {hint}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {pattern.map((char, idx) => {
              if (char !== null) {
                return (
                  <div
                    key={idx}
                    className="w-10 h-12 md:w-12 md:h-14 flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border-2 border-primary/30"
                  >
                    <span className="text-2xl md:text-3xl font-bold text-primary">{char}</span>
                  </div>
                );
              } else {
                const inputIndex = pattern.slice(0, idx).filter(p => p === null).length;
                return (
                  <Input
                    key={idx}
                    value={userInputs[inputIndex] || ""}
                    onChange={(e) => handleInputChange(inputIndex, e.target.value)}
                    maxLength={1}
                    className="w-10 h-12 md:w-12 md:h-14 text-center text-2xl md:text-3xl font-bold border-2 border-primary/30 focus:border-primary rounded-lg p-0"
                    data-testid={`input-letter-${idx}`}
                  />
                );
              }
            })}
          </div>

          {isValid && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 text-green-600"
            >
              <Check className="w-5 h-5" />
              <span className="text-sm font-medium">Yay, kamu berhasil menebak kata dengan benar! 🎉</span>
            </motion.div>
          )}

          <Button
            onClick={() => onNext(currentWord)}
            disabled={!isValid}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            data-testid="button-next"
          >
            Lanjutkan
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
}
