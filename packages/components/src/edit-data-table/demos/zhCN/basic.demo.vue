<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { NButton, NFlex } from 'naive-ui'
import { useProEditDataTableInst } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const [
      instRef,
      {
        remove,
        startEditable,
        cancelEditable,
        cancelEditableWithRestore,
      },
    ] = useProEditDataTableInst()

    const columns = [
      {
        title: 'No',
        key: 'no',
        tooltip: ['123', '123'],
        width: 200,
        fieldProps: {
          style: {
            background: '{{ $row.title }}',
          },
        },
        proFieldProps: {
          required: true,
        },
      },
      {
        title: '时间',
        key: 'now',
        valueType: 'date-time',
        width: 200,
      },
      {
        title: 'Title',
        key: 'title',
        width: 200,
      },
      {
        title: 'Length',
        key: 'length',
        width: 200,
      },
      {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        render(_, index, { editable }) {
          const buttonDoms = editable
            ? [
                <NButton text={true} type="primary" onClick={() => cancelEditable(index)}>保存</NButton>,
                <NButton text={true} type="primary" onClick={() => cancelEditableWithRestore(index)}>取消</NButton>,
              ]
            : [
                <NButton text={true} type="primary" onClick={() => startEditable(index)}>编辑</NButton>,
                <NButton text={true} type="error" onClick={() => remove(index)}>删除</NButton>,
              ]
          return <NFlex justify="center">{buttonDoms}</NFlex>
        },
      },
    ]

    const data = [
      { now: Date.now(), no: '3', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: '4', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), no: '12', title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), no: '33', title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: '44', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), no: '122', title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: 333, title: 'Wonderwall', length: '4:18' },
      // { now: Date.now(), no: 4444, title: 'Don\'t Look Back in Anger', length: '4:48' },
      // { now: Date.now(), no: 1222, title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: 33333, title: 'Wonderwall', length: '4:18' },
    ]

    function request() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            list: data,
            total: 210,
          })
        }, 2000)
      })
    }

    return {
      data,
      instRef,
      request,
      columns,
    }
  },
})
</script>

<template>
  <pro-form
    :initial-values="{
      list: data,
    }"
    @submit="console.log"
  >
    <pro-input
      title="名称" path="name" :field-props="{
        style: {
          background: '{{ $vals.list && $vals.list[0].no }}',
        },
      }"
    />
    <pro-edit-data-table
      ref="instRef"
      hidden="{{ $vals.name === '123' }}"
      readonly
      title="爱好"
      path="list"
      :scroll-x="200"
      :columns="columns"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
