<script lang="ts">
import { getShowDetails, type ShowDetails } from '../services/ShowSearchService';
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      showDetails: undefined as unknown as ShowDetails,
      hasError: false,
    }
  },
  async mounted() {
    try {
      this.showDetails = await getShowDetails(parseInt(this.$route.params.id as string));
    } catch (_e) {
      this.hasError = true;
    }
  }
});
</script>

<template>
  <main class="py-4 px-12">
    <p v-if="!showDetails && !hasError">Fetching show details... </p>
    <p v-if="hasError">An error occured fetching show details... </p>
    <div class="flex flex-col items-center" v-if="showDetails">
      <h1 class="text-2xl font-semibold mb-4" data-test="show-name">{{ showDetails.name }}&nbsp; <span data-test="show-rating" v-if="showDetails.rating">{{ `&#11088; ${showDetails.rating}` }}</span></h1>
      <img class="show-image mb-4" :src="showDetails.imageUrl" :alt="showDetails.name" data-test="show-image"/>
      <ul class="mb-4" data-test="show-genres">
        <li class="mb-1" v-for="(genre, index) in showDetails.genres" :key="index">{{ genre }}</li>
      </ul>
      <p class="mb-4" v-html="showDetails.summary" data-test="show-summary"></p>
      <a class="underline text-lg" :href="showDetails.officialSite" _target="blank" data-test="show-link">Link to official site</a>
    </div>
  </main>
</template>

<style scoped>
.show-image {
  height: 500px;
}
</style>
