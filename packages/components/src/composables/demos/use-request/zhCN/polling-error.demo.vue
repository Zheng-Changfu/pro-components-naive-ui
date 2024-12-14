<markdown>
# 轮询错误重试

通过 `options.pollingErrorRetryCount` 设置轮询错误重试次数。
</markdown>

<script lang="tsx">
import Mock from 'mockjs'
import { useMessage } from 'naive-ui'
import { useRequest } from 'pro-naive-ui'
import { defineComponent } from 'vue'

function getUsername() {
  console.log('polling getUsername Error')
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(Mock.mock('@name')))
    }, 1000)
  })
}

export default defineComponent({
  setup() {
    const message = useMessage()

    const { data, loading, run, cancel } = useRequest(getUsername, {
      manual: true,
      pollingInterval: 1000,
      pollingWhenHidden: false,
      pollingErrorRetryCount: 3,
      onError: (error) => {
        message.error(error.message)
      },
    })

    return {
      run,
      data,
      cancel,
      loading,
    }
  },
})
</script>

<template>
  <p>Username: {{ loading ? 'Loading' : data }}</p>
  <n-button @click="run()">
    start
  </n-button>
  <n-button class="ml-16px" @click="cancel">
    stop
  </n-button>
</template>
