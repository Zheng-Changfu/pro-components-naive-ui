<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { ProDescriptionColumns } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const columns: ProDescriptionColumns = [
      {
        title: '文本',
        path: 'text',
      },
      {
        title: '日期时间',
        path: 'datetime',
        valueType: 'date-time',
      },
    ]

    async function request() {
      await delay(2000)
      return {
        text: '123',
        datetime: '2024-08-25 22:00:00',
      }
    }

    return {
      columns,
      request,
    }
  },
})
</script>

<template>
  <pro-card title="描述列表">
    <pro-descriptions label-placement="left" :request="request" :column="1" :columns="columns" />
  </pro-card>
</template>
