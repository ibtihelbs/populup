import { api } from "../../sanity/api";
interface Event {
  title: string;
  description: string;
  date: string;
  duration: string;
  location: string;
  price: number;
  spotsAvailable: number;
  requirements: string[];
  whatsIncluded: string[];
  googleFormUrl: string;
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const PAST_EVENTS_QUERY = `
*[_type == "event" && slug.current == "${slug}"
][0]

`;
  const event: Event = await api<Event>({
    query: PAST_EVENTS_QUERY,
    revalidate: 60,
  });
  console.log(slug, event);
  return (
    <div className="max-w-3xl mx-auto p-6 md:mt-1/5 bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Title */}
      <h1 className="text-3xl font-bold text-purple-600 mb-4">{event.title}</h1>

      {/* Event Info */}
      <div className="flex flex-col sm:flex-row sm:justify-between mb-6 text-gray-700">
        <div>
          <p>
            <span className="font-semibold">Date:</span> {event.date}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {event.duration}
          </p>
          <p>
            <span className="font-semibold">Location:</span> {event.location}
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p>
            <span className="font-semibold">Price:</span> {event.price} dt
          </p>
          <p>
            <span className="font-semibold">Spots Available:</span>{" "}
            {event.spotsAvailable}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 text-gray-800">{event.description}</div>

      {/* Requirements */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {event.requirements.map((req, idx) => (
            <li key={idx}>{req}</li>
          ))}
        </ul>
      </div>

      {/* What's Included */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">What's Included</h2>
        <ul className="list-disc list-inside text-gray-700">
          {event.whatsIncluded.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
