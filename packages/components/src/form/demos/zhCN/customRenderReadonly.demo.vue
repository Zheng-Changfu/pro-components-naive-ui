<markdown>
# 自定义渲染只读模式

组件的 `readonly` 属性优先级比表单的 `readonly` 高，使用 `renderReadonly` 属性自定义渲染只读模式下的控件，`renderReadonlyEmpty`
属性自定义渲染只读模式下并且内容为空时的控件，你也可以在全局配置
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const readonly = ref(false)

    function renderReadonly({ value }: { value: string }) {
      return <div class="color-red">{value}</div>
    }

    function renderReadonlyEmpty() {
      return <div class="color-red">~暂无数据~</div>
    }

    return {
      readonly,
      renderReadonly,
      renderReadonlyEmpty,
    }
  },
})
</script>

<template>
  <n-flex vertical>
    <n-flex>
      <div>只读：<n-switch v-model:value="readonly" /></div>
    </n-flex>
    <pro-form label-placement="left" label-width="auto" :readonly="readonly">
      <pro-input
        label="用户名"
        path="username"
        :render-readonly="renderReadonly"
        :render-readonly-empty="renderReadonlyEmpty"
      />
    </pro-form>
  </n-flex>
</template>
