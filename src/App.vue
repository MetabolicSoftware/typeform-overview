<script setup>
import getData from "./utils/processData.js";
import FormField from "./components/FormField.vue";

const data = getData();
document.title = data.title;
</script>

<template>
  <h1 class="m-3">{{ data.title }}</h1>
  <FormField v-for="field of data.fields" :key="field.ref" :field="field" />
</template>
