<markdown>
# 提交时转换值
使用 `transform` 属性在提交时转换值，常见场景可能是日期组件，后端想要多个字段，如果返回的是一个对象
将和当前字段所在层级的对象进行深度合并
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

    return {
      submit,
      onSubmit,
      proFormInst,
    }
  },
})
</script>

<template>
  <pro-form
    ref="proFormInst"
    label-placement="left"
    label-width="auto"
    @submit="onSubmit"
  >
    <pro-upload
      label="图片"
      path="image"
      :field-props="{
        onlyAcceptImage: true,
      }"
      :transform="(val:any, _:any) => {
        console.log(val, 'val')
      }"
    />
    <pro-date-range
      label="日期"
      path="date"
      required
      :transform="(val:any, _:any) => ({ start: val[0], end: val[1] })"
    />
    <n-button type="primary" @click="submit">
      登录
    </n-button>
  </pro-form>
</template>
