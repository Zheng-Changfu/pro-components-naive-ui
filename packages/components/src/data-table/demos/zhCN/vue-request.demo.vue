<markdown>
# 异步

这是一个使用 [VueRequest](https://cn.attojs.org/) 异步请求数据的例子,我们没有将数据源集成在封装的组件中,因为这会让你在处理一些复杂需求时很棘手,另外一方面也为了性能考虑(为了保持数据同步,不得不深度监听),总之一句话就是`数据源应该是自上而下的、用户能接触到的`
才能面对各种场景

<n-alert type="info" title="Tip" :bordered="false">
  我们有计划推出一个分页请求的 composable api
</n-alert>
</markdown>

<script lang="tsx">
import type { ProDataTableColumns } from 'pro-naive-ui'
import { renderCopyableText, renderDateText, renderImages, renderTags } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'
import { usePagination } from 'vue-request'

function fetchList(params: any) {
  console.log(params, '@@@')
  return new Promise<{ total: number, data: any[] }>((resolve) => {
    setTimeout(() => {
      resolve({
        total: 987,
        data: [
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

    const {
      data,
      total,
      current,
      loading,
      pageSize,
    } = usePagination(fetchList, {
      refreshOnWindowFocus: true,
      refocusTimespan: 1000,
    })

    return {
      data,
      total,
      columns,
      current,
      loading,
      pageSize,
    }
  },
})
</script>

<template>
  <pro-data-table
    title="远程数据"
    remote
    :data="data?.data"
    :columns="columns"
    :loading="loading"
    :row-key="row => row.no"
    :pagination="{
      pageSize,
      page: current,
      itemCount: total,
      onUpdatePage: (val) => current = val,
      onUpdatePageSize: (val) => pageSize = val,
    }"
  />
</template>
