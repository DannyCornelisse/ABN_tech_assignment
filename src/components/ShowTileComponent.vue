<script lang="ts">
import type { ShowSummary } from "../services/ShowSearchService";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  props: {
    show: Object as PropType<ShowSummary>,
    includeGenre: Boolean,
  },
  methods: {
    navigateToShowDetails(show: ShowSummary) {
      this.$router.push({ name: "details", params: { id: show.id } });
    },
  },
  computed: {
    getRatingLabel(): string {
      return this.show?.rating
        ? `&#11088; ${this.show.rating}`
        : "&#11088; N/A";
    },
  },
});
</script>

<template>
  <figure
    v-if="show"
    class="text-center cursor-pointer"
    @click="navigateToShowDetails(show as ShowSummary)"
  >
    <img :src="show.imageUrl" :alt="show.name" />
    <figcaption class="font-semibold">
      <p class="font-semibold" data-test="show-name">{{ show.name }}</p>
      <p
        class="font-semibold"
        data-test="show-rating"
        v-html="getRatingLabel"
      ></p>
      <p v-if="includeGenre" data-test="show-genre">
        {{ show.genres[0] || "N/A" }}
      </p>
    </figcaption>
  </figure>
</template>
