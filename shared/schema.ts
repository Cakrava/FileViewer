import { z } from "zod";

// Birthday form data
export const birthdayDataSchema = z.object({
  birthDate: z.string().min(1, "Tanggal lahir harus diisi"),
  personalMessage: z.string().min(10, "Ucapan pribadi minimal 10 karakter"),
  wordGame1: z.string().min(10, "Kata harus lengkap"),
  wordGame2: z.string().min(10, "Kata harus lengkap"),
  wordGame3: z.string().min(10, "Kata harus lengkap"),
});

export type BirthdayData = z.infer<typeof birthdayDataSchema>;

// Quote interface
export interface Quote {
  id: number;
  text: string;
  author: string;
}

// Section state
export interface SectionState {
  currentSection: number;
  birthdayData: Partial<BirthdayData>;
  viewedQuotes: number[];
  age?: number;
}
