import { useQuery } from "@tanstack/react-query";
import { getAllEvents } from "../api/requests";
import { EventList } from "../components/EventList";

export const SchedulePage = () => {
  const { data: events = [] } = useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  console.log(events);
  return (
    <div>
      Schedule page
      <EventList events={events}></EventList>
    </div>
  );
};
