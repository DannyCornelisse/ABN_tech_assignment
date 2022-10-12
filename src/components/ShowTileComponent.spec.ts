import { mount, VueWrapper } from "@vue/test-utils";
import { expect, it, describe, beforeAll, vi } from "vitest";
import ShowTileComponent from "./ShowTileComponent.vue";

describe("ShowListComponent", () => {
  let wrapper: VueWrapper;
  const show = {
    name: "GirlsB",
    rating: 6.6,
    imageUrl:
      "https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg",
    id: 139,
    genres: ["Drama", "Romance"],
    summary:
      "<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>",
  };

  const mockRouter = {
    push: vi.fn(),
  };

  beforeAll(() => {
    wrapper = mount(ShowTileComponent, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.setProps({ show, includeGenre: false });
  });

  it("exists", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("passes image url to img tag", () => {
    const imageTag = wrapper.find("img");
    expect(imageTag.attributes().src).toEqual(show.imageUrl);
  });

  it("renders show name", () => {
    const nameElement = wrapper.find('[data-test="show-name"]');
    expect(nameElement.text()).toEqual(show.name);
  });

  it("renders rating if defined", () => {
    const ratingElement = wrapper.find('[data-test="show-rating"]');

    expect(ratingElement.text()).toEqual(`⭐ ${show.rating}`);
  });

  it("renders N/A instead of rating if not defined", async () => {
    await wrapper.setProps({ show: { ...show, rating: null } });
    const ratingElement = wrapper.find('[data-test="show-rating"]');

    expect(ratingElement.text()).toEqual("⭐ N/A");
  });

  it("renders first genre in show genres if includeGenre prop is true", async () => {
    await wrapper.setProps({ includeGenre: true });
    const genreElement = wrapper.get('[data-test="show-genre"]');
    expect(genreElement.text()).toEqual(show.genres[0]);
  });

  it("renders N/A if show genres are passed and includeGenre prop is true", async () => {
    await wrapper.setProps({
      includeGenre: true,
      show: { ...show, genres: [] },
    });
    const genreElement = wrapper.get('[data-test="show-genre"]');
    expect(genreElement.text()).toEqual("N/A");
  });

  it("navigates to show details view when user clicks the tile", async () => {
    const tile = wrapper.get("figure");
    await tile.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "details",
      params: { id: show.id },
    });
  });
});
