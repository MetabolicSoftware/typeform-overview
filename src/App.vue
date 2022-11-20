<script setup>
import { ref } from "vue";
import processData from "./utils/processData.js";
import readAsText from "./utils/readAsText.js";
import FormField from "./components/FormField.vue";
import exampleData from "../data/XrH6qm0B - Example typeform.json";

const data = ref(processData(exampleData));
updateTitle();

function updateTitle() {
  document.title = data.value.title;
}

async function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;
  const rawData = await readAsText(file);
  const json = JSON.parse(rawData);
  data.value = processData(json);
  updateTitle();
}
</script>

<template>
  <div class="flex justify-between m-3 gap-3">
    <h1>{{ data.title }}</h1>
    <input
      ref="fileInput"
      type="file"
      @change="onFileChange"
      class="print:hidden"
    />
  </div>
  <FormField v-for="field of data.fields" :key="field.ref" :field="field" />
</template>
