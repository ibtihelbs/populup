// fonts.ts
import { Geist_Mono, Ballet, Courier_Prime } from "next/font/google";

const body = Courier_Prime({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cursive = Ballet({
  variable: "--font-cursive",
  subsets: ["latin"],
});
export { body, cursive };
