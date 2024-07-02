<markdown>
  # 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInstance()

    async function register(e: MouseEvent) {
      e.preventDefault()
      try {
        const r = await submit()
        console.log(r, 'r')
      }
      catch (error) {
        console.log(error)
      }
    }
    return {
      register,
      proFormInst,
    }
  },
})
</script>

<template>
  <ProForm ref="proFormInst" label-placement="left" label-width="auto" @finish="onFinish">
    <ProInput label="用户名" path="username" required />
    <ProPassword label="密码" path="password" required />
    <ProPassword label="确认密码" path="rePassword" required />
    <NButton type="primary" @click="register">
      注册
    </NButton>
  </ProForm>
</template>
