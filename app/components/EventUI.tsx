"use client";

import Link from "next/link";

type Event = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  isOneTimeEvent: boolean;
  date?: string;
  startDate?: string;
  duration?: string;
  price: number;
  spotsRemaining?: number;
  spotsAvailable?: number;
  isSoldOut?: boolean;
  googleFormUrl?: string;
};

type EventUIProps = {
  events: Event[];
  current?: boolean;
};

const EventListEditorial = ({ events, current }: EventUIProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
    };
  };

  const formatTime = (dateString: string, duration?: string) => {
    const date = new Date(dateString);
    const startTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (duration) {
      const durationMatch = duration.match(/(\d+)/);
      if (durationMatch) {
        const hours = parseInt(durationMatch[1]);
        const endDate = new Date(date.getTime() + hours * 60 * 60 * 1000);
        const endTime = endDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${startTime} – ${endTime}`;
      }
    }

    return startTime;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div className="space-y-0">
        {events.map((event) => {
          const eventDate = event.isOneTimeEvent ? event.date : event.startDate;
          const { month, day, dayOfWeek } = eventDate
            ? formatDate(eventDate)
            : { month: "", day: 0, dayOfWeek: "" };
          const timeRange = eventDate
            ? formatTime(eventDate, event.duration)
            : "";
          const isSoldOut = event.isSoldOut || event.spotsRemaining === 0;
          const spotsText = event.spotsRemaining
            ? `${event.spotsRemaining} spots`
            : event.spotsAvailable
              ? `${event.spotsAvailable} spots`
              : "";

          return (
            <article
              key={event._id}
              className="border-b border-gray-200 py-6 md:py-8 first:pt-0 last:border-0"
            >
              {/* MOBILE LAYOUT */}
              <div className="md:hidden space-y-4">
                <div className="flex items-center gap-3">
                  {/* Blue box with month */}
                  <div className="bg-[#4169E1] text-white px-2 py-0.5 font-heading text-sm font-medium">
                    {month}
                  </div>
                  <span className="font-heading text-4xl leading-none text-foreground">
                    {day}
                  </span>
                  <span className="font-body text-sm text-gray-500">
                    {dayOfWeek}
                  </span>
                </div>

                <h3 className="font-heading text-2xl text-foreground">
                  {event.title}
                </h3>

                <p className="font-body text-gray-600 leading-relaxed text-sm">
                  {event.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <p className="font-body text-sm text-gray-700">
                      {timeRange}
                    </p>
                    <p className="font-body text-sm text-gray-600">
                      {spotsText}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-body text-lg font-medium text-[#B85C38]">
                      {event.price} TND
                    </p>
                    {event.googleFormUrl && !isSoldOut && (
                      <a
                        href={event.googleFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block font-body text-sm text-gray-700 hover:text-foreground transition-colors"
                      >
                        Reserve your spot
                      </a>
                    )}
                    {isSoldOut && (
                      <p className="font-body text-sm text-gray-400">
                        Sold out
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* DESKTOP LAYOUT */}
              <div className="hidden md:grid md:grid-cols-[160px_1fr_200px] md:gap-8 md:items-start">
                {/* LEFT: Date with blue box */}
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Blue box with month */}
                    <div className="bg-[#4169E1] text-white px-3 py-1 font-heading text-base font-medium">
                      {month}
                    </div>
                    <span className="font-heading text-5xl leading-none text-foreground">
                      {day}
                    </span>
                  </div>
                  <p className="font-body text-sm text-gray-500 mt-1">
                    {dayOfWeek}
                  </p>
                </div>

                {/* MIDDLE: Content */}
                <div>
                  <h3 className="font-heading text-3xl text-foreground mb-4">
                    {event.title}
                  </h3>
                  <p className="font-body text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* RIGHT: Details */}
                <div className="text-right space-y-2">
                  <p className="font-body text-sm text-gray-700">{timeRange}</p>
                  <p className="font-body text-lg font-medium text-[#B85C38]">
                    {event.price} TND
                  </p>
                  {current ? (
                    <>
                      <p className="font-body text-sm text-gray-600">
                        {spotsText}
                      </p>
                      {event.googleFormUrl && !isSoldOut && (
                        <a
                          href={event.googleFormUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block font-body text-sm text-gray-700 hover:text-foreground transition-colors mt-2"
                        >
                          Reserve your spot
                        </a>
                      )}
                      {isSoldOut && (
                        <p className="font-body text-sm text-gray-400">
                          Sold out
                        </p>
                      )}
                    </>
                  ) : (
                    <Link
                      href={`/events/${event.slug.current}`}
                      className="font-body text-sm text-gray-700 hover:text-foreground transition-colors mt-2"
                    >
                      View event details
                    </Link>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default EventListEditorial;
