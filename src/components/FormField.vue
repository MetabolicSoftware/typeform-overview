<script setup>
import FieldChoice from "./FieldChoice.vue";
import FieldHeader from "./FieldHeader.vue";

defineProps({
  field: Object,
});
</script>

<template>
  <div class="m-3 px-3 py-2 border border-black rounded">
    <FieldHeader :field="field" />
    <template v-if="field.type === 'group'">
      <FormField
        v-for="field of field.properties.fields"
        :key="field.ref"
        :field="field"
      />
    </template>
    <div v-else class="grid grid-flow-col auto-cols-fr gap-3">
      <div class="mt-2 ml-3 empty:m-0">
        <template v-if="field.properties.choices">
          <FieldChoice
            v-for="choice of field.properties.choices"
            :key="choice.ref"
            :choice="choice"
          />
        </template>
        <template v-if="field.type === 'yes_no'">
          <FieldChoice :choice="{ label: 'Yes' }" />
          <FieldChoice :choice="{ label: 'No' }" />
        </template>
      </div>
      <pre
        class="mt-2 text-sm overflow-x-auto print:[&_code]:whitespace-pre-wrap"
        v-html="field.logic"
      />
    </div>
  </div>
</template>
