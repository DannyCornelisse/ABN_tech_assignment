import type {
  ScheduledShowTVEpisode,
  ScheduledShowWebEpisode,
  ShowRes,
  ShowResDetails,
} from "./ShowResponse.interface";

const TV_MAZE_ENDPOINT = "https://api.tvmaze.com";

interface ShowSummary {
  name: string;
  rating: number;
  id: number;
  genres: string[];
  summary: string;
  imageUrl: string;
}

interface ShowDetails extends ShowSummary {
  officialSite: string;
  imageUrl: string;
}

const searchShowsByName = async (showName: string): Promise<ShowSummary[]> => {
  const res: Response = await fetch(
    `${TV_MAZE_ENDPOINT}/search/shows?q=${showName}`
  );

  await validateResponse(res);

  const shows: ShowRes[] = await res.json();

  return shows.map((showRes) => {
    const show: ShowResDetails = showRes.show;

    return mapShowResponseToSummary(show);
  });
};

const getShowDetails = async (showId: number): Promise<ShowDetails> => {
  const res: Response = await fetch(`${TV_MAZE_ENDPOINT}/shows/${showId}`);
  await validateResponse(res);

  const show: ShowResDetails = await res.json();

  return {
    name: show.name,
    id: show.id,
    rating: show.rating.average,
    officialSite: show.officialSite,
    imageUrl: show.image?.original,
    genres: show.genres,
    summary: show.summary,
  };
};

const fetchPopularShows = async (): Promise<ShowSummary[]> => {
  const [scheduledTVEpisodesRes, scheduledWebEpisodesRes]: Response[] =
    await Promise.all([
      fetch(`${TV_MAZE_ENDPOINT}/schedule?country=US`),
      fetch(`${TV_MAZE_ENDPOINT}/schedule/web?country=US`),
    ]);

  await Promise.all([
    validateResponse(scheduledTVEpisodesRes),
    validateResponse(scheduledWebEpisodesRes),
  ]);

  const [scheduledTVEpisodes, scheduledWebEpisodes]: [
    ScheduledShowTVEpisode[],
    ScheduledShowWebEpisode[]
  ] = await Promise.all([
    scheduledTVEpisodesRes.json(),
    scheduledWebEpisodesRes.json(),
  ]);

  const scheduledTVShowsSummaries = scheduledTVEpisodes
    .map((episode) => episode.show)
    .map((show) => mapShowResponseToSummary(show));

  const scheduledWebShowsSummaries = scheduledWebEpisodes
    .map((episode) => episode._embedded.show)
    .map((show) => mapShowResponseToSummary(show));

  const combinedShowSummaries = [
    ...scheduledTVShowsSummaries,
    ...scheduledWebShowsSummaries,
  ];

  const uniqueShowIds = [
    ...new Set(combinedShowSummaries.map((show) => show.id)),
  ];

  const uniqueShowSummaries = uniqueShowIds.map((id) =>
    combinedShowSummaries.find((show) => show.id === id)
  ) as ShowSummary[];

  const popularShows = uniqueShowSummaries.filter((show) => show.rating > 6.0);

  return popularShows;
};

const validateResponse = (
  res: Response,
): Promise<void> => {
  if (!res.ok) return Promise.reject("error while fetching HTTP res");

  return Promise.resolve();
};

const mapShowResponseToSummary = (show: ShowResDetails): ShowSummary => {
  return {
    name: show.name,
    rating: show.rating.average,
    imageUrl: show.image?.medium || "",
    id: show.id,
    genres: show.genres,
    summary: show.summary,
  };
};

export { searchShowsByName, getShowDetails, fetchPopularShows };
export type { ShowSummary, ShowDetails };
