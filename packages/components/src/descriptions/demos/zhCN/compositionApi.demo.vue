<markdown>
# CompositionApi 方式

为了更好的支持 `typescript`，你可以使用 `compositionApi` 的方式来定义 `props`，这时绝大部分类型内部都会自动推导，
如果你想要传递响应式数据，你可以给 `useProDescriptions` 传递一个函数
</markdown>

<script lang="tsx">
import { NButton, useMessage } from 'naive-ui'
import { useProDescriptions } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const message = useMessage()
    /**
     * 如果你想要传递响应式数据
     * useProDescriptions(() => {
     *  return {
     *    ...props
     *  }
     * })
     */
    const [proDescriptionsProps, { reload }] = useProDescriptions({
      column: 2,
      bordered: true,
      labelPlacement: 'left',
      // data: {
      //   date: Date.now(),
      //   time: Date.now(),
      //   text: '我是一段没用的文本',
      //   switch: true,
      //   dateTimeRange: [
      //     Date.now(),
      //     Date.now(),
      //   ],
      //   nestObject: {
      //     customFormat: Date.now(),
      //   },
      //   other: '按钮',
      // },
      request,
      columns: [
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
      ],
      // transform(res) {
      //   return res.switch
      // },
      onRequestSuccess(res) {
        console.log(res)
        message.success(`牛会哞，马会啸，牛马会收到`)
      },
    })

    async function request() {
      await delay(1000)
      return {
        date: Date.now(),
        time: Date.now(),
        text: '我是一段没用的文本',
        switch: true,
        other: '按钮',
        dateTimeRange: [
          Date.now(),
          Date.now(),
        ],
        nestObject: {
          customFormat: Date.now(),
        },
      }
    }

    return {
      reload,
      proDescriptionsProps,
    }
  },
})
</script>

<template>
  <pro-card title="远程请求数据" :show-collaspe="false">
    <pro-descriptions v-bind="proDescriptionsProps" />
    <template #header-extra>
      <pro-button type="primary" @click="reload">
        刷新
      </pro-button>
    </template>
  </pro-card>
</template>
