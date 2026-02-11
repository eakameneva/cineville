import type { Event, EventList } from "../types";
import { BASE_API_URL } from "./config";

const EVENT_EMBED_INFO_PARAMS = "embed[production]=true&embed[venue]=true";
const END_OF_DAY_TIME = [23, 59, 59, 999] as const;

const mapDateToGetAllEvents = (startDate: Date) => {
  const endDate = new Date(startDate);
  endDate.setHours(...END_OF_DAY_TIME);

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };
};

export const getAllEvents = async (date: Date) => {
  const { startDate, endDate } = mapDateToGetAllEvents(date);

  const response = await fetch(
    `${BASE_API_URL}/events?${EVENT_EMBED_INFO_PARAMS}&startDate[gte]=${startDate}&startDate[lt]=${endDate}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch events: ${response.status} ${response.statusText}`
    );
  }

  const json: EventList = await response.json();

  return json._embedded.events;
};

export const getEvent = async (id: string) => {
  const response = await fetch(
    `${BASE_API_URL}/events/${id}?${EVENT_EMBED_INFO_PARAMS}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch event: ${response.status} ${response.statusText}`
    );
  }

  const json: Event = await response.json();

  return json;
};
