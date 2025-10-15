import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Check } from "lucide-react";

interface PersonalMessageSectionProps {
  onNext: (message: string) => void;
}

export default function PersonalMessageSection({ onNext }: PersonalMessageSectionProps) {
  const [message, setMessage] = useState("");
  const isValid = message.length >= 10;

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
    >
      <Card className="max-w-xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-primary/10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="p-4 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full">
            <Heart className="w-8 h-8 text-secondary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-primary mb-2"
        >
          Ucapan Pribadi
        </motion.h2>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-foreground/70 mb-8"
        >
          Tulis ucapan istimewa dari hatimu untuk dirimu sendiri
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="message" className="text-foreground/80 mb-2 block">
              Pesan Untukmu (minimal 10 karakter)
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan harapan dan impianmu untuk tahun ini..."
              className="min-h-[150px] border-primary/20 focus:border-primary rounded-lg resize-none"
              data-testid="input-message"
            />
          </div>

          {isValid && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-green-600"
            >
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Yay, kamu sudah mengisi kata-katanya! ✨</span>
            </motion.div>
          )}

          <Button
            onClick={() => onNext(message)}
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
