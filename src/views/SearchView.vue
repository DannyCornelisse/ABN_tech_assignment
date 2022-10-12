<script lang="ts">
import { searchShowsByName } from "../services/ShowSearchService";
import type { ShowSummary } from "../services/ShowSearchService";
import { defineComponent } from "vue";
import ShowListComponent from "../components/ShowListComponent.vue";

export default defineComponent({
  components: { ShowListComponent },
  data() {
    return {
      searchedShows: [] as ShowSummary[],
    };
  },
  methods: {
    handleSearchInput(showName: string) {
      if (showName) {
        searchShowsByName(showName).then(
          (shows) => (this.searchedShows = shows)
        );
      } else {
        this.searchedShows = [];
      }
    },
  },
});
</script>

<template>
  <main class="flex flex-col items-left p-2">
    <input
      class="border-solid rounded border-2 border-indigo-600 my-4 w-100 max-w-md p-1 bg-slate-800 font-semibold"
      @input="(event) => handleSearchInput(event?.target?.value)"
      placeholder="Find your favorite show!"
      data-test="show-name-input"
    />
    <ShowListComponent
      :shows="searchedShows"
      :label="`${searchedShows.length} search results`"
      :includeGenres="true"
    >
    </ShowListComponent>
  </main>
</template>
