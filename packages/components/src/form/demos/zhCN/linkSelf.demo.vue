<markdown>
# 自身联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-input
      label="颜色"
      path="color"
      :field-props="{
        style: {
          background: '{{ $self }}',
        },
      }"
    />
  </pro-form>
</template>
