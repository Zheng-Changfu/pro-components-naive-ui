<markdown>
# 提交时转换值
使用 `transform` 属性在提交时转换值，常见场景可能是日期组件，后端想要多个字段，如果返回的是一个对象
将和当前字段所在层级的对象进行深度合并
</markdown>

<script lang="ts">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {
      form: createProForm({
        onSubmit: console.log,
      }),
    }
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-date-range
      title="日期"
      path="date"
      required
      :transform="(val:any, _:any) => ({ startDate: val[0], endDate: val[1] })"
    />
    <n-button type="primary" attr-type="submit">
      提交
    </n-button>
  </pro-form>
</template>
