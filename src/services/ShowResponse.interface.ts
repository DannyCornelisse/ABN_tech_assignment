export interface ShowRes {
  score: number;
  show: ShowResDetails;
}

export interface ShowResDetails {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  schedule: object;
  rating: {
    average: number;
  };
  weight: number;
  network: object;
  webChannel: string | null;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
  updated: number;
  _links: {
    previousepisode: string;
    self: { href: string };
  };
}

export interface ScheduledShowTVEpisode {
  show: ShowResDetails;
}

export interface ScheduledShowWebEpisode {
  _embedded: {
    show: ShowResDetails;
  };
}