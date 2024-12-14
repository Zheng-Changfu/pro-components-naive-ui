<markdown>
# 扩展的插槽
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderCopyableText, renderDateText, renderImages, renderTags } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const columns = ref<ProDataTableColumns<{ src: any, title: string, now: number }>>([
      {
        title: '可复制文本',
        width: 300,
        render: row => renderCopyableText(row.title),
      },
      {
        title: 'tags',
        width: 100,
        render: row => renderTags(row.title),
      },
      {
        title: '日期格式化',
        width: 100,
        render: row => renderDateText(row.now, {
          pattern: 'quarter',
        }),
      },
      {
        title: '图片',
        width: 200,
        render: row => renderImages(row.src),
      },
    ])

    const data = ref([
      { now: Date.now(), src: '', no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), src: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg', no: '3', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), src: undefined, no: '12', title: 'Champagne Supernova', length: '7:27' },
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
    :data="data"
    :columns="columns"
    :row-key="row => row.no"
  >
    <template #title>
      #title
    </template>
    <template #toolbar>
      #toolbar
    </template>
    <template #extra>
      #extra
    </template>
    <template #table="{ tableDom }">
      <div>#table</div>
      <component :is="tableDom" />
    </template>
  </pro-data-table>
</template>
