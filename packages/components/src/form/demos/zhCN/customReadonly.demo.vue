<markdown>
# 自定义只读模式

默认内部预设了每个组件的只读模式，如果不满足您的需求，可以使用组件的 `readonly` 插槽自定义渲染，参数为当前组件的所有 props
</markdown>

<script lang="tsx">
import { InputProps } from 'naive-ui'
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      readonly: ref(false),
      form: createProForm(),
    }
  },
})
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <div>只读：<n-switch v-model:value="readonly" /></div>
    </n-flex>
    <pro-form
      :form="form"
      label-width="auto"
      label-placement="left"
      :readonly="readonly"
    >
      <pro-input
        title="用户名"
        path="username"
      >
        <template #readonly="{ value }:InputProps">
          <div class="color-red">
            {{ value ? value : '暂无数据' }}
          </div>
        </template>
      </pro-input>
    </pro-form>
  </n-flex>
</template>
