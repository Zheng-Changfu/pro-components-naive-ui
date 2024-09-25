<markdown>
# 手动更新值
使用`on-input-value`手动更新值，比如以下例子：输入值进行二次确认处理
</markdown>

<script lang="tsx">
import type { Ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function toConfirmUpdateValue(fieldValue: Ref<string>, inputValue: string) {
      // eslint-disable-next-line no-alert
      const success = confirm(`是否确认输入: ${inputValue} ?`)
      if (success) {
        fieldValue.value = inputValue
      }
    }

    return {
      toConfirmUpdateValue,
    }
  },
})
</script>

<template>
  <pro-form
    label-placement="left"
    label-width="auto"
    @submit="console.log"
  >
    <pro-input
      title="name"
      path="name"
      required
      @input-value="toConfirmUpdateValue"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
