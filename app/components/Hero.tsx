import { api } from "../sanity/api";
import { HOME_QUERY } from "../sanity/sanityConfig";
type Home = {
  heroTitle: string;
  heroSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
};

const Hero = async () => {
  const home: Home = await api({ query: HOME_QUERY });

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-4xl font-medium ">{home?.heroTitle}</h1>

      <p className="mb-8 max-w-xl text-zinc-600">{home?.heroSubtitle}</p>

      <div className="flex gap-4">
        <a href="/events" className="rounded-full  px-6 py-3 text-white">
          {home?.primaryCTA}
        </a>

        <a href="#reserve" className="rounded-full border px-6 py-3">
          {home?.secondaryCTA}
        </a>
      </div>
    </section>
  );
};

export default Hero;
