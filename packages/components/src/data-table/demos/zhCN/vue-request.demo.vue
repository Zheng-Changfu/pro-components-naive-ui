<markdown>
# 异步

我们封装了 [useNDataTable](XXXXX) 帮助你轻松对接 `NDataTable`
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderCopyableText, renderDateText, renderImages, renderTags, useNDataTable } from 'pro-naive-ui'
import { computed, defineComponent, ref } from 'vue'

function fetchList(params: any) {
  console.log(params, '@@@')
  return new Promise<{ total: number, list: any[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        total: 987,
        list: [
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
        ],
      })
    }, 1500)
  })
}

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

    const { tableProps } = useNDataTable(fetchList)

    const x = computed(() => {
      const { pagination, ...rest } = tableProps.value
      return {
        ...rest,
        pagination: {
          ...pagination,
          showSizePicker: true,
          pageSizes: [10, 20, 30, 40],
        },
      }
    })

    return {
      x,
      columns,
      tableProps,
    }
  },
})
</script>

<template>
  <pro-data-table
    title="远程数据"
    :columns="columns"
    :row-key="row => row.no"
    v-bind="x"
  />
</template>
