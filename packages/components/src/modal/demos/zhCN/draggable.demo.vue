<markdown>
# 拖拽

默认支持弹窗拖拽，如果没有预设时不生效，可设置 `draggable` 为 `false` 关闭，设置 `draggable.sticky` 为 `false`,
可以让拖拽范围超出可视区
</markdown>

<script lang="tsx">
import { ref } from 'vue'

export default defineComponent({
  setup() {
    return {
      showPresetCardModal: ref(false),
      showPresetDialogModal: ref(false),
    }
  },
})
</script>

<template>
  <n-flex>
    <n-button @click="showPresetCardModal = true">
      card 预设
    </n-button>
    <n-button @click="showPresetDialogModal = true">
      dialog 预设
    </n-button>
  </n-flex>
  <pro-modal
    v-model:show="showPresetCardModal"
    title="Card 预设"
    preset="card"
    class="w-600px"
    :fullscreen="false"
  >
    <div>card 预设</div>
  </pro-modal>
  <pro-modal
    v-model:show="showPresetDialogModal"
    preset="dialog"
    title="Dialog 预设"
  >
    <div>dialog 预设</div>
  </pro-modal>
</template>
