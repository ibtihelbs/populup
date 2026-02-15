export default function Sponsors({ sponsors }: any) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {sponsors.map((s: any) => (
        <a key={s.name} href={s.website} target="_blank">
          <img src={s.logo} alt={s.name} className="h-20 object-contain" />
        </a>
      ))}
    </section>
  );
}
