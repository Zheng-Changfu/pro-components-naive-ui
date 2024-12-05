<markdown>
# 基本使用

表单项的 `placeholder` 根据 `title` 生成，请查看 XXXX <br />
默认的 `empty-text` 为 `-`，想要改变它，请查看 XXXXX<br />
如果你想表单必填，填写 `required` 为 `true` 即可，内部会自动处理不同的 `type`<br />
如果按钮被 `pro-form` 包裹，使用 `attr-type` 为 `submit` 提交表单， `attr-type` 为 `reset` 重置表单<br />
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      readonly: ref(false),
      form: createProForm<{
        username: string
        password: string
      }>({
        onReset: console.log,
        onSubmit: console.log,
        onSubmitFailed: console.log,
      }),
    }
  },
})
</script>

<template>
  <n-switch v-model:value="readonly" class="mb-8px">
    <template #checked>
      编辑
    </template>
    <template #unchecked>
      只读
    </template>
  </n-switch>
  <pro-form :readonly="readonly" :form="form" label-placement="left" label-width="auto">
    <pro-input tooltip="用户名" title="用户名" path="username" required />
    <pro-password :tooltip="['多行tooltip1', '多行tooltip2']" title="密码" path="password" required />
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
