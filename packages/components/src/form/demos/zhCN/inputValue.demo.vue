<markdown>
# 手动更新值
使用`on-input-value`手动更新值，比如以下例子：输入值进行二次确认处理
</markdown>

<script lang="tsx">
import type { Ref } from 'vue'
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function confirmUpdateValue(fieldValue: Ref<string>, inputValue: string) {
      // eslint-disable-next-line no-alert
      const success = confirm(`是否确认输入: ${inputValue} ?`)
      if (success) {
        fieldValue.value = inputValue
      }
    }

    return {
      confirmUpdateValue,
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
    <pro-input
      title="name"
      path="name"
      required
      @input-value="confirmUpdateValue"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
