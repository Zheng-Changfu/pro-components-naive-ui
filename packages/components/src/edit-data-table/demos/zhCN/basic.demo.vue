<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const columns = [
      {
        title: 'No',
        key: 'no',
        tooltip: ['123', '123'],
      },
      {
        title: '时间',
        key: 'now',
        valueType: 'date-time',
      },
      {
        title: 'Title',
        key: 'title',
      },
      {
        title: 'Length',
        key: 'length',
      },
    ]

    const data = [
      { now: Date.now(), no: 3, title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: 4, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), no: 12, title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), no: 33, title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: 44, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), no: 122, title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), no: 333, title: 'Wonderwall', length: '4:18' },
      { now: Date.now(), no: 4444, title: 'Don\'t Look Back in Anger', length: '4:48' },
      { now: Date.now(), no: 1222, title: 'Champagne Supernova', length: '7:27' },
      { now: Date.now(), no: 33333, title: 'Wonderwall', length: '4:18' },
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
      request,
      columns,
    }
  },
})
</script>

<template>
  <pro-form
    :initial-value="{
      list: data,
    }"
    validateBehavior="popover"
    @submit="console.log"
  >
    <pro-input title="名称" path="name" />
    <pro-edit-data-table
      title="爱好" path="list" :columns="columns" :value="data"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
