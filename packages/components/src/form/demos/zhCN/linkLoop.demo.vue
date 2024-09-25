<markdown>
# 循环联动
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    function isEmpty(val: any) {
      return [null, undefined].includes(val)
    }

    return {
      isEmpty,
    }
  },
})
</script>

<template>
  <pro-form
    label-placement="left"
    label-width="auto"
    :scope="{
      $empty: isEmpty,
    }"
  >
    <pro-digit
      title="总价"
      path="total"
      value="{{ !$empty($vals.count) && !$empty($vals.price) ? $vals.count * $vals.price : $self }}"
    />
    <pro-digit
      title="数量"
      path="count"
      value="{{ $vals.price > 0 ? $vals.total / $vals.price : $self }}"
    />
    <pro-digit
      title="单价"
      path="price"
      value="{{ $vals.count > 0 ? $vals.total / $vals.count : $self }}"
    />
  </pro-form>
</template>
