<markdown>
# 基本使用

如果按钮被 `pro-form` 组件包裹，使用 `attr-type` 为 `submit` 提交表单，使用 `attr-type` 为 `reset` 重置表单
</markdown>

<script lang="ts">
import { createProForm } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    return {
      form: createProForm({
        onSubmit: console.log,
      }),
    }
  },
})
</script>

<template>
  <pro-form :form="form" label-placement="left" label-width="auto">
    <pro-input tooltip="用户名" title="用户名" path="username" required />
    <pro-password :tooltip="['1', '2']" title="密码" path="password" required />
    <n-flex>
      <n-button attr-type="reset">
        重置
      </n-button>
      <n-button type="primary" attr-type="submit">
        提交
      </n-button>
    </n-flex>
  </pro-form>
</template>
