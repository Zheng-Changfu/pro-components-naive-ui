<markdown>
# 案例-注册

使用 `dependencies` 属性，用来监控值的变化触发自身校验
</markdown>

<script lang="tsx">
import { useProFormInst } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const [proFormInst, { getFieldValue }] = useProFormInst()

    return {
      proFormInst,
      getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form ref="proFormInst" label-placement="left" label-width="auto" @submit="console.log">
    <pro-input
      label="用户名"
      path="username"
      required
    />
    <pro-password
      label="密码"
      path="password"
      dependencies="confirmPassword"
      required
      :rule="{
        message: '两次输入密码不一致',
        validator: (_:any, value:any) => !value || value === getFieldValue('confirmPassword'),
      }"
    />
    <pro-password
      label="确认密码"
      path="confirmPassword"
      dependencies="password"
      required
      :rule="{
        message: '两次输入密码不一致',
        validator: (_:any, value:any) => !value || value === getFieldValue('password'),
      }"
    />
    <n-button type="primary" attr-type="submit">
      注册
    </n-button>
  </pro-form>
</template>
