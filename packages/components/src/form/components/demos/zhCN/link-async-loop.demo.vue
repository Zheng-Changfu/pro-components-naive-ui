<markdown>
# 联动-异步循环

有的时候 A 发生变化要改变 B,B 发生变化要改变 A,你可以使用 `onChange` 完成需求
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const form = createProForm<{
      A: number
      B: number
      name: string
    }>()

    async function fetchUpdateBAndName() {
      await delay(500)
      form.setFieldsValue({
        B: 1,
        name: 'BBBBBB',
      }, 'shallowMerge')
    }

    async function fetchUpdateAAndName() {
      await delay(500)
      form.setFieldsValue({
        A: 0,
        name: 'AAAAA',
      }, 'shallowMerge')
    }

    return {
      form,
      fetchUpdateBAndName,
      fetchUpdateAAndName,
    }
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-select
      title="A"
      path="A"
      :field-props="{
        options: [
          { label: 'A', value: 0 },
          { label: 'AA', value: 1 },
        ],
      }"
      @change="fetchUpdateBAndName"
    />
    <pro-select
      title="B"
      path="B"
      :field-props="{
        options: [
          { label: 'B', value: 0 },
          { label: 'BB', value: 1 },
        ],
      }"
      @change="fetchUpdateAAndName"
    />
    <pro-input
      title="姓名"
      path="name"
    />
  </pro-form>
</template>
