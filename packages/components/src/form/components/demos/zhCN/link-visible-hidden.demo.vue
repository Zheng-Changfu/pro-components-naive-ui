<markdown>
# 联动-显示隐藏

每个表单项都有 `visible` 和 `hidden` 属性来控制显示和隐藏,`visible` 的优先级比 `hidden` 高, 当然你也可以用 `v-if`,
使用 `getFieldValue` 或者 `values` 获取表单的值控制联动

<n-alert type="warning" title="注意" :bordered="false">
  被隐藏的表单项值在提交时并不会包含在内
</n-alert>
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ color: string }>({
      onSubmit: console.log,
    })
    return {
      form,
      values: form.values,
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
          background: values.color,
        },
      }"
    />
    <pro-digit
      title="#ccc显示"
      path="color#ccc"
      required
      :visible="values.color === '#ccc'"
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
