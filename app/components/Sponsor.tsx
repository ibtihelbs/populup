import { api } from "../sanity/api";
import { SPONSORS_QUERY } from "../sanity/sanityConfig";
import H1 from "./core/H1";

export default async function Sponsors() {
  const sponsors = await api<any[]>({
    query: SPONSORS_QUERY,
    revalidate: 60,
  });
  return (
    <section className="flex flex-col items-center justify-center py-2 gap-2">
      <H1 content="Our Sponsors" />
      <div className="flex gap-2 h-14 bg-red-400 w-full justify-center">
        {sponsors.map((s: any) => (
          <a key={s.name} href={s.website} target="_blank">
            <img src={s.logo} alt={s.name} className="h-14 object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}
