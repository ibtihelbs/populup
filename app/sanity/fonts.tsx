// fonts.ts
import {
  Ballet,
  Courier_Prime,
  Playfair_Display,
  DM_Sans,
} from "next/font/google";
//import { fonts } from "./api";
const CourierPrime = Courier_Prime({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Balletfnt = Ballet({
  variable: "--font-cursive",
  subsets: ["latin"],
});

const PlayfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const DMSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export { PlayfairDisplay as body, Balletfnt as cursive };
