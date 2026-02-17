import { api } from "../sanity/api";
import { UPCOMING_EVENTS_QUERY } from "../sanity/sanityConfig";
import EventUI from "./EventUI";
import Link from "next/link";
const Events = async () => {
  const events = await api<any[]>({
    query: UPCOMING_EVENTS_QUERY,
    revalidate: 60,
  });

  return (
    <section className="min-h-[30vh]">
      <h1 className="text-3xl font-bold text-center mb-6 font-heading">
        Upcoming Events
      </h1>
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
