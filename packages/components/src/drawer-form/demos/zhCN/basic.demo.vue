<markdown>
# 基本用法
</markdown>

<script lang="tsx">
import { random } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { createProModalForm } from 'pro-components-naive-ui'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    const active = ref(false)
    const placement = ref<DrawerPlacement>('right')
    const activate = (place: DrawerPlacement) => {
      active.value = true
      placement.value = place
    }
    return {
      active,
      placement,
      activate,
    }
  },
})
</script>

<template>
  <n-button @click="active = true">
    右
  </n-button>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <pro-card
      title="123" tooltip="tooltips" class="h-full" :segmented="{
        content: true,
        footer: true,
      }" content-class="h-full overflow-auto"
    >
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <template #footer>
        123
      </template>
    </pro-card>
  </n-drawer>
</template>
