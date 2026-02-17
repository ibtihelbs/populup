import { PAST_EVENTS_QUERY } from "../sanity/sanityConfig";
import EventUI from "../components/EventUI";
import { api } from "../sanity/api";
const page = async () => {
  const events = await api<any[]>({
    query: PAST_EVENTS_QUERY,
    revalidate: 60,
  });

  return <EventUI events={events} current={false} />;
};

export default page;
