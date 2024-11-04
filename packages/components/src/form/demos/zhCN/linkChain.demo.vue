<markdown>
# 链式联动
</markdown>

<script lang="tsx">
import type { ProFormInst } from 'pro-components-naive-ui'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const instRef = ref<ProFormInst>()

    function log() {
      console.log(instRef.value!.getFieldsValue(true))
    }

    return {
      log,
      instRef,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" label-placement="left" label-width="auto">
    <pro-select
      title="控制者"
      path="select"
      :initial-value="0"
      :field-props="{
        options: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ],
      }"
    />
    <pro-select
      title="控制者"
      path="input1"
      :initial-value="1"
      visible="{{ !!$vals.select }}"
      :field-props="{
        options: [
          { label: '显示', value: 1 },
          { label: '隐藏', value: 0 },
        ],
      }"
    />
    <pro-input
      title="受控者"
      path="input2"
      visible="{{ !!$vals.select && !!$vals.input1 }}"
    />
    <n-button @click="log">
      控制台查看
    </n-button>
  </pro-form>
</template>
