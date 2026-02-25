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

    // Convert Sunday (0) → 6, Monday (1) → 0, Tuesday (2) → 1 ...
    const getMondayBasedDay = (d: Date) => {
      const day = d.getDay();
      return (day + 6) % 7;
    };

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayIndex = getMondayBasedDay(firstDayOfMonth);

    const weekNumber = Math.ceil((date.getDate() + firstDayIndex) / 7);

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

  const EventCard = ({ event }: { event: Event }) => {
    const eventDate = getEventDate(event)!;
    const { day } = formatDate(eventDate);

    return (
      <Link
        href={`/events/${event.slug.current}`}
        className="block border border-gray-200 p-4 mb-4 bg-white rounded hover:shadow-md transition-all duration-200 hover:border-accent"
      >
        <div className="text-xs text-gray-400 mb-1">{day}</div>

        <h4 className="font-heading text-lg text-accent mb-2">{event.title}</h4>

        <p className="text-sm text-gray-600 mb-2">{event.price} TND</p>

        <span className="text-sm text-gray-500 hover:text-accent">
          View event details →
        </span>
      </Link>
    );
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {Object.entries(groupedEvents).map(([month, weeks]) => (
        <div key={month} className="mb-16">
          {/* MONTH HEADER */}
          <h2 className="text-3xl font-heading text-accent mb-8">{month}</h2>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(weeks).map(([week, weekEvents]) => {
              const fridayEvents: Event[] = [];
              const saturdayEvents: Event[] = [];
              const sundayEvents: Event[] = [];

              weekEvents.forEach((event) => {
                const eventDate = new Date(getEventDate(event)!);
                const day = eventDate.getDay();

                if (day === 5) fridayEvents.push(event); // Friday
                if (day === 6) saturdayEvents.push(event); // Saturday
                if (day === 0) sundayEvents.push(event); // Sunday
              });

              return (
                <div key={week} className="mb-16">
                  <h3 className="text-lg text-gray-500 mb-6">{week}</h3>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* FRIDAY */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-4">
                        Friday
                      </h4>

                      {fridayEvents.length === 0 && (
                        <p className="text-sm text-gray-300">No events</p>
                      )}

                      {fridayEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>

                    {/* SATURDAY */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-4">
                        Saturday
                      </h4>

                      {saturdayEvents.length === 0 && (
                        <p className="text-sm text-gray-300">No events</p>
                      )}

                      {saturdayEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>

                    {/* SUNDAY */}
                    <div>
                      <h4 className="text-sm uppercase tracking-wide text-gray-400 mb-4">
                        Sunday
                      </h4>

                      {sundayEvents.length === 0 && (
                        <p className="text-sm text-gray-300">No events</p>
                      )}

                      {sundayEvents.map((event) => (
                        <EventCard key={event._id} event={event} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListEditorial;
