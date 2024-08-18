<markdown>
# 异步数据源-2

使用 `watch` 实现异步数据源，这种方式适合于表单项分散在不同组件中
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'
import { ProSelect, useInjectProFormInst, useProFormInst } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const LinkageComp = defineComponent({
  render() {
    return (
      <ProSelect
        label="联动选择框"
        path="linkage"
        field-props={{
          options: [
            { label: '显示', value: 1 },
            { label: '隐藏', value: 0 },
          ],
        }}
      />
    )
  },
})

const AsyncOptionsComp = defineComponent({
  setup() {
    const loading = ref(false)
    const options = ref<any[]>([])
    const { getFieldValue, restoreFieldValue } = useInjectProFormInst()

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

    watch(
      () => getFieldValue('linkage'),
      reqAsyncOptions,
    )

    return {
      loading,
      options,
    }
  },
  render() {
    return (
      <ProSelect
        label="异步选择框"
        path="select"
        field-props={{
          loading: this.loading,
          options: this.options,
        }}
      />
    )
  },
})

export default defineComponent({
  components: {
    LinkageComp,
    AsyncOptionsComp,
  },
  setup() {
    const [instRef, { submit }] = useProFormInst()

    return {
      instRef,
      submit,
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
    <LinkageComp />
    <AsyncOptionsComp />
    <n-button @click="submit">
      提交
    </n-button>
  </pro-form>
</template>
