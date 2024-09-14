<markdown>
# 拦截 dependencies 的校验

使用 `guard` 拦截由 `dependencies` 触发的校验，可能在某一些异步场景时会用到
</markdown>

<script lang="tsx">
import { useMessage } from 'naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const message = useMessage()

    function validateGuard() {
      message.info('校验被我拦截了')
      return false
    }

    return {
      validateGuard,
    }
  },
})
</script>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-input
      label="输入看效果"
      path="input"
    />
    <pro-input
      label="拦截校验"
      path="object"
      required
      :dependencies="{
        pattern: 'input',
        guard: validateGuard,
      }"
    />
  </pro-form>
</template>
