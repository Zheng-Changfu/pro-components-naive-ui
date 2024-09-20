<markdown>
# 手动更新值
使用`on-input-value`手动更新值，比如以下例子：输入值进行二次确认处理
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function toConfirm(value: Ref<string>, inputValue: string) {
      // eslint-disable-next-line no-alert
      const success = confirm(`should confirm input: ${inputValue} ?`)
      if (success) {
        value.value = inputValue
      }
    }

    return {
      toConfirm,
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
      @input-value="toConfirm"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
