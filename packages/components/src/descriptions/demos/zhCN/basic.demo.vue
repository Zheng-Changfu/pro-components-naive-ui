<markdown>
# columns 配置

`valueType` 代表的是组件类型，比如 `valueType` 为 `date`，会通过 `valueTypeMap` 找到组件，然后使用该组件将值进行格式化后展示，默认为 `input`，
考虑到包体积问题，`valueTypeMap` 需用户手动在全局提供，[详情查看](config-provider)
</markdown>

<script lang="tsx">
import type { ProDescriptionColumns } from 'pro-naive-ui'
import { defineComponent } from 'vue'

interface DataSource {
  date: number
  time: number
  text: string
  switch: boolean
  dateTimeRange: [number, number]
  nestObject: {
    customFormat: number
  }
}

export default defineComponent({
  setup() {
    const data = ref<DataSource>({
      date: Date.now(),
      time: Date.now(),
      text: '我是一段没用的文本',
      switch: true,
      dateTimeRange: [
        Date.now(),
        Date.now(),
      ],
      nestObject: {
        customFormat: Date.now(),
      },
    })

    const columns: ProDescriptionColumns<DataSource> = [
      {
        title: '日期',
        path: 'date',
        valueType: 'date',
        tooltip: '日期',
      },
      {
        title: '时间',
        path: 'time',
        valueType: 'time',
      },
      {
        title: '文本',
        path: 'text',
      },
      {
        title: '开关',
        path: 'switch',
        valueType: 'switch',
      },
      {
        title: '日期范围',
        path: 'dateTimeRange',
        valueType: 'date-time-range',
        tooltip: ['日期1', '日期2'],
      },
      {
        title: '自定义格式化时间',
        path: 'nestObject.customFormat',
        valueType: 'date',
        fieldProps: {
          format: 'yyyy.MM.dd HH.mm.ss',
        },
      },
    ]

    return {
      data,
      columns,
    }
  },
})
</script>

<template>
  <pro-descriptions bordered :data="data" :columns="columns" />
</template>
