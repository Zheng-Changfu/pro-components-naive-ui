<markdown>
# 异步数据源-1

使用 `@change` 实现异步数据源，这种方式适合于表单项在同一个组件中
</markdown>

<script lang="tsx">
import { useProFormInst } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const loading = ref(false)
    const options = ref<any[]>([])
    const [instRef, { restoreFieldValue }] = useProFormInst()

    async function reqAsyncOptions(val: number) {
      console.log(val)
      loading.value = true
      await delay(1000)
      options.value = [
        { label: '北京', value: 0 },
        { label: '上海', value: 1 },
      ]
      // 防止没有匹配上对应的 value
      restoreFieldValue('select')
      loading.value = false
    }

    return {
      loading,
      instRef,
      options,
      reqAsyncOptions,
    }
  },
})
</script>

<template>
  <pro-form
    ref="instRef"
    label-placement="left"
    label-width="auto"
    @submit="console.log"
  >
    <pro-select
      title="联动选择框"
      path="linkage"
      :field-props="{
        options: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ],
      }"
      @change="reqAsyncOptions"
    />
    <pro-select
      title="异步选择框"
      path="select"
      :field-props="{
        loading,
        options,
      }"
    />
    <n-button attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
