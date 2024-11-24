<markdown>
# 多表单联动

如果只是布局看起来像多个表单，可以将 `ProForm` 放在最外层，这里只是为了演示
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form1 = createProForm<{ color: string }>()
    const form2 = createProForm<{ color: string }>()
    return {
      form1,
      form2,
      get1: form1.getFieldValue,
      get2: form2.getFieldValue,
    }
  },
})
</script>

<template>
  <n-card :bordered="false" title="A表单">
    <pro-form :form="form1" label-placement="left" label-width="auto">
      <pro-input
        title="控制B表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: get2('color'),
          },
        }"
      />
    </pro-form>
  </n-card>
  <n-card :bordered="false" title="B表单">
    <pro-form :form="form2" label-placement="left" label-width="auto">
      <pro-input
        title="控制A表单input颜色"
        path="color"
        :field-props="{
          style: {
            background: get1('color'),
          },
        }"
      />
    </pro-form>
  </n-card>
</template>
