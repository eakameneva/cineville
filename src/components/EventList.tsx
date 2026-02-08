import type { FC } from "react";
import type { Event } from "../types";
import { EventListItem } from "./EventListItem";
interface IEventListProps {
  events: Event[];
}

export const EventList: FC<IEventListProps> = ({ events }) => {
  return (
    <ul className="p-6">
      {events.map((event) => {
        return <EventListItem key={event.id} event={event} />;
      })}
    </ul>
  );
};
