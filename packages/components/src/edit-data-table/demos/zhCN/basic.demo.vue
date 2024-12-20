<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import type { ProEditDataTableColumns } from 'pro-naive-ui'
import { NButton, NFlex } from 'naive-ui'
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = [
      { id: 1, now: Date.now(), no: '', title: 'Wonderwall', length: '4:18' },
      {
        id: 2,
        now: Date.now(),
        no: '',
        title: 'Don\'t Look',
        length: '4:48',
        children: [
          {
            id: 21,
            now: Date.now(),
            no: '',
            title: 'Look1',
            length: '4:48',
          },
          {
            id: 22,
            now: Date.now(),
            no: '',
            title: 'Look2',
            length: '4:48',
          },
        ],
      },
      { id: 3, now: Date.now(), no: '', title: 'Champagne', length: '7:27' },
      { id: 4, now: Date.now(), no: '', title: 'Wonderwall', length: '4:18' },
      { id: 5, now: Date.now(), no: '', title: 'Don\'t Look', length: '4:48' },
      { id: 6, now: Date.now(), no: '', title: 'Champagne', length: '7:27' },
    ]

    const editableKeys = ref([1, 2, 3, 4, 5, 6, 21, 22])

    const form = createProForm({
      initialValues: {
        name: '',
        list: data,
      },
      onSubmit: console.log,
    })

    const columns: ProEditDataTableColumns = [
      {
        title: 'No',
        path: 'no',
      },
      {
        title: '时间',
        path: 'now',
        valueType: 'date-time',
        width: 200,
      },
      {
        title: 'Title',
        path: 'title',
        valueType: 'input',
        proFieldProps: {
          required: true,
        },
      },
      {
        title: 'Length',
        path: 'length',
        valueType: 'input',
        width: 200,
      },
      {
        title: '操作',
        width: 120,
        fixed: 'right',
        render(row, index, {
          remove,
          editable,
        }) {
          const buttonDoms = editable
            ? [
                <NButton
                  text={true}
                  type="primary"
                  onClick={() => {
                    editableKeys.value = editableKeys.value.filter(key => key !== row.id)
                  }}
                >
                  保存
                </NButton>,
              ]
            : [
                <NButton
                  text={true}
                  type="primary"
                  onClick={() => editableKeys.value.push(row.id)}
                >
                  编辑
                </NButton>,
                <NButton
                  text={true}
                  type="error"
                  onClick={() => remove(index)}
                >
                  删除
                </NButton>,
              ]
          return <NFlex>{buttonDoms}</NFlex>
        },
      },
    ]

    return {
      form,
      data,
      columns,
      editableKeys,
      values: form.values,
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
      />
      <pro-edit-data-table
        v-model:editable-keys="editableKeys"
        title="爱好"
        path="list"
        :columns="columns"
        :record-creator-props="{
          record: () => ({ id: Date.now() }),
        }"
        row-key="id"
      />
    </div>
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
