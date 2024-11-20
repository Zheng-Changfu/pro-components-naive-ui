<markdown>
# 新建一行的默认值

必须要是一个函数哦~，原因和 `Vue2 data 必须是一个函数` 同理！
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    return {
      form: createProForm(),
    }
  },
})
</script>

<template>
  <pro-form :form="form">
    <pro-form-list
      title="用户信息"
      path="userInfo"
      only-show-first-item-label
      :initial-value="[
        { name: 'zcf', age: 26 },
        { name: 'zzx', age: 0.5 },
        { name: 'cxh', age: 28 },
      ]"
      :creator-initial-value="() => ({ name: 'Name', age: 0 })"
    >
      <pro-input
        title="姓名"
        path="name"
      />
      <pro-digit
        title="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
