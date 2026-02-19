import ContactForm from "./components/Contact";
import Events from "./components/Events";
import Hero from "./components/Hero";

import Sponsors from "./components/Sponsor";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Sponsors />
      <Events />
      <ContactForm />
    </main>
  );
}
