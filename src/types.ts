export type EventList = {
  count: number;
  totalCount: number;
  _embedded: {
    events: Event[];
  };
  _links: {
    self: ApiPath;
    next?: ApiPath;
    previous?: ApiPath;
  };
};

export type Event = {
  id: string;
  productionId: Production["id"];
  venueId: Venue["id"];
  ticketingUrl: string | null;
  startDate: string;
  endDate: string | null;
  attributes: {
    subtitles?: string[];
  };
  _embedded: {
    production?: Production;
    venue?: Venue;
  };
  _links: {
    self: ApiPath;
    production: ApiPath;
    venue: ApiPath;
  };
};

export type Production = {
  id: string;
  slug: string;
  title: string;
  attributes: {
    cast?: string[];
    duration?: number;
    directors?: string[];
    releaseYear?: number;
    premiereDate?: string;
    spokenLanguages?: string[];
  };
  localizableAttributes: {
    [locale: string]: {
      description?: string;
      shortDescription?: string;
    };
  };
  assets: {
    cover: Asset | null;
    poster: Asset | null;
  };
  _links: {
    self: ApiPath;
    events: ApiPath;
  };
};

export type Venue = {
  id: string;
  slug: string;
  name: string;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
  attributes: {
    website?: string;
  };
  localizableAttributes: {
    [locale: string]: {
      intro?: string;
      description?: string;
      ticketInfo?: string;
    };
  };
  assets: {
    cover: Asset | null;
  };
  _links: {
    self: ApiPath;
  };
};

export type Asset = {
  id: string;
  url: string;
  mimeType: string;
  _links: {
    self: ApiPath;
  };
};

export type ApiPath = {
  href: string;
};

export interface IEventFilters {
  date: Date;
  hour: number;
}
