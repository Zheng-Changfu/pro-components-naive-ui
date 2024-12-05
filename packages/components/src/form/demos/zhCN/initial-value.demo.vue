<markdown>
# 表单默认值

所有的表单项都支持 `value`、`initial-value`、如果想要统一配置，请设置 `initial-values`，任何直接使用组件 `v-model:xxx` 和 `default-xxx` 的方式都有可能导致值绑定失效。
他们的优先级从高到低排列 `value`、`initial-value`、`initial-values`
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      form: createProForm<Partial<{
        value: string
        initialValue: string
        initialValues: string
      }>>({
        initialValues: {
          initialValues: '使用 initialValues 属性',
        },
        onReset: console.log,
        onSubmit: console.log,
        onSubmitFailed: console.log,
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
    <pro-input
      title="value"
      path="value"
      required
      value="使用 value 属性"
    />
    <pro-input
      title="initial-value"
      path="initialValue"
      required
      initial-value="使用 initial-value 属性"
    />
    <pro-input
      title="initial-values"
      path="initialValues"
      required
    />
    <n-flex>
      <n-button attr-type="reset">
        重置到默认值
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
