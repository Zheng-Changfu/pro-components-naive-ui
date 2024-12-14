<markdown>
# 默认用法

`useRequest` 的第一个参数是一个异步函数，在组件初次加载时，会自动触发该函数执行。同时自动管理该异步函数的 `loading` , `data` , `error` 等状态。
</markdown>

<script lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { defineComponent } from 'vue'

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

export default defineComponent({
  setup() {
    const { data, error, loading } = useRequest(getUsername)
    return {
      data,
      error,
      loading,
    }
  },
})
</script>

<template>
  <div v-if="error">
    failed to load
  </div>
  <div v-else-if="loading">
    loading...
  </div>
  <div v-else>
    Username: {{ data }}
  </div>
</template>
