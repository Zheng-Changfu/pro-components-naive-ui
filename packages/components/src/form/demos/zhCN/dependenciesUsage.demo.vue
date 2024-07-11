<markdown>
# dependencies 的几种用法

在一些复杂的表单场景中做联动校验可能会用到
</markdown>

<script lang="tsx">
import { defineComponent, nextTick } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { restoreFieldsValue }] = useProFormInstance()

    return {
      proFormInst,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <pro-form ref="proFormInst" label-placement="left" label-width="auto">
    <pro-input
      label="输入看效果"
      path="input"
      required
    />
    <pro-digit
      label="字符串用法"
      path="string"
      required
      dependencies="input"
    />
    <pro-input
      label="对象用法"
      path="object"
      required
      :dependencies="{
        match: 'input',
      }"
    />
    <pro-date
      label="正则用法"
      path="regexp"
      required
      :dependencies="{
        match: /.*/,
      }"
    />
    <pro-digit
      label="函数用法"
      path="function"
      required
      :dependencies="{
        match: (path:string, paths:string[]) => path === 'input',
      }"
    />
    <pro-input
      label="混合用法"
      path="mixin"
      required
      :dependencies="[
        'input',
        { match: 'object' },
        { match: /regexp/ },
        { match: (path:string, paths:string[]) => path === 'function' },
      ]"
    />
    <n-button type="primary" @click="restoreFieldsValue">
      重置
    </n-button>
  </pro-form>
</template>
