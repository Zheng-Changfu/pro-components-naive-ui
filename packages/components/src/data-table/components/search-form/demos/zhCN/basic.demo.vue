<markdown>
# 基本使用

你可以享受 `ProForm` 及 `ProField` 的所有功能，只是换成了配置化的方式，快来尝试吧！
</markdown>

<script lang="tsx">
import { ProInput, type ProSearchFormColumns } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

interface Info {
  name: string
  age: number
  status: 0 | 1 | 2
  date: number
  time: number
  info: {
    dateRange: [number, number]
  }
  city: number
  color: string
}

export default defineComponent({
  setup() {
    const options = ref<any[]>([])
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
        hidden: '{{$vals.name === \'123\'}}',
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
          return (
            <ProInput
              path="render"
              title="自定义render"
              fieldProps={{
                style: {
                  background: '{{ $self ? $self : $vals.color }}',
                },
              }}
            />
          )
        },
      },
      {
        title: '颜色-联动',
        path: 'color',
        fieldProps: {
          style: {
            background: '{{ $self ? $self : $vals.render }}',
          },
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
      options,
      columns,
    }
  },
})
</script>

<template>
  <pro-card title="搜索表单" :show-collapse="false">
    <pro-search-form
      :scope="{
        options,
      }"
      :columns="columns"
      :grid-props="{
        collapsed: false,
      }"
      @search="console.log"
      @collapse="console.log"
      @reset="console.log('reset')"
    />
  </pro-card>
</template>
