<markdown>
# 表单布局

可以使用 `renderFormItem` 统一进行布局，也可以正常编写布局代码
</markdown>

<script lang="tsx">
import { computed, defineComponent, ref } from 'vue'

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
        <n-row gutter="12">
          <n-col v-for="item in 4" :key="item" :span="24 / cols">
            <pro-input :label="`字段${item}`" :path="`field_${item}`" />
          </n-col>
        </n-row>
      </n-card>
      <n-card title="表单2" embedded>
        <n-row gutter="12">
          <n-col v-for="item in 4" :key="item" :span="24 / cols">
            <pro-input :label="`字段${item}`" :path="`field_${item}`" />
          </n-col>
        </n-row>
      </n-card>
    </n-flex>
  </pro-form>
</template>
