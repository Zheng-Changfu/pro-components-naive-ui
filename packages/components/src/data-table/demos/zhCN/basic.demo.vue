<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const columns = [
      {
        type: 'selection',
        disabled(row: any) {
          return row.title === 'Wonderwall'
        },
      },
      {
        key: 'sort',
      },
      {
        title: 'No',
        key: 'no',
      },
      {
        title: 'Title',
        key: 'title',
      },
      {
        title: 'Length',
        key: 'length',
      },
    ]

    const data = [
      { no: 3, title: 'Wonderwall', length: '4:18' },
      { no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { no: 12, title: 'Champagne Supernova', length: '7:27' },
      { no: 33, title: 'Wonderwall', length: '4:18' },
      { no: 44, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { no: 122, title: 'Champagne Supernova', length: '7:27' },
      { no: 333, title: 'Wonderwall', length: '4:18' },
      { no: 4444, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { no: 1222, title: 'Champagne Supernova', length: '7:27' },
      { no: 33333, title: 'Wonderwall', length: '4:18' },
    ]

    function request() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: data,
            total: 210,
          })
        }, 2000)
      })
    }

    return {
      data,
      request,
      columns,
    }
  },
})
</script>

<template>
  <pro-data-table
    title="查询表格"
    tooltip="123"
    row-key="no"
    drag-sort-key="sort"
    simple-pagination
    :request="request"
    :columns="columns"
    click-row-to-select
  >
    <template #toolbar>
      <n-flex>
        <n-button type="primary">
          添加
        </n-button>
        <n-button>删除</n-button>
      </n-flex>
    </template>
    <template #extra>
      <n-flex>
        <n-button type="primary">
          添加
        </n-button>
        <n-button type="primary">
          添加
        </n-button>
        <n-button type="primary">
          添加
        </n-button>
      </n-flex>
    </template>
  </pro-data-table>
</template>
