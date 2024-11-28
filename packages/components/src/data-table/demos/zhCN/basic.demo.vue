<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { random } from 'lodash-es'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const columns = ref<ProDataTableColumns>([
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
        tooltip: ['123', '123'],
      },
      // {
      //   title: '时间',
      //   key: 'now',
      //   valueType: 'date-time',
      // },
      // {
      //   title: 'Title',
      //   key: 'title',
      // },
      // {
      //   title: 'Length',
      //   key: 'length',
      // },
    ])

    const data = ref([
      { now: Date.now(), no: '3', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: '4', title: 'Don\'t Look Back in Anger', length: '4:48' },
      // { now: Date.now(), no: '12', title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: '33', title: 'Wonderwall', length: '4:18' },
      // { now: Date.now(), no: '44', title: 'Don\'t Look Back in Anger', length: '4:48' },
      // { now: Date.now(), no: '122', title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: '333', title: 'Wonderwall', length: '4:18' },
      // { now: Date.now(), no: '4444', title: 'Don\'t Look Back in Anger', length: '4:48' },
      // { now: Date.now(), no: '1222', title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: '33333', title: 'Wonderwall', length: '4:18' },
    ])

    function change() {
      data.value.unshift({
        now: Date.now(),
        no: String(random(1, 3000)),
        title: 'Wonderwall',
        length: '4:18',
      })
      data.value = [
        { now: Date.now(), no: '4', title: 'Don\'t Look Back in Anger', length: '4:48' },
        { now: Date.now(), no: '3', title: 'Wonderwall', length: '4:18' },
      ]
      // columns.value[3].tooltip = ['123', '234']
    }

    function onDragSortEnd(dataSource: any[], oldIndex: number, newIndex: number) {
      // console.log(dataSource, oldIndex, newIndex)
      // const oldRow = data.value.splice(oldIndex, 1)[0]
      // data.value.splice(newIndex, 1, oldRow)
      // data.value = toRaw(dataSource)
    }

    return {
      data,
      change,
      columns,
      onDragSortEnd,
    }
  },
})
</script>

<template>
  <pro-data-table
    title="查询表格"
    tooltip="123"
    drag-sort-key="sort"
    :columns="columns"
    click-row-to-select
    :row-key="row => row.no"
    @drag-sort-end="onDragSortEnd"
  >
    <template #toolbar>
      <n-flex>
        <n-button type="primary" @click="change">
          添加1
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
