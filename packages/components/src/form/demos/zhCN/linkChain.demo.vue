<markdown>
# 链式联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { getFieldsValue }] = useProFormInst()

    function log() {
      console.log(getFieldsValue(true))
    }

    return {
      log,
      instRef,
      getFieldsValue,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" label-placement="left" label-width="auto">
    <pro-select
      label="控制者"
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
      label="控制者"
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
      label="受控者"
      path="input2"
      visible="{{ !!$vals.select && !!$vals.input1 }}"
    />
    <n-button @click="log">
      控制台查看
    </n-button>
  </pro-form>
</template>
