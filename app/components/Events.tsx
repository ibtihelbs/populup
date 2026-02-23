import { api } from "../sanity/api";
import H1 from "./core/H1";
import {
  UPCOMING_EVENTS_QUERY,
  ACTIVE_THEME_QUERY,
} from "../sanity/sanityConfig";
import EventUI from "./EventUI";
import Link from "next/link";
type Theme = {
  name: string;
};
const Events = async () => {
  const events = await api<any[]>({
    query: UPCOMING_EVENTS_QUERY,
    revalidate: 60,
  });

  const theme = await api<Theme>({
    query: ACTIVE_THEME_QUERY,
    revalidate: 60,
  });
  return (
    <section className="min-h-[80vh] pt-16" id="upcoming-events">
      <H1 content="Upcoming Events" />
      <h2 className="  text-center text-3xl font-cursive">{theme?.name}</h2>
      {events.length > 0 ? (
        <EventUI events={events} current={true} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>no upcoming event</p>
          <Link href="/events">View all events</Link>
        </div>
      )}
    </section>
  );
};

export default Events;
