<markdown>
# 穿梭框异步数据源
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProTransferInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFetchControls }] = useProTransferInstance()
    async function fetchOptions() {
      await delay(1000)
      return Array.from({ length: 100 }).map((v, i) => ({
        label: `Option ${i}`,
        value: i,
        disabled: i % 5 === 0,
      }))
    }

    return {
      instRef,
      fetchOptions,
      getFetchControls,
    }
  },
})
</script>

<template>
  <div>
    <pro-form>
      <pro-transfer
        ref="instRef"
        label="穿梭框"
        path="transfer"
        :fetch-config="{
          immediate: false,
          api: fetchOptions,
        }"
      />
    </pro-form>
    <n-button
      type="primary"
      @click="getFetchControls().run()"
    >
      请求数据
    </n-button>
  </div>
</template>
