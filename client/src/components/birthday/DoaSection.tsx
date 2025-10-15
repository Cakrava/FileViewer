import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

interface DoaSectionProps {
  onNext: () => void;
}

export default function DoaSection({ onNext }: DoaSectionProps) {
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
          <div className="p-4 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full">
            <BookOpen className="w-8 h-8 text-accent" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-primary mb-8"
        >
          Doa Untuk Ulang Tahunmu
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
            <p className="text-center text-2xl md:text-3xl font-arabic text-primary mb-4 leading-relaxed" dir="rtl">
              اللَّهُمَّ بَارِكْ لَهُ فِي عُمْرِهِ وَارْزُقْهُ الصِّحَّةَ وَالْعَافِيَةَ وَالسَّعَادَةَ
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent my-4" />
            <p className="text-center text-foreground/80 leading-relaxed">
              <span className="font-semibold text-primary">Terjemahan:</span><br />
              "Ya Allah, berkahilah umurnya, anugerahkan kepadanya kesehatan, kesejahteraan, dan kebahagiaan."
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center text-foreground/70 leading-relaxed"
          >
            Semoga setiap langkahmu di tahun ini diberkahi dan penuh dengan kebaikan. 🤲✨
          </motion.p>

          <Button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-6 rounded-xl font-semibold transition-all duration-300"
            data-testid="button-next"
          >
            Lanjutkan
          </Button>
        </motion.div>
      </Card>
    </motion.div>
  );
}
