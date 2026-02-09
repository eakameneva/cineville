import type { FC } from "react";
import type { Event } from "../types";
import { format } from "date-fns";
import placeholderPoster from "../assets/placeholderPoster.png";
import { Link } from "react-router";

interface IEventListItemProps {
  event: Event;
}
export const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  return (
    <li className="bg-white p-4 shadow hover:shadow-lg transition-shadow cursor-pointer flex gap-5">
      <Link to={`details/${event.id}`}>
        <img
          className="max-w-2xs aspect-video object-cover"
          src={
            event._embedded.production?.assets?.cover?.url
              ? event._embedded.production.assets.cover.url
              : placeholderPoster
          }
          alt="Cover"
        />
        <div>
          <h3>{event._embedded.production?.title}</h3>
          <p>{format(event.startDate, "HH:mm")}</p>
          <p>{event._embedded.venue?.name}</p>
        </div>
      </Link>
    </li>
  );
};
