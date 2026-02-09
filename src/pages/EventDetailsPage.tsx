import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getEvent } from "../api/requests";
import placeholderPoster from "../assets/placeholderPoster.png";
import { format } from "date-fns";

export const EventDetailsPage = () => {
  const { eventId = "" } = useParams();

  const { data: event, isLoading } = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
  });

  if (!event && isLoading) {
    return <div>Loading</div>;
  }
  if (!event) {
    return <p>Error loading event</p>;
  }
  const { production, venue } = event._embedded;
  const { startDate, attributes } = event;

  const formatLanguages = (languages: string[] = []) => {
    const displayNames = new Intl.DisplayNames(["en"], {
      type: "language",
    });

    return languages
      .map((lang) => {
        const baseLang = lang.split("-")[0];
        return displayNames.of(baseLang) ?? lang;
      })
      .join(", ");
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2>Event details</h2>
      <img
        className="max-w-2xs aspect-video object-cover"
        src={
          production?.assets?.cover?.url
            ? production.assets.cover.url
            : placeholderPoster
        }
        alt="Film poster"
      />
      <p>{format(startDate, "d MMMM")}</p>
      <p>{format(startDate, "HH:mm")}</p>
      <p>{production?.title}</p>

      {!!production?.attributes.releaseYear && (
        <p>
          <span>Release year:</span> {production.attributes.releaseYear}
        </p>
      )}

      {!!production?.attributes.spokenLanguages?.length && (
        <p>
          <span>Language:</span>{" "}
          {formatLanguages(production?.attributes.spokenLanguages)}
        </p>
      )}
      {!!attributes.subtitles?.length && (
        <p>
          <span>Subtitles:</span> {formatLanguages(attributes.subtitles)}
        </p>
      )}

      {!!production?.attributes.directors?.length && (
        <p>
          <span>Directed by:</span> {production.attributes.directors.join(", ")}
        </p>
      )}

      {!!production?.attributes.cast?.length && (
        <p>
          <span>Starring:</span> {production.attributes.cast.join(", ")}
        </p>
      )}

      <p>{event?._embedded.venue?.name}</p>
      <p>
        {venue?.address.street} {venue?.address.houseNumber},{" "}
        {venue?.address.city}
      </p>

      {!!production?.localizableAttributes?.description && (
        <p>{production?.localizableAttributes.description}</p>
      )}
    </div>
  );
};
