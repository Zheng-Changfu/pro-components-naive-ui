<markdown>
# 函数使用方式

它常常会用在表格列的 `render` 函数中,他们不重,所以不需要考虑性能问题
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
        render: row => renderCopyableText(row.title),
      },
      {
        title: 'tags',
        render: row => Math.random() < 0.5
          ? renderTags(row.title)
          : renderTags([
              {
                type: 'info',
                content: row.title,
              },
            ]),
      },
      {
        title: '日期格式化',
        render: row => renderDateText(row.now, {
          pattern: Math.random() < 0.5 ? 'time' : 'week',
        }),
      },
      {
        title: '图片',
        width: 200,
        render: row => renderImages(row.src),
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
    title="简约组件"
    tooltip="plain component"
    :data="data"
    :columns="columns"
    row-key="no"
  />
</template>
