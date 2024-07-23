<markdown>
# 自定义渲染FormItem

组件的 `formItemRender` 属性优先级比表单的 `formItemRender` 高，你可以单独对某一个组件使用，也可以针对整个表单使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { FormItemProps } from 'naive-ui'
import { NCol, NFormItem } from 'naive-ui'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values)
    }

    function formItemGiRender(
      opt: {
        bindProps: FormItemProps
        bindSlots: Record<string, any>
      },
    ) {
      const {
        bindSlots,
        bindProps,
      } = opt
      return (
        <NCol span={12}>
          <NFormItem {...bindProps} v-slots={bindSlots}></NFormItem>
        </NCol>
      )
    }

    return {
      instRef,
      submit,
      onSubmit,
      formItemGiRender,
    }
  },
})
</script>

<template>
  <pro-form
    ref="instRef"
    label-placement="left"
    label-width="auto"
    :form-item-render="formItemGiRender"
    @submit="onSubmit"
  >
    <n-row gutter="12">
      <pro-input label="用户名" path="username" />
      <pro-password label="密码" path="password" />
      <pro-digit label="数字" path="digit" />
      <pro-textarea label="文本域" path="textarea" />
      <n-button type="primary" @click="submit">
        提交
      </n-button>
    </n-row>
  </pro-form>
</template>
