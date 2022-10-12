import {
  searchShowsByName,
  getShowDetails,
  fetchPopularShows,
  type ShowSummary,
} from "./ShowSearchService";

import { expect, it, describe, beforeEach, vi, type SpyInstance } from "vitest";
import type { ShowRes, ShowResDetails } from "./ShowResponse.interface";

describe("ShowSearchService", () => {
  let spy: SpyInstance;
  const createResponse = (
    payload: object,
    okStatus: boolean = true
  ): Partial<Response> => {
    const res = {
      ok: okStatus,
      json: vi.fn().mockResolvedValue(payload),
    };
    return res;
  };

  beforeEach(() => {
    spy = vi.spyOn(window, "fetch");
  });
  describe("searchShowsByName", () => {
    it("correctly performs fetch", async () => {
      await searchShowsByName("test");
      expect(spy).toHaveBeenCalledWith(
        "https://api.tvmaze.com/search/shows?q=test"
      );
    });

    it("validates response", async () => {
      spy.mockResolvedValueOnce(createResponse({}, false));

      try {
        await searchShowsByName("test");
      } catch (errorMessage) {
        expect(errorMessage).toEqual("error while fetching HTTP res");
      }
    });

    it("maps response to show summaries", async () => {
      const showsResponses = [
        {
          show: {
            name: "test",
            id: 1,
            rating: {
              average: 6.0,
            },
            image: {
              medium: "www.nu.nl/image.png",
            },
            genres: ["comedy", "drama"],
            summary: "awesome summary",
          },
        },
      ] as ShowRes[];

      spy.mockResolvedValueOnce(createResponse(showsResponses));

      const showSummaries: ShowSummary[] = await searchShowsByName("test");
      const firstShowRes = showsResponses[0];
      const firstShowSummary = showSummaries[0];

      expect(firstShowSummary).toEqual({
        name: firstShowRes.show.name,
        rating: firstShowRes.show.rating.average,
        imageUrl: firstShowRes.show.image.medium,
        id: firstShowRes.show.id,
        genres: firstShowRes.show.genres,
        summary: firstShowRes.show.summary,
      });
    });
  });

  describe("getShowDetails", () => {
    it("correctly performs fetch", async () => {
      await getShowDetails(22);
      expect(spy).toHaveBeenCalledWith("https://api.tvmaze.com/shows/22");
    });

    it("maps response to show details", async () => {
      const showsDetailsResponse = {
        name: "test",
        id: 1,
        rating: {
          average: 6.0,
        },
        image: {
          original: "www.nu.nl/image.png",
        },
        genres: ["comedy", "drama"],
        summary: "awesome summary",
        officialSite: "www.nos.nl",
      };

      spy.mockResolvedValueOnce(createResponse(showsDetailsResponse));

      const showDetails: ShowResDetails = (await getShowDetails(
        22
      )) as unknown as ShowResDetails;

      expect(showDetails).toEqual({
        name: showsDetailsResponse.name,
        rating: showsDetailsResponse.rating.average,
        imageUrl: showsDetailsResponse.image.original,
        id: showsDetailsResponse.id,
        genres: showsDetailsResponse.genres,
        summary: showsDetailsResponse.summary,
        officialSite: showsDetailsResponse.officialSite,
      });
    });
  });

  describe("fetchPopularShows", () => {
    it("correctly performs fetch to normal schedule and web schedule", async () => {
      await fetchPopularShows();
      expect(spy).toHaveBeenCalledTimes(2);
      expect(spy).toHaveBeenNthCalledWith(
        1,
        "https://api.tvmaze.com/schedule?country=US"
      );
      expect(spy).toHaveBeenNthCalledWith(
        2,
        "https://api.tvmaze.com/schedule/web?country=US"
      );
    });
  });
});
