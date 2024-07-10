<markdown>
# 循环联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    return { }
  },
})
</script>

<template>
  <pro-form label-placement="left" label-width="auto">
    <pro-digit
      label="总价"
      path="total"
      value="{{ ![null,undefined].includes($vals.count) && ![null,undefined].includes($vals.price) ? $vals.count * $vals.price : $self }}"
    />
    <pro-digit
      label="数量"
      path="count"
      value="{{ $vals.price > 0 ? $vals.total / $vals.price : $self }}"
    />
    <pro-digit
      label="单价"
      path="price"
      value="{{ $vals.count > 0 ? $vals.total / $vals.count : $self }}"
    />
  </pro-form>
</template>
