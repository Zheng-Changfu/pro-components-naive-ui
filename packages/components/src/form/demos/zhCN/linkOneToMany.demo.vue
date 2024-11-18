<markdown>
# 一对多联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ select: 'visible' | 'hidden' }>({
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
    <pro-select
      title="控制者"
      path="select"
      initial-value="visible"
      :field-props="{
        options: [
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'hidden' },
        ],
      }"
    />
    <pro-input
      title="受控者1"
      path="input1"
      :visible="get('select') === 'visible'"
    />
    <pro-input
      title="受控者2"
      path="input2"
      :hidden="get('select') === 'hidden'"
    />
    <n-button attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
