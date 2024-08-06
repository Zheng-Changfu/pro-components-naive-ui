<markdown>
# 自定义渲染控件

可能在某些时候你需要它，比如你自己封装了一些组件想接入...
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import type { InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { submit }] = useProFormInst()

    function onSubmit(values: any) {
      console.log(values)
    }

    function renderInput(
      opt: {
        bindProps: InputProps
        bindSlots: Record<string, any>
      },
    ) {
      const {
        bindSlots,
        bindProps,
      } = opt
      return (
        <NInput {...bindProps} class="bg-red" v-slots={bindSlots} />
      )
    }

    return {
      instRef,
      submit,
      onSubmit,
      renderInput,
    }
  },
})
</script>

<template>
  <pro-form
    ref="instRef"
    label-placement="left"
    label-width="auto"
    @submit="onSubmit"
  >
    <pro-input label="用户名" path="username" required :field-render="renderInput" />
    <pro-password label="密码" path="password" required />
    <n-button type="primary" @click="submit">
      提交
    </n-button>
  </pro-form>
</template>
