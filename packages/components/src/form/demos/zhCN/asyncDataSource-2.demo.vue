<markdown>
# 异步数据源-2

使用 `watch` 实现异步数据源，这种方式适合于表单项分散在不同组件中
</markdown>

<script lang="tsx">
import { createProForm, ProSelect, useInjectProForm } from 'pro-components-naive-ui'
import { defineComponent, ref, watch } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const LinkageComp = defineComponent({
  render() {
    return (
      <ProSelect
        title="联动选择框"
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

    /**
     * 当上层使用了 createProForm 时，在子组件中可以使用 useInjectProForm 注入
     */
    const {
      getFieldValue: get,
    } = useInjectProForm<{ linkage: number }>()!

    async function reqAsyncOptions(val: number) {
      console.log(val)
      loading.value = true
      await delay(1000)
      options.value = [
        { label: '北京', value: 0 },
        { label: '上海', value: 1 },
      ]
      loading.value = false
    }

    watch(
      () => get('linkage'),
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
        title="异步选择框"
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
    return {
      form: createProForm({
        onSubmit: console.log,
      }),
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
    <LinkageComp />
    <AsyncOptionsComp />
    <n-button attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
