<markdown>
# 循环联动
</markdown>

<script lang="tsx">
import { createProForm } from 'pro-naive-ui'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const form = createProForm<{
      count: number
      price: number
      total: number
    }>()

    const {
      getFieldValue: get,
      setFieldValue: set,
    } = form

    function isEmpty(val: any) {
      return [null, undefined].includes(val)
    }

    function infinityTo0(val: number) {
      return val === Infinity ? 0 : val
    }

    function totalChange() {
      const value = infinityTo0(get('total') / get('count'))
      if (value <= 0) {
        set('price', 0)
        set('count', 0)
      }
      else {
        set('price', value)
      }
    }

    function priceChange() {
      const value = infinityTo0(get('count') * get('price'))
      if (value <= 0) {
        set('total', 0)
        set('count', 0)
      }
      else {
        set('total', value)
      }
    }

    function countChange() {
      const value = infinityTo0(get('total') / get('count'))
      if (value <= 0) {
        set('price', 0)
        set('total', 0)
      }
      else {
        set('price', value)
      }
    }

    return {
      form,
      isEmpty,
      totalChange,
      priceChange,
      countChange,
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
      @change="totalChange"
    />
    <pro-digit
      title="数量"
      path="count"
      @change="countChange"
    />
    <pro-digit
      title="单价"
      path="price"
      @change="priceChange"
    />
  </pro-form>
</template>
