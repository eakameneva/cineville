import type { EventList } from "../types";
import { BASE_API_URL } from "./config";

export const getAllEvents = async (): Promise<EventList | undefined> => {
  try {
    const data = await fetch(
      `${BASE_API_URL}/events?embed[production]=true&embed[venue]=true`
    );
    return data.json();
  } catch (error) {
    console.error(error);
  }
};
