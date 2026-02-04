"use client";
import Image from "next/image";

type EventUIProps = {
  events: any[];
};

const EventUI = ({ events }: EventUIProps) => {
  return (
    <section className="space-y-6">
      {events.map((event: any) => (
        <article key={event._id} className="border p-4 rounded-lg">
          {/* IMAGE */}
          {event.image?.asset?.url && (
            <Image
              src={event.image.asset.url}
              alt={event.title}
              width={600}
              height={400}
              className="rounded-md"
            />
          )}

          <h3 className="mt-3 text-xl font-semibold">{event.title}</h3>

          {/* TIME */}
          <p className="text-sm text-gray-500">
            {new Date(event.startDate).toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
          {/* LINK */}
          {event.googleFormUrl && (
            <a
              href={event.googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 underline"
            >
              Reserve spot →
            </a>
          )}
        </article>
      ))}
    </section>
  );
};

export default EventUI;
