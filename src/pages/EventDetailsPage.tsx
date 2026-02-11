import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getEvent } from "../api/requests";
import { EventDetails } from "../components/EventDetails";

export const EventDetailsPage = () => {
  const { eventId = "" } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
    enabled: !!eventId,
  });

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }
  if (isError) {
    return <div className="text-center py-12">Error: {error.message}</div>;
  }
  if (!event) {
    return <div className="text-center py-12">Event Not Found</div>;
  }

  return (
    <div className="min-h-screen bg-[#fffbf4]">
      <EventDetails event={event} />
    </div>
  );
};
