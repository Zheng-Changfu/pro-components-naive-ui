<markdown>
# 一对多联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [instRef, { getFieldsValue }] = useProFormInst()

    function log() {
      console.log(getFieldsValue())
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
      initial-value="visible"
      :field-props="{
        options: [
          { label: '显示', value: 'visible' },
          { label: '隐藏', value: 'hidden' },
        ],
      }"
    />
    <pro-input
      label="受控者1"
      path="input1"
      visible="{{ $vals.select === 'visible' }}"
    />
    <pro-input
      label="受控者2"
      path="input2"
      hidden="{{ $vals.select === 'hidden' }}"
    />
    <n-button @click="log">
      控制台查看
    </n-button>
  </pro-form>
</template>
