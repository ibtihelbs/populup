import { api } from "../sanity/api";
import { UPCOMING_EVENTS_QUERY } from "../sanity/sanityConfig";
import EventUI from "./EventUI";

const Events = async () => {
  const events = await api<any[]>({
    query: UPCOMING_EVENTS_QUERY,
    revalidate: 60,
  });

  return <EventUI events={events} />;
};

export default Events;
