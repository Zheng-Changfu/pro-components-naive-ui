<markdown>
# 联动-异步循环

有的时候 A 发生变化要改变 B,B 发生变化要改变 A,你可以使用 `onChange` 完成需求

<n-alert type="warning" title="注意" :bordered="false">
  如果使用实例的 set 方法，你无需拼接路径，但是如果使用的是 form 的方法，你需要拼接路径
</n-alert>
</markdown>

<script lang="tsx">
import type { ProFormListInst } from 'pro-naive-ui'
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

interface Info {
  A: number
  B: number
  name: string
}

export default defineComponent({
  setup() {
    const form = createProForm<{
      info: Info[]
    }>()

    /**
     * 你也可以使用 ref 绑定到 pro-form-list 组件上来获取 action
     */
    async function fetchUpdateBAndName(action: ProFormListInst<Info>, index: number) {
      await delay(500)
      // 这里会和行的值进行浅合并
      action.set(index, {
        B: 1,
        name: 'BBBBBB',
      })
    }

    async function fetchUpdateAAndName(rowPath: string) {
      await delay(500)
      form.setFieldValue(rowPath, {
        A: 0,
        name: 'AAAAA',
      })
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
  >
    <pro-form-list
      title="用户信息"
      path="info"
      only-show-first-item-label
      :initial-value="[
        { name: 'zcf', age: 26 },
        { name: 'cxh', age: 28 },
      ]"
    >
      <template #default="{ index, action, rowPath }">
        <pro-select
          title="A"
          path="A"
          :field-props="{
            class: 'w-180px',
            options: [
              { label: 'A', value: 0 },
              { label: 'AA', value: 1 },
            ],
          }"
          @change="fetchUpdateBAndName(action, index)"
        />
        <pro-select
          title="B"
          path="B"
          :field-props="{
            class: 'w-180px',
            options: [
              { label: 'B', value: 0 },
              { label: 'BB', value: 1 },
            ],
          }"
          @change="fetchUpdateAAndName(rowPath)"
        />
        <pro-input
          title="姓名"
          path="name"
        />
      </template>
    </pro-form-list>
  </pro-form>
</template>
