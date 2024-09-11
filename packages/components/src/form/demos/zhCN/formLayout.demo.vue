<markdown>
# 表单布局

您可以正常编写所有的布局代码
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const cols = ref(2)

    const marks = {
      1: '1列',
      2: '2列',
      3: '3列',
      4: '4列',
    }

    return {
      cols,
      marks,
    }
  },
})
</script>

<template>
  <n-slider
    v-model:value="cols"
    :min="1"
    :max="4"
    :marks="marks"
    step="mark"
  />
  <pro-form label-placement="left">
    <n-flex vertical>
      <n-card title="表单1" embedded>
        <n-grid :cols="cols" x-gap="16">
          <n-gi v-for="item in 4" :key="item">
            <pro-input :title="`字段${item}`" :path="`field_${item}`" />
          </n-gi>
        </n-grid>
      </n-card>
      <n-card title="表单2" embedded>
        <n-grid :cols="cols" x-gap="16">
          <n-gi v-for="item in 4" :key="item">
            <pro-input :title="`字段${item}`" :path="`field_${item}`" />
          </n-gi>
        </n-grid>
      </n-card>
    </n-flex>
  </pro-form>
</template>
