import ExploreView from "./ExploreView.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import * as ShowSearchService from "../services/ShowSearchService";

import ShowListComponent from "../components/ShowListComponent.vue";

import { expect, it, describe, beforeAll, vi } from "vitest";

describe("ExploreView", () => {
  let wrapper: VueWrapper;

  const shows: ShowSearchService.ShowSummary[] = [
    {
      name: "GirlsB",
      rating: 6.6,
      imageUrl:
        "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
      id: 139,
      genres: ["Drama", "Romance"],
      summary:
        "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
    },
    {
      name: "GirlsA",
      rating: 10.0,
      imageUrl:
        "https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg",
      id: 41734,
      genres: ["Comedy", "Romance"],
      summary: "bla",
    },
  ];

  const spy = vi
    .spyOn(ShowSearchService, "fetchPopularShows")
    .mockResolvedValue(shows);

  beforeAll(() => {
    wrapper = mount(ExploreView);
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("fetches popular shows", () => {
    expect(spy).toHaveBeenCalled();
  });

  it("filters all possible genres (and dedupes) and renders showlists", () => {
    const showLists = wrapper.findAllComponents(ShowListComponent);
    const expectedGenres =  ["Drama", "Romance", "Comedy"];
    
    expect(showLists.length).toEqual(3);

    expect(showLists[0].props().label).toEqual(expectedGenres[0]);
    expect(showLists[1].props().label).toEqual(expectedGenres[1]);
    expect(showLists[2].props().label).toEqual(expectedGenres[2]);
    
    
    expect(showLists[0].props().shows).toEqual([shows[0]]);
    expect(showLists[1].props().shows).toEqual([shows[0], shows[1]]);
    expect(showLists[2].props().shows).toEqual([shows[1]]);    
  });
});
