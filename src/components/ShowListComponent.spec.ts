import ShowListComponent from "./ShowListComponent.vue";

import { mount, VueWrapper } from "@vue/test-utils";
import { expect, it, describe, beforeAll } from "vitest";

import ShowTileComponent from "./ShowTileComponent.vue";

describe("ShowListComponent", () => {
  let wrapper: VueWrapper;
  const shows = [
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
      genres: ["Comedy"],
      summary: null,
    },
  ];

  beforeAll(() => {
    wrapper = mount(ShowListComponent);
    wrapper.setProps({ shows });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("does not sort shows initially", () => {
    const showTiles: VueWrapper<ShowTileComponent>[] =
      wrapper.findAllComponents(ShowTileComponent);
    expect(showTiles.length).toEqual(2);
    expect(showTiles[0].props().show).toEqual(shows[0]);
    expect(showTiles[1].props().show).toEqual(shows[1]);
  });

  it("sorts by name if sorting rule is set to name", async () => {
    const sortingSelect = wrapper.find("select");
    await sortingSelect.setValue("name");

    const showTiles: VueWrapper<ShowTileComponent>[] =
      wrapper.findAllComponents(ShowTileComponent);
    expect(showTiles[0].props().show.name).toEqual("GirlsA");
    expect(showTiles[1].props().show.name).toEqual("GirlsB");
  });

  it("sorts by rating if sorting rule is set to rating", async () => {
    const sortingSelect = wrapper.find("select");
    await sortingSelect.setValue("rating");

    const showTiles: VueWrapper<ShowTileComponent>[] =
      wrapper.findAllComponents(ShowTileComponent);
    expect(showTiles[0].props().show.rating).toEqual(10.0);
    expect(showTiles[1].props().show.rating).toEqual(6.6);
  });
});
