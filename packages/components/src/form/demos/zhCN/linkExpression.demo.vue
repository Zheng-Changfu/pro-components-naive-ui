<markdown>
# 联动-表达式
</markdown>

<script lang="ts">
import { createProForm } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const form = createProForm<{ color: string }>({
      onSubmit: console.log,
    })
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
      required
      initial-value="#ccc"
      :field-props="{
        style: {
          background: get('color'),
        },
      }"
    />
    <pro-digit
      title="#ccc显示"
      path="color#ccc"
      required
      :visible="get('color') === '#ccc'"
    />
    <pro-digit
      title="#eee隐藏"
      path="color#eee"
      required
      :hidden="get('color') === '#eee'"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
