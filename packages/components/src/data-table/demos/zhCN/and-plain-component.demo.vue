<markdown>
# 搭配简约组件使用
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
      {
        title: 'No',
        path: 'no',
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
    row-key="no"
  />
</template>
