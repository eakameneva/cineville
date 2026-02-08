import type { Event, EventList } from "../types";
import { BASE_API_URL } from "./config";

export const getAllEvents = async (): Promise<Event[] | undefined> => {
  try {
    const data = await fetch(
      `${BASE_API_URL}/events?embed[production]=true&embed[venue]=true`
    );
    const json: EventList = await data.json();
    return json._embedded.events;
  } catch (error) {
    console.error(error);
  }
};
