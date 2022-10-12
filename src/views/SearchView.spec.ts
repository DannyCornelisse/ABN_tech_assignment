import SearchView from "./SearchView.vue";
import ShowListComponent from "../components/ShowListComponent.vue";
import { mount, VueWrapper } from "@vue/test-utils";

import { expect, it, describe, beforeAll, vi } from "vitest";
import * as ShowSearchService from "../services/ShowSearchService";

describe("SearchView", () => {
  let wrapper: VueWrapper;
  const spy = vi.spyOn(ShowSearchService, "searchShowsByName");

  beforeAll(() => {
    wrapper = mount(SearchView);
    wrapper.setData({ searchedShows: [] });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("calls service to perform BE once an input has been given", async () => {
    const input = wrapper.get('[data-test="show-name-input"]');

    await input.setValue("House of the dragon");
    expect(spy).toHaveBeenCalledWith("House of the dragon");
  });

  it("passes shows to ShowList view", async () => {
    const searchedShows = [
      {
        name: "Girls",
        rating: 6.6,
        imageUrl:
          "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
        id: 139,
        genres: ["Drama", "Romance"],
        summary:
          "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
      },
      {
        name: "GIRLS",
        rating: null,
        imageUrl:
          "https://static.tvmaze.com/uploads/images/medium_portrait/191/478539.jpg",
        id: 41734,
        genres: ["Comedy"],
        summary: null,
      },
    ];

    await wrapper.setData({ searchedShows });
    const showListComponent: VueWrapper<ShowListComponent> =
      await wrapper.findComponent(ShowListComponent);
    const ShowListComponentProps = showListComponent.props();
    expect(ShowListComponentProps.shows).toEqual(searchedShows);
    expect(ShowListComponentProps.label).toEqual("2 search results");
    expect(ShowListComponentProps.includeGenres).toEqual(true);
  });
});
