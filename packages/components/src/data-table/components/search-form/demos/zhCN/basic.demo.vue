<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { ProSearchFormColumns } from 'pro-components-naive-ui'
import { useProSearchFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { toggleCollapsed, restoreFieldsValue, getFieldsValue }] = useProSearchFormInst()
    const columns: ProSearchFormColumns = [
      {
        title: '姓名',
        path: 'name',
      },
      {
        title: '姓名1',
        path: 'name1',
      },
      {
        title: '姓名2',
        path: 'name2',
      },
      {
        title: '姓名3',
        path: 'name3',
      },
      {
        title: '姓名4',
        path: 'name4',
        valueType: 'select',
      },
      {
        title: '姓名5',
        path: 'name5',
      },
      {
        title: '姓名',
        path: 'name',
      },
      {
        title: '姓名1',
        path: 'name1',
      },
      {
        title: '姓名2',
        path: 'name2',
      },
      {
        title: '姓名3',
        path: 'name3',
      },
      {
        title: '姓名4',
        path: 'name4',
        valueType: 'select',
      },
      {
        title: '姓名5',
        path: 'name5',
      },
      {
        title: '姓名',
        path: 'name',
      },
      {
        title: '姓名1',
        path: 'name1',
      },
      {
        title: '姓名2',
        path: 'name2',
      },
      {
        title: '姓名3',
        path: 'name3',
      },
      {
        title: '姓名4',
        path: 'name4',
        valueType: 'select',
      },
      {
        title: '姓名5',
        path: 'name5',
      },
    ]

    return {
      columns,
      instRef,
      toggleCollapsed,
      restoreFieldsValue,
      getFieldsValue,
    }
  },
})
</script>

<template>
  <pro-search-form
    ref="instRef"
    :columns="columns"
    @search="console.log"
  />
</template>
