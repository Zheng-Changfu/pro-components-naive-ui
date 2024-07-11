<markdown>
  # 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInstance()

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
  <pro-form ref="proFormInst" label-placement="left" label-width="auto" @submit="onSubmit">
    <pro-input label="用户名" path="username" required />
    <pro-password label="密码" path="password" required />
    <n-button type="primary" @click="submit">
      登录
    </n-button>
  </pro-form>
</template>
