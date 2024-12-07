<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderCopyableText, renderDateText, renderImages, renderTags } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function move<T = any>(list: T[], fromIndex: number, toIndex: number) {
  if (fromIndex === toIndex)
    return

  if (fromIndex < 0 || toIndex < 0)
    return

  if (fromIndex > list.length - 1 || toIndex > list.length - 1)
    return

  if (fromIndex < toIndex) {
    const fromItem = list[fromIndex]
    for (let i = fromIndex; i < toIndex; i++)
      list[i] = list[i + 1]
    list[toIndex] = fromItem
  }
  else {
    const fromItem = list[fromIndex]
    for (let i = fromIndex; i > toIndex; i--)
      list[i] = list[i - 1]
    list[toIndex] = fromItem
  }
}

export default defineComponent({
  setup() {
    const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
      {
        type: 'selection',
        multiple: false,
        disabled(row: any) {
          return row.title === 'Wonderwall'
        },
      },
      {
        path: 'sort',
      },
      {
        type: 'index',
      },
      {
        title: '可复制文本',
        render: row => renderCopyableText(row.title),
      },
      {
        title: 'tags',
        render: row => renderTags(row.title),
      },
      {
        title: '日期格式化',
        render: row => renderDateText(row.now),
      },
      {
        title: '图片',
        width: 200,
        render: row => renderImages(row.src),
      },
      {
        title: 'No',
        path: 'no',
        width: 80,
        tooltip: ['123', '123'],
      },
    ])

    const data = ref([
      { now: Date.now(), src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', no: '3', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), src: '', no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), src: undefined, no: '12', title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), src: null, no: '33', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), src: [], no: '44', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), src: ['https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', 'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'], no: '122', title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), src: '', no: '333', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), src: '', no: '4444', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), src: '', no: '1222', title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), src: '', no: '33333', title: 'Wonderwall', length: '4:18' },
    ])

    function change() {
      // columns.value[3].tooltip = ['123', '234']
    }

    function onDragSortEnd(oldIndex: number, newIndex: number) {
      console.log(oldIndex, newIndex)
      move(data.value, oldIndex, newIndex)
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
    :data="data"
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
