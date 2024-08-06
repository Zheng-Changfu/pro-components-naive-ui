<markdown>
# 案例-注册

使用 `dependencies` 属性，用来监控值的变化触发自身校验
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, {
      submit,
      getFieldValue,
    }] = useProFormInst()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

    return {
      submit,
      onSubmit,
      proFormInst,
      getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form ref="proFormInst" label-placement="left" label-width="auto" @submit="onSubmit">
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
    <n-button type="primary" @click="submit">
      注册
    </n-button>
  </pro-form>
</template>
