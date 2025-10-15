import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Quote, Check, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface QuoteCarouselSectionProps {
  onNext: () => void;
}

const quotes = [
  {
    id: 1,
    text: "Usia hanyalah angka. Kualitas hidup ditentukan oleh semangat dalam hatimu.",
    author: "Unknown"
  },
  {
    id: 2,
    text: "Setiap tahun adalah kesempatan baru untuk menjadi versi terbaik dari dirimu.",
    author: "Oprah Winfrey"
  },
  {
    id: 3,
    text: "Jangan hitung berapa tahun dalam hidupmu, tapi berapa kehidupan dalam tahunmu.",
    author: "Abraham Lincoln"
  },
  {
    id: 4,
    text: "Ulang tahun adalah awal dari babak baru penuh keajaiban dan kemungkinan.",
    author: "Unknown"
  },
  {
    id: 5,
    text: "Rayakan setiap pencapaianmu, sekecil apapun. Kamu telah berkembang jauh!",
    author: "Unknown"
  },
  {
    id: 6,
    text: "Hari ini adalah harimu untuk bersinar lebih terang dari sebelumnya.",
    author: "Unknown"
  },
  {
    id: 7,
    text: "Bertambah tua adalah hadiah, bukan beban. Nikmati setiap momennya.",
    author: "Unknown"
  },
  {
    id: 8,
    text: "Hidup dimulai pada akhir zona nyamanmu. Berani untuk bertumbuh!",
    author: "Neale Donald Walsch"
  },
  {
    id: 9,
    text: "Kamu adalah karya seni yang terus berkembang. Teruslah melukis kehidupanmu.",
    author: "Unknown"
  }
];

export default function QuoteCarouselSection({ onNext }: QuoteCarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedQuotes, setViewedQuotes] = useState<Set<number>>(new Set([1]));
  const [direction, setDirection] = useState(0);
  const allViewed = viewedQuotes.size === quotes.length;

  useEffect(() => {
    setViewedQuotes(prev => new Set(prev).add(quotes[currentIndex].id));
  }, [currentIndex]);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
    }),
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
    >
      <Card className="max-w-3xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full">
            <Quote className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <h2 className="text-3xl font-bold text-center text-primary">
            Kata-Kata Bijak
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-primary/60 hover:text-primary transition-colors" data-testid="tooltip-info">
                <Info className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs text-sm">Lihat semua 9 kata bijak untuk melanjutkan</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-foreground/70 mb-2"
        >
          {viewedQuotes.size} dari {quotes.length} kata bijak telah kamu lihat
        </motion.p>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center gap-1 mb-8"
        >
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                viewedQuotes.has(quote.id)
                  ? "bg-primary w-8"
                  : "bg-primary/20"
              }`}
            />
          ))}
        </motion.div>

        <div className="relative h-64 md:h-48 mb-8 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center px-4"
            >
              <div className="text-center">
                <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-4 font-medium">
                  "{quotes[currentIndex].text}"
                </p>
                <p className="text-sm text-primary/70 font-semibold">
                  — {quotes[currentIndex].author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            onClick={handlePrevious}
            variant="outline"
            size="icon"
            className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
            data-testid="button-previous"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>

          <span className="text-foreground/60 font-medium">
            {currentIndex + 1} / {quotes.length}
          </span>

          <Button
            onClick={handleNext}
            variant="outline"
            size="icon"
            className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary"
            data-testid="button-next-quote"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </Button>
        </div>

        {allViewed && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <Check className="w-5 h-5" />
                <p className="font-semibold">Kamu sudah melihat semua kata-kata bijak! ✨</p>
              </div>
            </Card>
          </motion.div>
        )}

        <Button
          onClick={onNext}
          disabled={!allViewed}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          data-testid="button-next"
        >
          Lanjutkan
        </Button>
      </Card>
    </motion.div>
  );
}
