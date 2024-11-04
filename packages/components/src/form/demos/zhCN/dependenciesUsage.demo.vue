<markdown>
# dependencies 的几种用法

字段的依赖项，当依赖项的值发生变化时，会触发当前字段校验，在一些复杂的表单场景中做联动校验可能会用到
</markdown>

<script lang="tsx">
import type { ProFormInst } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const instRef = ref<ProFormInst>()

    return {
      instRef,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" label-placement="left" label-width="auto">
    <pro-input
      title="输入看效果"
      path="input"
      required
    />
    <pro-digit
      title="字符串用法"
      path="string"
      required
      dependencies="input"
    />
    <pro-input
      title="对象用法"
      path="object"
      required
      :dependencies="{
        pattern: 'input',
      }"
    />
    <pro-date
      title="正则用法"
      path="regexp"
      required
      :dependencies="{
        pattern: /.*/,
      }"
    />
    <pro-digit
      title="函数用法"
      path="function"
      required
      :dependencies="{
        pattern: (path:string, _:string[]) => path === 'input',
      }"
    />
    <pro-input
      title="混合用法"
      path="mixin"
      required
      :dependencies="[
        'input',
        { pattern: 'object' },
        { pattern: /regexp/ },
        { pattern: (path:string, _:string[]) => path === 'function' },
      ]"
    />
    <n-button type="primary" @click="instRef?.restoreFieldsValue">
      重置
    </n-button>
  </pro-form>
</template>
