<markdown>
# 增删限制
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
  <pro-form>
    <pro-form-list
      label="用户信息"
      path="userInfo"
      :min="1"
      :max="3"
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
