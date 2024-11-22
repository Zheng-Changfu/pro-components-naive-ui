<markdown>
# 链式联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ select: number, input1: number }>({
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
      :initial-value="0"
      :field-props="{
        options: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ],
      }"
    />
    <pro-select
      title="控制者"
      path="input1"
      :initial-value="1"
      :visible="!!get('select')"
      :field-props="{
        options: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ],
      }"
    />
    <pro-input
      title="受控者"
      path="input2"
      :visible="!!get('select') && !!get('input1')"
    />
    <n-button attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
