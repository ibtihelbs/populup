// components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* BRAND */}
          <div>
            <p className="text-lg font-medium tracking-tight">Atelier</p>
            <p className="mt-3 max-w-xs text-sm text-zinc-600 dark:text-zinc-400">
              A creative pop-up & workshop space for women in Tunis.
              Thoughtfully curated, slow, and community-driven.
            </p>
          </div>

          {/* NAV */}
          <div>
            <p className="mb-4 text-sm font-medium">Explore</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/events" className="hover:underline">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* LEGAL / META */}
          <div>
            <p className="mb-4 text-sm font-medium">Info</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} Atelier. All rights reserved.</p>
          <p>Designed & built with care.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
