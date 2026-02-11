import type { FC } from "react";
import type { Event } from "../types";
import { format } from "date-fns";
import placeholderPoster from "../assets/placeholderPoster.png";
import { formatLanguages } from "../utils";
import { Link } from "react-router";

interface IEventDetailsProps {
  event: Event;
}

export const EventDetails: FC<IEventDetailsProps> = ({ event }) => {
  const { production, venue } = event._embedded;
  const { startDate, attributes } = event;

  if (!production) return null;

  const { title, assets, localizableAttributes } = production;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="inline-block mb-6 font-medium">
        ← Back to schedule
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Show details</h1>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <img
          className="w-full max-w-2xl aspect-video object-cover mb-6 mx-auto"
          src={assets?.cover?.url || placeholderPoster}
          alt={`${title} poster`}
        />

        <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>

        <div className=" text-gray-700 flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <p>
              {format(startDate, "d MMMM")} {format(startDate, "HH:mm")}
            </p>

            {production.attributes.duration && (
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {production.attributes.duration} minutes
              </p>
            )}

            {!!production.attributes.spokenLanguages?.length && (
              <p>
                <span className="font-semibold">Language:</span>{" "}
                {formatLanguages(production?.attributes.spokenLanguages)}
              </p>
            )}
            {!!attributes.subtitles?.length && (
              <p>
                <span className="font-semibold">Subtitles:</span>{" "}
                {formatLanguages(attributes.subtitles)}
              </p>
            )}

            {!!production.attributes.directors?.length && (
              <p>
                <span className="font-semibold">Directed by:</span>{" "}
                {production.attributes.directors.join(", ")}
              </p>
            )}

            {!!production.attributes.cast?.length && (
              <p>
                <span className="font-semibold">Starring:</span>{" "}
                {production.attributes.cast.join(", ")}
              </p>
            )}

            {production.attributes.releaseYear && (
              <p>
                <span className="font-semibold">Release year:</span>{" "}
                {production.attributes.releaseYear}
              </p>
            )}
          </div>

          {venue && (
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-2">
              <p className="font-semibold text-lg">Cinema</p>
              <p>{venue.name}</p>
              <p className="text-gray-600">
                {venue.address.street} {venue.address.houseNumber},{" "}
                {venue.address.city}
              </p>
            </div>
          )}

          {!!localizableAttributes?.description && (
            <div className=" pt-4 border-t border-gray-200 flex flex-col gap-2">
              <p className="font-semibold text-lg">Description</p>
              <p className="text-gray-600">
                {localizableAttributes.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
