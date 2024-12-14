<markdown>
# 空内容

当内容为空时显示的内容,默认为`'-'`,支持[所有的表单项](field)、[数据表格](data-table)、[简约组件](plain),可以是字符串或者函数,
当为函数时接收一个参数 `wrappedIn`,代表了当前组件被包裹在哪个组件中
</markdown>

<script lang="tsx">
import type { ProDataTableColumns, WrappedIn } from 'pro-naive-ui'
import { createProModalForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const columns = ref<ProDataTableColumns>([
      {
        title: 'No',
        path: 'no',
        width: 80,
        tooltip: ['123', '123'],
      },
    ])

    const data = ref([
      { now: Date.now(), no: '3' },
      { now: Date.now(), no: '' },
      { now: Date.now(), no: '' },
      { now: Date.now(), no: [] },
      { now: Date.now(), no: undefined },
      { now: Date.now(), no: null },
      { now: Date.now(), no: '33333' },
    ])

    return {
      data,
      columns,
      emptyRender: (wrappedIn: WrappedIn) => {
        if (wrappedIn === 'form') {
          return <span class="color-red">内容为空</span>
        }
        if (wrappedIn === 'data-table') {
          return '空数据'
        }
        return '-'
      },
      form: createProModalForm(),
    }
  },
})
</script>

<template>
  <pro-config-provider :empty="emptyRender">
    <pro-modal-form
      readonly
      :form="form"
      title="空内容"
      preset="card"
      label-width="60"
      label-placement="left"
    >
      <pro-input title="用户名" path="name" />
      <pro-digit title="年龄" path="age" />
    </pro-modal-form>
    <n-button class="mb-12px" type="primary" @click="form.open">
      打开弹窗
    </n-button>
    <pro-data-table
      :data="data"
      :columns="columns"
      :row-key="row => row.no"
    />
  </pro-config-provider>
</template>
