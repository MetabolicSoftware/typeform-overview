<script setup>
import { computed } from "vue";
import markdown from "../utils/markdown.js";

const props = defineProps({
  choice: Object,
});

const html = computed(() => markdown(props.choice.label));
</script>

<template>
  <div class="flex items-start">
    <div
      v-if="choice.shortName"
      class="mt-1 mr-2 border border-black rounded px-1 py-.5"
    >
      {{ choice.shortName }}
    </div>
    <div class="mt-1" v-html="html" />
  </div>
</template>
