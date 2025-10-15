import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Gift, Cake } from "lucide-react";

interface WelcomeSectionProps {
  onNext: () => void;
}

export default function WelcomeSection({ onNext }: WelcomeSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
    >
      <Card className="max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10 relative overflow-hidden">
        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-8 text-primary opacity-20"
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-12 left-8 text-secondary opacity-20"
        >
          <Gift className="w-14 h-14" />
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 text-accent opacity-15"
        >
          <Cake className="w-12 h-12" />
        </motion.div>

        <div className="text-center relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4 leading-tight">
              Selamat Ulang Tahun
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6">
              Muhammad Fahril! 🎉
            </h2>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-foreground/70 mb-8 max-w-lg mx-auto leading-relaxed"
          >
            Hari ini adalah hari istimewa untukmu! Mari kita rayakan dengan penuh suka cita dan kebahagiaan.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Button
              onClick={onNext}
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              data-testid="button-start"
            >
              Mulai Perayaan ✨
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
