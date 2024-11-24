<markdown>
# 异步数据源-1

使用 `@change` 实现异步数据源，这种方式适合于表单项在同一个组件中
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const loading = ref(false)
    const options = ref<any[]>([])
    const form = createProForm<{ select: number }>({
      onSubmit: console.log,
    })

    async function fetchOptions(val: number) {
      console.log(val)
      loading.value = true
      await delay(1000)
      options.value = [
        { label: '北京', value: 0 },
        { label: '上海', value: 1 },
      ]
      loading.value = false
    }

    return {
      form,
      loading,
      options,
      fetchOptions,
    }
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
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
      @change="fetchOptions"
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
