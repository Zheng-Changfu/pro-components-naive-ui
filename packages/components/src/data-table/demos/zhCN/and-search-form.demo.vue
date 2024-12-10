<markdown>
# 搭配查询表单
</markdown>

<script lang="tsx">
import type { ProDataTableColumns, ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm, renderCopyableText, renderDateText, renderImages, renderTags } from 'pro-naive-ui'
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
        render: row => renderCopyableText(row.title),
      },
      {
        title: 'tags',
        render: row => renderTags(row.title),
      },
      {
        title: '日期格式化',
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

    const searchColumns: ProSearchFormColumns<{
      name: string
      endTime: number
      createTime: number
      responseTime: number
    }> = [
      {
        title: '名称',
        path: 'name',
      },
      {
        title: '创建时间',
        path: 'createTime',
        valueType: 'date',
      },
      {
        title: '响应时间',
        path: 'responseTime',
        valueType: 'date',
      },
      {
        title: '响应时间',
        path: 'responseTime',
        valueType: 'date',
      },
    ]

    const {
      run,
      data,
      total,
      current,
      loading,
      pageSize,
    } = usePagination(fetchList)

    const searchForm = createProSearchForm({
      onSubmit(values) {
        run(values)
      },
    })

    return {
      data,
      total,
      columns,
      current,
      loading,
      pageSize,
      searchColumns,
      form: searchForm,
      height: ref(500),
    }
  },
})
</script>

<template>
  <div class="mb-24px">
    <span>表格高度自适应:</span>
    <n-slider
      v-model:value="height"
      :min="500"
      :max="900"
      :step="100"
      class="max-w-180px"
    />
  </div>
  <div class="flex flex-col" :style="{ height: `${height}px` }">
    <pro-search-form
      :form="form"
      label-placement="top"
      :columns="searchColumns"
    />
    <pro-data-table
      title="查询表格"
      remote
      flex-height
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
  </div>
</template>
