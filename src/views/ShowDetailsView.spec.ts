import ShowDetailsView from "./ShowDetailsView.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import * as ShowSearchService from "../services/ShowSearchService";

import { expect, it, describe, beforeAll, vi } from "vitest";

describe("ShowDetailsView", () => {
  let wrapper: VueWrapper;
  const show: ShowSearchService.ShowDetails = {
    name: "Girls",
    rating: 6.6,
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
    id: 139,
    genres: ["Drama", "Romance"],
    summary:
      "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
    officialSite: "http//www.test.nl",
  };
  const spy = vi
    .spyOn(ShowSearchService, "getShowDetails")
    .mockResolvedValue(show);
  const mockRoute = {
    params: {
      id: "1",
    },
  };

  beforeAll(() => {
    wrapper = mount(ShowDetailsView, {
      global: {
        mocks: {
          $route: mockRoute,
        },
      },
    });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls service to perform BE using id query param on mount", async () => {
    expect(spy).toHaveBeenCalledWith(parseInt(mockRoute.params.id));
  });

  it("renders show name", async () => {
    const nameElement = wrapper.get('[data-test="show-name"]');
    expect(nameElement.text().startsWith(show.name)).toEqual(true);
  });

  it("renders show rating", async () => {
    const ratingElement = wrapper.get('[data-test="show-rating"]');
    expect(ratingElement.text()).toEqual(`⭐ ${show.rating}`);
  });

  it("renders show image", async () => {
    const imageElement = wrapper.get('[data-test="show-image"]');
    expect(imageElement.attributes().src).toEqual(show.imageUrl);
  });
  
  it("renders link to official site", async () => {
    const linkElement = wrapper.get('[data-test="show-link"]');
    expect(linkElement.attributes().href).toEqual(show.officialSite);
  });
  
  it("renders show genres", async () => {
    const showGenresList = wrapper.find('[data-test="show-genres"]').findAll('li');
    expect(showGenresList.length).toEqual(show.genres.length);
  });

  it("renders show summary as html", async () => {
    const summaryElement = wrapper.get('[data-test="show-summary"]');
    expect(summaryElement.html().includes(show.summary)).toEqual(true);
  });

});
