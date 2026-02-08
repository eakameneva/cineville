import type { FC } from "react";
import type { Event } from "../types";

interface IEventListItemProps {
  event: Event;
}
export const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  return <li className="border-2 p-5">{event._embedded.production?.title}</li>;
};
