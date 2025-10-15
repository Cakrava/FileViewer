import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Sparkles, Music } from "lucide-react";
import confetti from "canvas-confetti";
import html2canvas from "html2canvas";

interface FinaleSectionProps {
  birthDate: string;
  age: number;
  personalMessage: string;
  wordGame1: string;
  wordGame2: string;
  wordGame3: string;
}

export default function FinaleSection({
  birthDate,
  age,
  personalMessage,
  wordGame1,
  wordGame2,
  wordGame3,
}: FinaleSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);

  useEffect(() => {
    // Trigger confetti
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#a855f7", "#ec4899", "#f59e0b"],
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#a855f7", "#ec4899", "#f59e0b"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Balloon confetti
    const balloonInterval = setInterval(() => {
      confetti({
        particleCount: 2,
        angle: 90,
        spread: 45,
        origin: { y: 1 },
        colors: ["#a855f7", "#ec4899", "#f59e0b"],
        shapes: ["circle"],
        scalar: 1.2,
        gravity: -0.4,
        drift: Math.random() > 0.5 ? 0.2 : -0.2,
      });
    }, 300);

    setTimeout(() => {
      clearInterval(balloonInterval);
    }, duration);

    // Auto-play audio after a short delay
    const audioTimeout = setTimeout(() => {
      if (audioRef.current && !hasAutoPlayed) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasAutoPlayed(true);
        }).catch((err) => {
          console.log("Audio autoplay prevented:", err);
        });
      }
    }, 1000);

    return () => {
      clearInterval(balloonInterval);
      clearTimeout(audioTimeout);
    };
  }, [hasAutoPlayed]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: "#faf5ff",
      });

      const link = document.createElement("a");
      link.download = `ucapan-ulang-tahun-fahril-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const birthDateObj = new Date(birthDate);
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", 
                     "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 via-pink-50 to-orange-50"
    >
      <div className="max-w-4xl w-full space-y-6">
        <Card
          ref={cardRef}
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-8 md:p-12 border border-primary/10"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full"
              >
                <Sparkles className="w-10 h-10 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
              Selamat Ulang Tahun!
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">
              Muhammad Fahril
            </h2>
            <p className="text-xl text-foreground/70">
              {age} Tahun Penuh Kebahagiaan ✨
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <h3 className="font-semibold text-primary mb-2">📅 Tanggal Lahir:</h3>
              <p className="text-foreground/80">
                {birthDateObj.getDate()} {monthNames[birthDateObj.getMonth()]} {birthDateObj.getFullYear()}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-secondary/10">
              <h3 className="font-semibold text-secondary mb-2">💝 Ucapan Pribadimu:</h3>
              <p className="text-foreground/80 leading-relaxed">{personalMessage}</p>
            </div>

            <div className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl border border-accent/10">
              <h3 className="font-semibold text-accent mb-3">🎮 Kata-Kata yang Kamu Temukan:</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                  {wordGame1}
                </span>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium">
                  {wordGame2}
                </span>
                <span className="px-4 py-2 bg-accent/10 text-accent rounded-lg font-medium">
                  {wordGame3}
                </span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
              <h3 className="font-semibold text-primary mb-2">🌟 Karakteristik Orang Lahir di Bulan {monthNames[birthDateObj.getMonth()]}:</h3>
              <p className="text-foreground/80 leading-relaxed">
                {birthDateObj.getMonth() === 9 ? (
                  "Orang yang lahir di bulan Oktober dikenal dengan kepribadian yang penuh semangat, kreatif, dan memiliki jiwa kepemimpinan yang kuat. Mereka juga sangat setia kepada orang-orang yang dicintai dan selalu berusaha menciptakan keharmonisan di sekitarnya. Tahun ini, energimu akan membawa banyak peluang baru dan pencapaian luar biasa!"
                ) : (
                  "Kamu adalah seseorang yang istimewa dengan kepribadian yang unik! Tahun ini akan penuh dengan berkah, kebahagiaan, dan pencapaian yang membanggakan. Teruslah bersinar dan menginspirasi orang-orang di sekitarmu!"
                )}
              </p>
            </div>
          </motion.div>
        </Card>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            data-testid="button-download"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Kartu Ucapan
          </Button>

          <Button
            onClick={toggleAudio}
            variant="outline"
            className="sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary py-6 rounded-xl font-semibold"
            data-testid="button-audio-toggle"
          >
            <Music className="w-5 h-5 mr-2" />
            {isPlaying ? "Pause Musik" : "Play Musik"}
          </Button>
        </motion.div>

        <audio
          ref={audioRef}
          src="https://huggingface.co/datasets/joyokilat/hanya_suara/resolve/main/Jamrud%20-%20Selamat%20Ulang%20Tahun%20(lyrics).mp3"
          loop
        />
      </div>
    </motion.div>
  );
}
