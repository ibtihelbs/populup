import ContactForm from "./components/Contact";
import Events from "./components/Events";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Events />
      <ContactForm />
    </main>
  );
}
