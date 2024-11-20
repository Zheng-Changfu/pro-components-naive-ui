<markdown>
# 自身联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ color: string }>()

    return {
      form,
      get: form.getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-input
      title="颜色"
      path="color"
      :field-props="{
        style: {
          background: get('color'),
        },
      }"
    />
  </pro-form>
</template>
