<markdown>
# 基本使用

你可以享受 `ProForm` 及 `ProField` 的所有功能，只是换成了配置化的方式，快来尝试吧！
</markdown>

<script lang="tsx">
import type { ProSearchFormColumns } from 'pro-naive-ui'
import { createProSearchForm, ProInput } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

interface Info {
  name: string
  age: number
  status: 0 | 1 | 2
  date: number
  time: number
  render: string
  info: {
    dateRange: [number, number]
  }
  city: number
  color: string
}

export default defineComponent({
  setup() {
    const options = ref<any[]>([])
    const form = createProSearchForm<Info>({
      defaultCollapsed: true,
      onReset: console.log,
      onSubmit: console.log,
    })
    const columns: ProSearchFormColumns<Info> = [
      {
        title: '姓名',
        path: 'name',
      },
      {
        title: '年龄',
        path: 'age',
        initialValue: 18,
        valueType: 'digit',
      },
      {
        title: '状态',
        path: 'status',
        valueType: 'select',
        fieldProps: {
          options: [
            { label: '正常', value: 0 },
            { label: '异常', value: 1 },
            { label: '离职', value: 2 },
          ],
        },
      },
      {
        title: '城市-异步',
        path: 'city',
        valueType: 'select',
        fieldProps() {
          return {
            options: options.value,
          }
        },
      },
      {
        title: '日期',
        path: 'date',
        valueType: 'date',
      },
      {
        title: '时间',
        path: 'time',
        valueType: 'time',
        fieldSlots: {
          'addon-after': () => <div class="color-red min-w-40px">slot</div>,
        },
      },
      {
        title: '日期时间',
        path: 'info.dateRange',
        valueType: 'date-time',
      },
      {
        render() {
          const selfValue = form.getFieldValue('render')
          const background = selfValue || form.getFieldValue('color')
          return (
            <ProInput
              path="render"
              title="自定义render"
              fieldProps={{
                style: {
                  background,
                },
              }}
            />
          )
        },
      },
      {
        title: '颜色-联动',
        path: 'color',
        fieldProps() {
          const selfValue = form.getFieldValue('color')
          const background = selfValue || form.getFieldValue('render')
          return {
            style: {
              background,
            },
          }
        },
      },
    ]

    setTimeout(() => {
      options.value = [
        { label: '全国', value: 0 },
        { label: '北京', value: 1 },
      ]
    }, 3000)

    return {
      form,
      columns,
    }
  },
})
</script>

<template>
  <pro-card title="搜索表单">
    <pro-search-form
      :form="form"
      :columns="columns"
    />
  </pro-card>
</template>
