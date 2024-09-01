<markdown>
# 全屏

只在 `preset` 为 `card` 时生效，其他预设或自定义时需要通过实例方法实现
</markdown>

<script lang="tsx">
import { ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      showModal: ref(false),
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button @click="showModal = true">
      打开看看
    </n-button>
  </n-flex>
  <pro-modal
    v-model:show="showModal"
    title="可全屏"
    preset="card"
    class="w-600px"
  >
    <div>一些无用的内容</div>
  </pro-modal>
</template>
