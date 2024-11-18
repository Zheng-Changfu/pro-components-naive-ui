<markdown>
# 多表单联动

如果只是布局看起来像多个表单，可以将 `ProForm` 放在最外层，这里只是为了演示
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const aForm = createProForm<{ color: string }>()
    const bForm = createProForm<{ color: string }>()
    return {
      aForm,
      bForm,
      aGet: aForm.getFieldValue,
      bGet: bForm.getFieldValue,
    }
  },
})
</script>

<template>
  <n-card :bordered="false" title="A表单">
    <pro-form :form="aForm" label-placement="left" label-width="auto">
      <pro-input
        title="控制B表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: bGet('color'),
          },
        }"
      />
    </pro-form>
  </n-card>
  <n-card :bordered="false" title="B表单">
    <pro-form :form="bForm" label-placement="left" label-width="auto">
      <pro-input
        title="控制A表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: aGet('color'),
          },
        }"
      />
    </pro-form>
  </n-card>
</template>
