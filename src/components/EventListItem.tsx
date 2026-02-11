import type { FC } from "react";
import type { Event } from "../types";
import { format } from "date-fns";
import placeholderPoster from "../assets/placeholderPoster.png";
import { Link } from "react-router";

interface IEventListItemProps {
  event: Event;
}
export const EventListItem: FC<IEventListItemProps> = ({ event }) => {
  const { production, venue } = event._embedded;

  if (!production) {
    return null;
  }

  const { assets, title } = production;

  return (
    <li className="bg-white rounded-lg shadow hover:shadow-lg">
      <Link
        to={`details/${event.id}`}
        className="flex gap-4 p-4 no-underline text-inherit"
      >
        <img
          className="w-24 h-16 sm:w-52 sm:h-32 object-cover rounded shrink-0"
          src={assets?.cover?.url || placeholderPoster}
          alt={`${title} poster`}
        />

        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600">
            {format(event.startDate, "HH:mm")}
          </p>
          <p className="text-sm text-gray-600">{venue?.name}</p>
        </div>
      </Link>
    </li>
  );
};
