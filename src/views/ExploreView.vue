<script lang="ts">
import { fetchPopularShows } from "../services/ShowSearchService";
import type { ShowSummary } from "../services/ShowSearchService";
import { defineComponent } from "vue";
import ShowListComponent from "../components/ShowListComponent.vue";

export default defineComponent({
  components: { ShowListComponent },
  data() {
    return {
      popularShows: [] as ShowSummary[],
      popularShowGenres: [] as string[],
      hasError: false,
    };
  },
  methods: {
    popularShowsByGenre(genre: string) {
      return this.popularShows.filter((show) => show.genres.includes(genre));
    },
  },
  async mounted() {
    try {
      this.popularShows = await fetchPopularShows();
      this.popularShows.forEach((show) => {
        // Add genres of each show to popular show genres and then duplicate
        this.popularShowGenres = [
          ...new Set([...this.popularShowGenres, ...show.genres]),
        ];
      });
    } catch (_e) {
      this.hasError = true;
    }
  },
});
</script>

<template>
  <main class="flex flex-col items-left p-2">
    <h1 class="text-xl font-semibold mt-2 mb-4">
      Explore some of these popular shows airing right now!
    </h1>
    <p v-if="hasError">An error occured getting the popular shows</p>
    <ShowListComponent
      v-for="(genre, index) in popularShowGenres"
      :key="index"
      :shows="popularShowsByGenre(genre)"
      :label="genre"
    >
    </ShowListComponent>
  </main>
</template>
