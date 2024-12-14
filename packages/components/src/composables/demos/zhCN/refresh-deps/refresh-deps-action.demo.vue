<markdown>
# 自定义刷新行为
</markdown>

<script lang="tsx">
import { isNumber } from 'lodash-es'
import Mock from 'mockjs'
import { useRequest } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function getUsername(id: number): Promise<string> {
  console.log('getUsername id:', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

export default defineComponent({
  setup() {
    const userId = ref()
    const { data, loading, run } = useRequest((id: number) => getUsername(id), {
      refreshDeps: [userId],
      refreshDepsAction: () => {
        if (!isNumber(userId.value)) {
          console.log(
            `parameter "userId" expected to be a number, but got ${typeof userId.value}.`,
            userId.value,
          )
          return
        }
        run(userId.value)
      },
    })

    return {
      run,
      data,
      userId,
      loading,
    }
  },
})
</script>

<template>
  <p>Username: {{ loading ? 'Loading' : data }}</p>
  <div>
    <n-button @click="userId = Math.random()">
      Use latest id to refresh (by `refreshDeps`)
    </n-button>
  </div>
  <div class="mt-16px">
    <n-button @click="run(Math.random())">
      Use latest id to refresh (by `run`)
    </n-button>
  </div>
</template>
