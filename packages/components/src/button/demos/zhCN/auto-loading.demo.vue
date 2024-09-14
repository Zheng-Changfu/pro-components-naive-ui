<markdown>
# 自动 loading

如果你不想要，可以设置 `autoLoading` 为 false
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}
export default defineComponent({
  setup() {
    const autoLoading = ref(false)
    async function submit() {
      autoLoading.value = true
      await delay(1000)
    }
    return {
      submit,
      autoLoading,
    }
  },
})
</script>

<template>
  <ProButton :auto-loading="autoLoading" @click="submit">
    按钮
  </ProButton>
</template>
