<markdown>
# dependencies 的几种用法

字段的依赖项，当依赖项的值发生变化时，会触发当前字段校验，在一些复杂的表单场景中做联动校验可能会用到
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { restoreFieldsValue }] = useProFormInst()

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
        pattern: 'input',
      }"
    />
    <pro-date
      label="正则用法"
      path="regexp"
      required
      :dependencies="{
        pattern: /.*/,
      }"
    />
    <pro-digit
      label="函数用法"
      path="function"
      required
      :dependencies="{
        pattern: (path:string, _:string[]) => path === 'input',
      }"
    />
    <pro-input
      label="混合用法"
      path="mixin"
      required
      :dependencies="[
        'input',
        { pattern: 'object' },
        { pattern: /regexp/ },
        { pattern: (path:string, _:string[]) => path === 'function' },
      ]"
    />
    <n-button type="primary" @click="restoreFieldsValue">
      重置
    </n-button>
  </pro-form>
</template>
