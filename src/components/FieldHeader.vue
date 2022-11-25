<script setup>
import { computed } from "vue";
import markdown from "../utils/markdown.js";

const props = defineProps({
  field: Object,
});
const required = computed(() => props.field.validations?.required);
const titleHTML = computed(() => markdown(props.field.title));
const descriptionHTML = computed(() =>
  markdown(props.field.properties.description)
);
</script>

<template>
  <div class="flex items-start">
    <a
      :name="field.ref"
      :href="`#${field.ref}`"
      class="mt-1 mr-2 border border-black rounded px-1 py-.5"
    >
      {{ field.shortName }}
    </a>
    <h2 class="mt-1">
      <span v-html="titleHTML" />
      <span v-if="required" class="text-red-500">*</span>
    </h2>
  </div>
  <p class="text-sm text-gray-600" v-html="descriptionHTML" />
</template>
