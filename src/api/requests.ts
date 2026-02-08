import type { Event, EventList } from "../types";
import { BASE_API_URL } from "./config";

export const getAllEvents = async (
  date: Date
): Promise<Event[] | undefined> => {
  const day = date.toISOString().split("T")[0];
  const end = `${day}T23:59:59.999Z`;
  try {
    const data = await fetch(
      `${BASE_API_URL}/events?embed[production]=true&embed[venue]=true&startDate[gte]=${date.toISOString()}&startDate[lt]=${end}`
    );
    const json: EventList = await data.json();
    return json._embedded.events;
  } catch (error) {
    console.error(error);
  }
};
