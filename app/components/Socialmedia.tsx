// components/SocialMedia.tsx
import { api } from "../sanity/api";
import { SOCIALS_QUERY } from "../sanity/sanityConfig";
import { urlFor } from "../sanity/imageCov";
import { Icons } from "./ImageComponent";
import Link from "next/link";

type Social = {
  platform: string;
  url: string;
  icon: {
    light: any;
    dark: any;
    alt: string;
  };
};

type Theme = "light" | "dark"; // if you detect server theme differently, adjust

const SocialMedia = async ({ className }: { className?: string }) => {
  const socials = await api<Social[] | null>({
    query: SOCIALS_QUERY,
    revalidate: 60,
  });
  return (
    <section className={`flex gap-4  ${className}`}>
      {socials?.map((s) => (
        <Link
          key={s.platform}
          href={s.url}
          target="_blank"
          aria-label={s.icon.alt}
          className="group"
        >
          {/* Light Mode */}
          <Icons
            img={s.icon.light}
            alt={s.icon.alt}
            className="block dark:hidden transition group-hover:scale-110"
          />

          {/* Dark Mode */}
          <Icons
            img={s.icon.dark}
            alt={s.icon.alt}
            className="hidden dark:block transition group-hover:scale-110"
          />
        </Link>
      ))}
    </section>
  );
};

export default SocialMedia;
