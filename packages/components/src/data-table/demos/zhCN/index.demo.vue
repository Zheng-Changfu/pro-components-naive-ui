<markdown>
# 序号列
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const columns: ProDataTableColumns = [
      {
        type: 'index',
      },
      {
        title: '自定义序号列名称',
        tooltip: '可以修改语言包',
        type: 'index',
        width: 150,
      },
      {
        title: '自定义渲染序号列',
        type: 'index',
        width: 140,
        render(index) {
          return <span class="color-red">{index}</span>
        },
      },
      {
        title: '无意义的列',
      },
    ]

    const data = ref([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ])

    return {
      data,
      columns,
    }
  },
})
</script>

<template>
  <pro-data-table
    title="序号列"
    tooltip="序号列"
    :data="data"
    :columns="columns"
    :row-key="(row:any) => row.id"
  />
</template>
