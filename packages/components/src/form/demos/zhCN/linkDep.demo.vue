<markdown>
# 依赖联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-digit label="控制者" path="dim_1" :initial-value="0" />
    <pro-digit label="控制者" path="dim_2" :initial-value="0" />
    <pro-digit label="受控者" path="result" readonly value="{{ $vals.dim_1 * $vals.dim_2 }}" />
  </pro-form>
</template>
