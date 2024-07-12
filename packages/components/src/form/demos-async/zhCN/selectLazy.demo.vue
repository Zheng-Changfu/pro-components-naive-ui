<markdown>
# 选择器懒加载数据源

设置 `fieldProps.remote` 为 true，搜索才会触发请求，设置 `fetchConfig.debounceTime` 控制触发频率，默认 `500ms`，如果不满足你的需求，你可以自定义 `onSearch`
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { uid, useProSelectInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFetchControls }] = useProSelectInstance()
    async function fetchCitys(query: string) {
      console.log(query, 'query')
      await delay(1000)
      return [
        { label: `北京_${uid(4)}`, value: 0 },
        { label: `上海_${uid(4)}`, value: 1 },
        { label: `深圳_${uid(4)}`, value: 2, disabled: true },
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
  <pro-form>
    <pro-select
      ref="instRef"
      label="城市"
      path="citys"
      :field-props="{
        remote: true,
        filterable: true,
      }"
      :fetch-config="{
        api: fetchCitys,
        immediate: false,
        debounceTime: 1000,
      }"
    />
  </pro-form>
</template>
