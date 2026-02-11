import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/requests";
import { EventList } from "../components/EventList";
import { useState } from "react";
import { EventFilters } from "../components/EventFilters";
import type { Event } from "../types";
import { EventSearch } from "../components/EventSearch";

const sortEvents = (events: Event[]): Event[] => {
  return events.toSorted((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
};

const getEventsWithProduction = (events: Event[]) => {
  return events.filter((event) => event._embedded.production);
};

const transformEvents = (events: Event[]): Event[] => {
  const filteredEvents = getEventsWithProduction(events);
  return sortEvents(filteredEvents);
};

const filterEventsBySearch = (value: string, events: Event[]) => {
  if (!value.trim()) return events;

  return events.filter((event) => {
    return event._embedded.production?.title
      .toLowerCase()
      .includes(value.toLowerCase());
  });
};

export const SchedulePage = () => {
  const [dateFilterValue, setDateFilterValue] = useState(new Date());
  const [filteredEventsBySearch, setFilteredEventsBySearch] = useState<Event[]>(
    []
  );
  const [searchValue, setSearchValue] = useState("");

  const {
    data: events = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", dateFilterValue],
    queryFn: () => getAllEvents(dateFilterValue),
    select: transformEvents,
  });

  const handleSearchValueChange = (value: string) => {
    const foundEvents = filterEventsBySearch(value, events);
    setSearchValue(value);
    setFilteredEventsBySearch(foundEvents);
  };

  const handleDateFilterChange = (value: Date) => {
    setDateFilterValue(value);
    setSearchValue("");
  };

  const eventsToShow = searchValue ? filteredEventsBySearch : events;

  const renderEventList = () => {
    if (isLoading) {
      return <div className="text-center py-12">Loading...</div>;
    }
    if (isError) {
      return <div className="text-center py-12">Error: {error.message}</div>;
    }
    if (!eventsToShow.length) {
      return <div className="text-center py-12">No results</div>;
    }
    return <EventList events={eventsToShow} />;
  };

  return (
    <div className="min-h-screen bg-[#fffbf4]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 pt-8 px-6 mb-4 max-w-4xl mx-auto">
          Cinema Schedule
        </h1>

        <EventFilters
          dateFilterValue={dateFilterValue}
          onDateFilterValueChange={handleDateFilterChange}
        />

        <EventSearch
          searchValue={searchValue}
          onChange={handleSearchValueChange}
        />

        {renderEventList()}
      </div>
    </div>
  );
};
