<markdown>
# 动态属性

有些时候,你的数据可能是动态获取的,如果是动态的[通用属性](field#通用的属性),需要写在 `proFieldProps` 中,如果是动态的 `fieldProps`,
你可以写成一个函数
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
  city: number
  appName2: string
}

export default defineComponent({
  setup() {
    const citys = ref<any[]>([])
    const title = ref('动态通用属性')

    const form = createProSearchForm<Info>({
      onReset: console.log,
      onSubmit: console.log,
    })

    const columns: ProSearchFormColumns<Info> = [
      {
        title: '动态数据',
        path: 'city',
        valueType: 'select',
        fieldProps() {
          return {
            options: citys.value,
          }
        },
      },
      {
        path: 'appName2',
        proFieldProps() {
          return {
            title: title.value,
          }
        },
        onChange: (val) => {
          if (val.length > 6) {
            title.value = val.slice(0, 6)
          }
          else if (val.length <= 0) {
            title.value = '动态通用属性'
          }
          else {
            title.value = val
          }
        },
      },
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

    setTimeout(() => {
      citys.value = [
        { label: '北京', value: 0 },
        { label: '上海', value: 1 },
      ]
    }, 2000)

    return {
      form,
      columns,
      layout: ref<'left' | 'top'>('left'),
    }
  },
})
</script>

<template>
  <pro-card title="动态属性">
    <pro-search-form
      :form="form"
      :columns="columns"
      label-width="100"
    />
  </pro-card>
</template>
