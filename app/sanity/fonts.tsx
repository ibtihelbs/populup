// fonts.ts

import {
  Ballet,
  Courier_Prime,
  Playfair_Display,
  DM_Sans,
} from "next/font/google";
import { getFormattedFonts } from "./api";

/* ------------------ INIT GOOGLE FONTS (STATIC) ------------------ */

const BalletFont = Ballet({
  variable: "--font-cursive",
  subsets: ["latin"],
});

const CourierPrimeFont = Courier_Prime({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const PlayfairFont = Playfair_Display({
  variable: "--font-cursive",
  subsets: ["latin"],
});

const DMSansFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

/* ------------------ FONT MAP (NAME → INSTANCE) ------------------ */

const googleFontsMap: Record<string, any> = {
  Ballet: BalletFont,
  Courier_Prime: CourierPrimeFont,
  Playfair_Display: PlayfairFont,
  DM_Sans: DMSansFont,
};

/* ------------------ MAIN FUNCTION ------------------ */

async function getThemeFonts() {
  const sanityFonts = await getFormattedFonts();

  return {
    // heading in Sanity will be used as cursive
    cursive: googleFontsMap[sanityFonts?.heading] ?? BalletFont,

    // body in Sanity will be used as body
    body: googleFontsMap[sanityFonts?.body] ?? CourierPrimeFont,
  };
}

const { body, cursive } = await getThemeFonts();

async function testFonts() {
  const { body, cursive } = await getThemeFonts();

  console.log(body, cursive);
}

testFonts();
export { body, cursive };
