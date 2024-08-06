<markdown>
# 初始值的几种方式
以下几种方式，优先级由高到低
1. 使用组件的 `value` 属性
2. 使用组件的 `initialValue` 属性
3. 使用 `ProForm` 的 `initialValues` 属性
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInst()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

    return {
      submit,
      onSubmit,
      proFormInst,
    }
  },
})
</script>

<template>
  <pro-form
    ref="proFormInst"
    label-placement="left"
    label-width="auto"
    :initial-values="{
      username: 'zcf',
    }"
    @submit="onSubmit"
  >
    <pro-input
      label="用户名"
      path="username"
      required
    />
    <pro-input
      label="邮箱"
      path="email"
      required
      value="zcf"
    />
    <pro-password
      label="密码"
      path="password"
      required
      initial-value="zcf"
    />
    <n-button type="primary" @click="submit">
      登录
    </n-button>
  </pro-form>
</template>
