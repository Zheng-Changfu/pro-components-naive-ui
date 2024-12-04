<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { NButton, NFlex } from 'naive-ui'
import { createProForm, uid } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const data = [
      { id: uid(), now: Date.now(), no: '', title: 'Wonderwall', length: '4:18' },
      { id: uid(), now: Date.now(), no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { id: uid(), now: Date.now(), no: '', title: 'Champagne Supernova', length: '7:27' },
      { id: uid(), now: Date.now(), no: '', title: 'Wonderwall', length: '4:18' },
      { id: uid(), now: Date.now(), no: '', title: 'Don\'t Look Back in Anger', length: '4:48' },
      { id: uid(), now: Date.now(), no: '', title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: 333, title: 'Wonderwall', length: '4:18' },
      // { now: Date.now(), no: 4444, title: 'Don\'t Look Back in Anger', length: '4:48' },
      // { now: Date.now(), no: 1222, title: 'Champagne Supernova', length: '7:27' },
      // { now: Date.now(), no: 33333, title: 'Wonderwall', length: '4:18' },
    ]

    const form = createProForm({
      initialValues: {
        list: data,
      },
      onSubmit: console.log,
    })

    const columns: ProEditDataTableColumns = [
      {
        title: 'No',
        key: 'no',
        tooltip: ['123', '123'],
        width: 200,
        fieldProps(row) {
          return {
            style: {
              background: row.title,
            },
          }
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
        render(_, index, {
          remove,
          editable,
          startEditable,
          cancelEditable,
          cancelEditableAndRestore,
        }) {
          const buttonDoms = editable
            ? [
                <NButton text={true} type="primary" onClick={() => cancelEditable(index)}>保存</NButton>,
                <NButton text={true} type="primary" onClick={() => cancelEditableAndRestore(index)}>取消</NButton>,
              ]
            : [
                <NButton text={true} type="primary" onClick={() => startEditable(index)}>编辑</NButton>,
                <NButton text={true} type="error" onClick={() => remove(index)}>删除</NButton>,
              ]
          return <NFlex justify="center">{buttonDoms}</NFlex>
        },
      },
    ]

    return {
      form,
      data,
      columns,
      get: form.getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left">
    <div class="flex flex-col">
      <pro-input
        title="名称"
        path="name"
        :field-props="{
          style: {
            background: get('list.0.no'),
          },
        }"
      />
      <pro-edit-data-table
        readonly
        title="爱好"
        path="list"
        :scroll-x="200"
        :columns="columns"
        :row-key="row => row.id"
        :hidden="get('name') === '123'"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
