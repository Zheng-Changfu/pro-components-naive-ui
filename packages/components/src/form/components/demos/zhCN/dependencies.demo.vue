<markdown>
# 表单项的依赖

使用 `dependencies` 属性，用来监控值的变化触发自身校验，例如需要二次确认密码
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{ password: string, confirmPassword: string }>({
      onSubmit: console.log,
    })

    return {
      form,
      get: form.getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-input
      title="用户名"
      path="username"
      required
    />
    <pro-password
      title="密码"
      path="password"
      dependencies="confirmPassword"
      required
      :rule="{
        message: '两次输入密码不一致',
        validator: (_:any, value:any) => !value || value === get('confirmPassword'),
      }"
    />
    <pro-password
      title="确认密码"
      path="confirmPassword"
      dependencies="password"
      required
      :rule="{
        message: '两次输入密码不一致',
        validator: (_:any, value:any) => !value || value === get('password'),
      }"
    />
    <n-button type="primary" attr-type="submit">
      注册
    </n-button>
  </pro-form>
</template>
