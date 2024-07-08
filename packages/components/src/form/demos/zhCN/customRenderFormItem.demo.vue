<markdown>
# 自定义渲染FormItem

组件的 `renderFormItem` 属性优先级比表单的 `renderFormItem` 高，你可以单独对某一个组件使用，也可以针对整个表单使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { FormItemProps } from 'naive-ui'
import { NFormItemGi } from 'naive-ui'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    function renderFormItemGi(
      opt: {
        bindValues: FormItemProps
        bindSlots: Record<string, any>
      },
    ) {
      const {
        bindSlots,
        bindValues,
      } = opt
      return <NFormItemGi {...bindValues} v-slots={bindSlots} span={12}></NFormItemGi>
    }

    return {
      renderFormItemGi,
    }
  },
})
</script>

<template>
  <pro-form label-placement="left" label-width="auto" :render-form-item="renderFormItemGi">
    <n-grid :cols="24" :gap="[12, 12]">
      <pro-input label="用户名" path="username" />
      <pro-password label="密码" path="password" />
      <pro-digit label="数字" path="digit" />
      <pro-textarea label="文本域" path="textarea" />
    </n-grid>
  </pro-form>
</template>
