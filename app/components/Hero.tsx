import Link from "next/link";
import { api } from "../sanity/api";
import { HOME_QUERY } from "../sanity/sanityConfig";
import ImageComponent from "./ImageComponent";
type Home = {
  heroTitle: string;
  heroSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  heroImage: string;
  googleFormUrl: string;
};

const Hero = async () => {
  const home: Home = await api({ query: HOME_QUERY });
  return (
    <section className=" min-h-screen grid md:grid-cols-3 items-center justify-center px-6 relative">
      <div className="md:col-span-2 absolute md:static text-center md:text-left z-10">
        <h1 className="mb-4 text-6xl font-bolder font-heading text-accents max-w-2xl">
          {home?.heroTitle}
        </h1>

        <p className="mb-8 max-w-xl text-zinc-600">{home?.heroSubtitle}</p>

        <div className="flex gap-4">
          <Link
            href={home.googleFormUrl}
            target="_blank"
            className="rounded-full  px-6 py-3 text-white bg-accent"
          >
            {home?.primaryCTA}
          </Link>

          <a
            href="../#upcoming-events"
            className="rounded-full border px-6 py-3"
          >
            {home?.secondaryCTA}
          </a>
        </div>
      </div>
      <div className="relative  h-screen w-screen md:h-full md:w-full opacity-50 bg-red-300 md:bg-transparent">
        <ImageComponent img={home?.heroImage} alt={home.heroSubtitle} />
      </div>
    </section>
  );
};

export default Hero;
