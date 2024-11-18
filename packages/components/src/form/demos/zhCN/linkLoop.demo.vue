<markdown>
# 循环联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-components-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{
      count: number
      price: number
      total: number
    }>()

    function isEmpty(val: any) {
      return [null, undefined].includes(val)
    }

    return {
      form,
      isEmpty,
      get: form.getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form
    :form="form"
    label-width="auto"
    label-placement="left"
  >
    <pro-digit
      title="总价"
      path="total"
      :value="!isEmpty(get('count')) && !isEmpty(get('price')) ? get('count') * get('price') : get('total')"
    />
    <pro-digit
      title="数量"
      path="count"
      :value="get('price') > 0 ? get('total') / get('price') : get('count')"
    />
    <pro-digit
      title="单价"
      path="price"
      :value="get('count') > 0 ? get('total') / get('count') : get('price')"
    />
  </pro-form>
</template>
