<markdown>
# 后置状态回调
值的所有改变都会触发此回调，你可以用这个钩子返回一个新的值作为最终结果，
这在你封装自定义组件或者解析后端传来的杂七杂八数据格式时非常有用
</markdown>

<script lang="tsx">
import { isArray } from 'lodash-es'
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const loading = ref(false)
    const form = createProForm({
      onSubmit: console.log,
    })

    function convertDate(val: null | [number, number] | { startDate: string, endDate: string }) {
      console.log(val)
      if (val && !isArray(val)) {
        return [val.startDate, val.endDate]
      }
      return val
    }

    async function fetchUpdateFuckBackendData() {
      loading.value = true
      await delay(1500)
      form.setFieldValue('date', {
        startDate: '2024-12-05',
        endDate: '2024-12-06',
      })
      loading.value = false
    }

    return {
      form,
      loading,
      convertDate,
      fetchUpdateFuckBackendData,
    }
  },
})
</script>

<template>
  <n-button :loading="loading" @click="fetchUpdateFuckBackendData">
    请求更新不标准的数据格式
  </n-button>
  <pro-form :form="form" label-width="auto">
    <pro-date-range title="日期" path="date" :post-value="convertDate" />
  </pro-form>
</template>
