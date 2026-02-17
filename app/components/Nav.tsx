import Link from "next/link";
import Image from "next/image";
const Nav = () => {
  return (
    <header className="fixed top-0 z-50 w-full bg-zinc-50/80 backdrop-blur ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link href="/" className="text-lg font-medium tracking-tight">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>

        {/* LOCAL NAVIGATION */}
        <ul className="flex items-center gap-8 text-sm">
          <li>
            <Link href="/" className="hover:underline">
              home
            </Link>
          </li>
          <li>
            <Link href="/events" className="hover:underline">
              Events
            </Link>
          </li>

          <li>
            <Link href="/#contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
