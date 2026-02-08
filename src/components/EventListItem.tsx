import type { FC } from "react";
import type { Event } from "../types";

interface IEventListItemProps {
  event: Event;
}
export const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  return (
    <li className="border-2 p-5">
      <p>{event._embedded.production?.title}</p> <p>{event.startDate}</p>
    </li>
  );
};
