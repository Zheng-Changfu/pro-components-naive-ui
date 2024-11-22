<markdown>
# 远程请求数据

通过请求接口数据来展示定义列表，你可以切到别的 tab 页，在切回来看看
</markdown>

<script lang="tsx">
import { NButton } from 'naive-ui'
import { type ProDescriptionColumns, useProDescriptionsInst } from 'pro-naive-ui'
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
  other: string
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { reload }] = useProDescriptionsInst()

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
        addonBefore: '前缀',
        addonAfter: '后缀',
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
      {
        title: '自定义',
        render(data) {
          return <NButton type="error">{data.other}</NButton>
        },
      },
    ]

    async function request() {
      await delay(1000)
      return {
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
        other: '按钮',
      }
    }

    return {
      reload,
      instRef,
      request,
      columns,
    }
  },
})
</script>

<template>
  <pro-card title="远程请求数据">
    <pro-descriptions
      ref="instRef"
      bordered
      :column="2"
      label-placement="left"
      :request="request"
      :columns="columns"
    />
    <template #header-extra>
      <pro-button type="primary" @click="reload">
        刷新
      </pro-button>
    </template>
  </pro-card>
</template>
