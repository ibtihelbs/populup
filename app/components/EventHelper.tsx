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

/* ---------------- HELPER FUNCTIONS ---------------- */

const getEventDate = (event: Event) => {
  return event.isOneTimeEvent ? event.date : event.startDate;
};

const groupEventsByMonthAndWeek = (events: Event[]) => {
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(getEventDate(a) || "").getTime();
    const dateB = new Date(getEventDate(b) || "").getTime();
    return dateA - dateB;
  });

  const grouped: Record<string, Record<string, Event[]>> = {};

  sorted.forEach((event) => {
    const dateStr = getEventDate(event);
    if (!dateStr) return;

    const date = new Date(dateStr);

    const monthKey = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const weekNumber = Math.ceil(
      (date.getDate() + firstDayOfMonth.getDay()) / 7,
    );

    const weekKey = `Week ${weekNumber}`;

    if (!grouped[monthKey]) grouped[monthKey] = {};
    if (!grouped[monthKey][weekKey]) grouped[monthKey][weekKey] = [];

    grouped[monthKey][weekKey].push(event);
  });

  return grouped;
};

/* ---------------- COMPONENT ---------------- */

const EventListEditorial = ({ events, current }: EventUIProps) => {
  const groupedEvents = groupEventsByMonthAndWeek(events);

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
      {Object.entries(groupedEvents).map(([month, weeks]) => (
        <div key={month} className="mb-16">
          {/* MONTH HEADER */}
          <h2 className="text-3xl font-heading text-accent mb-8">{month}</h2>

          {Object.entries(weeks).map(([week, weekEvents]) => (
            <div key={week} className="mb-10">
              {/* WEEK HEADER */}
              <h3 className="text-lg font-body text-gray-500 mb-6">{week}</h3>

              {weekEvents.map((event) => {
                const eventDate = getEventDate(event);
                if (!eventDate) return null;

                const { month, day, dayOfWeek } = formatDate(eventDate);
                const timeRange = formatTime(eventDate, event.duration);

                const isSoldOut = event.isSoldOut || event.spotsRemaining === 0;

                const spotsText = event.spotsRemaining
                  ? `${event.spotsRemaining} spots`
                  : event.spotsAvailable
                    ? `${event.spotsAvailable} spots`
                    : "";

                return (
                  <article
                    key={event._id}
                    className="border-b border-gray-200 py-6 md:py-8 last:border-0"
                  >
                    {/* MOBILE */}
                    <div className="md:hidden space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary text-white px-2 py-0.5 font-heading text-sm font-medium">
                          {month}
                        </div>
                        <span className="font-heading text-4xl leading-none text-accent">
                          {day}
                        </span>
                        <span className="font-body text-sm text-black">
                          {dayOfWeek}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl text-accent">
                        {event.title}
                      </h3>

                      <p className="font-body text-gray-600 text-sm">
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

                          {event.googleFormUrl && !isSoldOut && current ? (
                            <a
                              href={event.googleFormUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm hover:text-accent"
                            >
                              Reserve your spot
                            </a>
                          ) : (
                            <Link
                              href={`/events/${event.slug.current}`}
                              className="text-sm hover:text-accent"
                            >
                              View event details
                            </Link>
                          )}

                          {isSoldOut && current && (
                            <p className="text-sm text-gray-400">Sold out</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden md:grid md:grid-cols-[160px_1fr_200px] md:gap-8 md:items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-secondary text-white px-3 py-1 font-heading text-base font-medium">
                            {month}
                          </div>
                          <span className="font-heading text-5xl leading-none text-accent">
                            {day}
                          </span>
                        </div>
                        <p className="font-body text-sm text-black mt-1">
                          {dayOfWeek}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-heading text-3xl text-accent mb-4">
                          {event.title}
                        </h3>
                        <p className="font-body text-gray-600">
                          {event.description}
                        </p>
                      </div>

                      <div className="text-right space-y-2">
                        <p className="text-sm text-gray-700">{timeRange}</p>
                        <p className="text-lg font-medium text-[#B85C38]">
                          {event.price} TND
                        </p>

                        {current ? (
                          <>
                            <p className="text-sm text-gray-600">{spotsText}</p>

                            {event.googleFormUrl && !isSoldOut && (
                              <a
                                href={event.googleFormUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-sm hover:text-accent"
                              >
                                Reserve your spot
                              </a>
                            )}

                            {isSoldOut && (
                              <p className="text-sm text-gray-400">Sold out</p>
                            )}
                          </>
                        ) : (
                          <Link
                            href={`/events/${event.slug.current}`}
                            className="text-sm hover:text-accent"
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
          ))}
        </div>
      ))}
    </div>
  );
};

export default EventListEditorial;
