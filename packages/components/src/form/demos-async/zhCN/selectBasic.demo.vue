<markdown>
# 选择器异步数据源
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProSelectInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFetchControls }] = useProSelectInstance()
    async function fetchCitys() {
      await delay(1000)
      return [
        { label: '北京', value: 0 },
        { label: '上海', value: 1 },
        { label: '深圳', value: 2, disabled: true },
      ]
    }

    return {
      instRef,
      fetchCitys,
      getFetchControls,
    }
  },
})
</script>

<template>
  <div>
    <pro-form>
      <pro-select
        ref="instRef"
        label="城市"
        path="citys"
        :fetch-config="{
          immediate: false,
          api: fetchCitys,
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
