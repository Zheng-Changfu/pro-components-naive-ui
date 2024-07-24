<markdown>
# 基本使用
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const position = ref<'top' | 'bottom'>('bottom')
    return {
      position,
    }
  },
})
</script>

<template>
  <n-radio-group v-model:value="position" class="mb-16px">
    <n-flex>
      <n-radio label="顶部" value="top" />
      <n-radio label="底部" value="bottom" />
    </n-flex>
  </n-radio-group>
  <pro-form>
    <pro-form-list
      label="用户信息"
      path="userInfo"
      :position="position"
      only-show-first-item-label
    >
      <pro-input
        label="姓名"
        path="name"
      />
      <pro-digit
        label="年龄"
        path="age"
      />
    </pro-form-list>
  </pro-form>
</template>
