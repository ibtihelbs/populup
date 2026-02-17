import { api } from "../sanity/api";
import { SPONSORS_QUERY } from "../sanity/sanityConfig";

export default async function Sponsors() {
  const sponsors = await api<any[]>({
    query: SPONSORS_QUERY,
    revalidate: 60,
  });
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="col-span-2 md:col-span-4 text-center text-xl font-heading font-bold">
        Our Sponsors
      </h1>
      <div className="flex gap-2">
        {sponsors.map((s: any) => (
          <a key={s.name} href={s.website} target="_blank">
            <img src={s.logo} alt={s.name} className="h-20 object-contain" />
          </a>
        ))}
      </div>
    </section>
  );
}
