<markdown>
# 基本使用

`valueType` 代表要被渲染的组件, 默认为 `'input'`
</markdown>

<script lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

interface Info {
  appName: string
  appStatus: string
  createTime: number
  responseDate: number
  endTime: number
}

export default defineComponent({
  setup() {
    const form = createProSearchForm<Info>({
      defaultCollapsed: true, // 默认收起
      onReset: console.log,
      onSubmit: console.log,
    })

    const columns: ProSearchFormColumns<Info> = [
      {
        title: '应用名称',
        path: 'appName',
      },
      {
        title: '创建时间',
        path: 'createTime',
        valueType: 'date',
      },
      {
        title: '应用状态',
        path: 'appStatus',
      },
      {
        title: '响应日期',
        path: 'responseDate',
        valueType: 'date-time',
      },
      {
        title: '结束日期',
        path: 'endTime',
        valueType: 'date',
      },
    ]

    return {
      form,
      columns,
      layout: ref<'left' | 'top'>('left'),
    }
  },
})
</script>

<template>
  <div class="mb-12px flex">
    <div class="mr-12px">
      布局方式:
    </div>
    <n-radio-group v-model:value="layout">
      <n-radio label="水平" value="left" />
      <n-radio label="垂直" value="top" />
    </n-radio-group>
  </div>
  <pro-card title="搜索表单">
    <pro-search-form
      :form="form"
      :columns="columns"
      :label-placement="layout"
    />
  </pro-card>
</template>
