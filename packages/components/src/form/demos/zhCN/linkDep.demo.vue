<markdown>
# 依赖联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ dim_1: number, dim_2: number }>()

    return {
      form,
      get: form.getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-digit title="控制者" path="dim_1" :initial-value="0" />
    <pro-digit title="控制者" path="dim_2" :initial-value="0" />
    <pro-digit title="受控者" path="result" readonly :value="get('dim_1') * get('dim_2')" />
  </pro-form>
</template>
