import { api } from "../sanity/api";
import { HOME_QUERY } from "../sanity/sanityConfig";
import ImageComponent from "./ImageComponent";
type Home = {
  heroTitle: string;
  heroSubtitle: string;
  primaryCTA: string;
  secondaryCTA: string;
  heroImage: string;
};

const Hero = async () => {
  const home: Home = await api({ query: HOME_QUERY });
  const homes: Home = await api({ query: `*[_type == "home"]{heroImage}` });

  return (
    <section className=" min-h-screen grid grid-cols-3 items-center justify-center px-6 ">
      <div className="col-span-2">
        <h1 className="mb-4 text-6xl font-bolder font-heading text-accents max-w-2xl">
          {home?.heroTitle}
        </h1>

        <p className="mb-8 max-w-xl text-zinc-600">{home?.heroSubtitle}</p>

        <div className="flex gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdq4rmMksRJGrqQdccSCfSuYqbqDFmp3kc-DxbIgVb2cbWptw/viewform?usp=sf_link"
            target="_blank"
            className="rounded-full  px-6 py-3 text-white"
          >
            {home?.primaryCTA}
          </a>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdq4rmMksRJGrqQdccSCfSuYqbqDFmp3kc-DxbIgVb2cbWptw/viewform?usp=sf_link"
            target="_blank"
            className="rounded-full border px-6 py-3"
          >
            {home?.secondaryCTA}
          </a>
        </div>
      </div>
      <div className="relative bg-amber-600 h-full">
        <ImageComponent img={home?.heroImage} alt={home.heroSubtitle} />
      </div>
    </section>
  );
};

export default Hero;
