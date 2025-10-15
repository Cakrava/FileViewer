import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Cake } from "lucide-react";

interface BirthdayInputSectionProps {
  onNext: (birthDate: string, age: number) => void;
}

export default function BirthdayInputSection({ onNext }: BirthdayInputSectionProps) {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const calculateAge = (date: string) => {
    const birth = new Date(date);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      calculatedAge--;
    }
    
    return calculatedAge;
  };

  const handleDateChange = (date: string) => {
    setBirthDate(date);
    if (date) {
      const calculatedAge = calculateAge(date);
      setAge(calculatedAge);
      
      const birth = new Date(date);
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                         "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
      
      setMessage(
        `Wah, kamu lahir pada ${birth.getDate()} ${monthNames[birth.getMonth()]} ${birth.getFullYear()}! ` +
        `Hari ini kamu berusia ${calculatedAge} tahun. Semoga tahun ini penuh berkah dan kebahagiaan! 🎂`
      );
    } else {
      setAge(null);
      setMessage("");
    }
  };

  const handleNext = () => {
    if (birthDate && age !== null) {
      onNext(birthDate, age);
    }
  };

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
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-3xl font-bold text-center text-primary mb-2"
        >
          Kapan Kamu Lahir?
        </motion.h2>

        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center text-foreground/70 mb-8"
        >
          Masukkan tanggal lahirmu agar kami tahu usiamu sekarang
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="birthdate" className="text-foreground/80 mb-2 block">
              Tanggal Lahir
            </Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="w-full border-primary/20 focus:border-primary rounded-lg"
              data-testid="input-birthdate"
            />
          </div>

          {message && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <Cake className="w-5 h-5 text-primary mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed">{message}</p>
              </div>
            </motion.div>
          )}

          <Button
            onClick={handleNext}
            disabled={!birthDate || age === null}
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
