import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/requests";
import { EventList } from "../components/EventList";
import { useState } from "react";
import { EventFilters } from "../components/EventFilters";

export const SchedulePage = () => {
  const [dateFilterValue, setDateFilterValue] = useState(new Date());

  const { data: events = [] } = useQuery({
    queryKey: ["events", dateFilterValue],
    queryFn: () => getAllEvents(dateFilterValue),
  });
  console.log(events);
  return (
    <div>
      Schedule page
      <EventFilters
        dateFilterValue={dateFilterValue}
        onDateFilterValueChange={setDateFilterValue}
      />
      <EventList events={events} />
    </div>
  );
};
