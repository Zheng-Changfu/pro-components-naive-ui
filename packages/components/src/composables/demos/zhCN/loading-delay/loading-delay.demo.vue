<markdown>
# 避免闪烁

通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。你可以快速点击下面示例中的按钮以体验效果
</markdown>

<script lang="tsx">
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { defineComponent } from 'vue'

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 300)
  })
}

export default defineComponent({
  setup() {
    const { run, data, loading } = useRequest(getUsername, {
      loadingDelay: 300,
    })
    return {
      run,
      data,
      loading,
    }
  },
})
</script>

<template>
  <n-button @click="run()">
    run
  </n-button>
  <div>
    Username:  {{ loading ? 'Loading' : data }}
  </div>
</template>
