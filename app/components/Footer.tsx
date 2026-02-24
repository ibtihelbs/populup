// components/Footer.tsx
import Link from "next/link";
import SocialMedia from "./Socialmedia";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="border-t  bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* BRAND */}
          <div className="space-y-4">
            <Image
              src="/logo.jpg"
              alt="logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <p className="max-w-xs text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              A creative pop-up & workshop space for women in Tunis.
              Thoughtfully curated, slow, and community-driven.
            </p>
          </div>

          {/* NAV */}
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              Explore
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIALS */}
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
              Connect
            </p>
            <SocialMedia dark={true} />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800" />

        {/* BOTTOM BAR */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} Atelier. All rights reserved.</p>

          <p className="flex items-center gap-1">
            Designed & built by
            <a
              href="https://www.linkedin.com/in/ibtihel-ben-salah"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-black dark:hover:text-white transition"
            >
              Ibtihel Ben Salah
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
