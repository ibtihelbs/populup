import type { Metadata } from "next";
import { body, cursive } from "./sanity/fonts";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { api } from "./sanity/api";
import { ACTIVE_THEME_QUERY } from "./sanity/sanityConfig";

type seoType = {
  title: string;
  description: string;
  keywords: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const { seo }: { seo: seoType } = await api({
    query: `*[_type == "home"][0]{ seo { title, description, keywords } }`,
  });

  return {
    title: seo?.title || "Creative Workshops & Pop-Ups in Tunis",
    description:
      seo?.description ||
      "Discover a creative space in Tunis offering workshops, pop-ups, and intimate events for women.",
    keywords: seo?.keywords || "creative workshops, pop-ups, events, Tunis",
  };
}

const {
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
} = await api({
  query: ACTIVE_THEME_QUERY,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--primary": primaryColor,
            "--secondary": secondaryColor,
            "--accent": accentColor,
          } as React.CSSProperties
        }
        className={`${body.variable} ${cursive.variable} antialiased  `}
      >
        <Nav />
        <main className="min-h-[80vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
