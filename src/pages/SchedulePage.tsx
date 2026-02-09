import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/requests";
import { EventList } from "../components/EventList";
import { useState } from "react";
import { EventFilters } from "../components/EventFilters";
import type { Event } from "../types";
import { EventSearch } from "../components/EventSearch";

const sortEvents = (events: Event[]) => {
  const sortedEvents = [...events];

  sortedEvents.sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });
  return sortedEvents;
};

const getEventsWithProduction = (events: Event[]) => {
  return events.filter((event) => {
    return event._embedded.production;
  });
};

const transformEvents = (events: Event[] = []) => {
  const filteredEvents = getEventsWithProduction(events);
  return sortEvents(filteredEvents);
};

const filterEventsBySearch = (value: string, events: Event[]) => {
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

  const { data: events = [] } = useQuery({
    queryKey: ["events", dateFilterValue],
    queryFn: () => getAllEvents(dateFilterValue),
    select: transformEvents,
  });

  const handleSearchValueChange = (value: string) => {
    const foundEvents = filterEventsBySearch(value, events);
    console.log(foundEvents, value, events);
    setSearchValue(value);
    setFilteredEventsBySearch(foundEvents);
  };

  return (
    <div className="py-7 bg-[#fffbf4] min-h-screen">
      Schedule page
      <EventFilters
        dateFilterValue={dateFilterValue}
        onDateFilterValueChange={setDateFilterValue}
      />
      <EventSearch
        searchValue={searchValue}
        onChange={handleSearchValueChange}
      ></EventSearch>
      <EventList events={searchValue ? filteredEventsBySearch : events} />
    </div>
  );
};
