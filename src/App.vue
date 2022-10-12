<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="bg-slate-700 text-neutral-50 min-h-screen">
    <header>
      <div>
        <nav class="bg-slate-800 px-2 py-4 shadow-lg">
          <RouterLink class="font-semibold mx-2 underline" to="/">Search</RouterLink>
          <RouterLink class="font-semibold mx-2 underline" to="/explore">Explore</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>