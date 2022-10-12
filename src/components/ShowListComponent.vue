<script lang="ts">
import type { ShowSummary } from "@/services/ShowSearchService";
import { defineComponent, type PropType } from "vue";
import ShowTileComponent from "./ShowTileComponent.vue";

enum SortingRule {
  NONE = "",
  NAME = "name",
  RATING = "rating",
}

export default defineComponent({
  components: { ShowTileComponent },
  props: {
    shows: Array as PropType<ShowSummary[]>,
    label: String,
    includeGenres: Boolean,
  },
  data() {
    return {
      selectedSortingRule: SortingRule.NONE,
      SortingRule: SortingRule, // expose enum to template
    };
  },
  methods: {
    getOrderedShowList() {
      if (this.selectedSortingRule === SortingRule.NAME) {
        const showsRef = [...new Set(this.shows)];

        return showsRef.sort((show1, show2) =>
          show1.name.localeCompare(show2.name)
        ) as ShowSummary[];
      }

      if (this.selectedSortingRule === SortingRule.RATING) {
        const showsRef = [...new Set(this.shows)];

        return showsRef.sort((show1, show2) =>
          show1.rating > show2.rating ? -1 : 1
        );
      }

      return this.shows as ShowSummary[];
    },
  },
  computed: {
    isShowsValid(): boolean {
      return !!this.shows?.length;
    },
  },
});
</script>

<template>
  <div class="flex justify-between mb-2">
    <p class="font-semibold text-lg mb-1">{{ label }}</p>
    <select
      class="border-solid rounded border-2 border-indigo-600 bg-slate-800 font-semibold p-2 justify-self-end"
      name="sort"
      v-model="selectedSortingRule"
    >
      <option :value="SortingRule.NONE" selected>Sort by:</option>
      <option :value="SortingRule.NAME">Name</option>
      <option :value="SortingRule.RATING">Rating</option>
    </select>
  </div>
  <div
    class="block overflow-x-scroll whitespace-nowrap p-1 mb-4 show-wrapper"
    v-if="isShowsValid"
  >
    <ShowTileComponent
      class="inline-block mr-2"
      v-for="(show, index) in getOrderedShowList()"
      :key="index"
      :show="show"
      :includeGenre="includeGenres"
    >
    </ShowTileComponent>
  </div>
</template>
