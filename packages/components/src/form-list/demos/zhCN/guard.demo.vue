<markdown>
# 增删守卫
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    async function beforeAddRow(opt: { index: number, insertIndex: number, total: number }) {
      console.log(opt)
      await delay(1000)
      return Math.random() < 0.5
    }

    async function beforeRemoveRow(opt: { index: number, total: number }) {
      console.log(opt)
      await delay(1000)
      return Math.random() < 0.5
    }

    return {
      beforeAddRow,
      beforeRemoveRow,
    }
  },
})
</script>

<template>
  <pro-form>
    <pro-form-list
      label="用户信息"
      path="userInfo"
      only-show-first-item-label
      :action-guard="{
        beforeAddRow,
        beforeRemoveRow,
      }"
    >
      <pro-input
        label="姓名"
        path="name"
      />
      <pro-digit
        label="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
