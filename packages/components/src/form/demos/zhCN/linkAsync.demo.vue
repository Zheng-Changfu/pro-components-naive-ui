<markdown>
# 异步联动

[关于支持异步数据源的表单控件请查阅]()
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFieldValue }] = useProFormInstance()

    async function fetchCitys() {
      const province = getFieldValue('province')
      await delay(1000)
      return province === 1
        ? [
            { label: '合肥市', value: 0 },
            { label: '宣城市', value: 1 },
          ]
        : [
            { label: '南昌市', value: 2 },
            { label: '赣州市', value: 3 },
          ]
    }

    return {
      instRef,
      fetchCitys,
      getFieldValue,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" label-placement="left" label-width="auto">
    <pro-select
      label="省份"
      path="province"
      :field-props="{
        options: [
          { label: '安徽省', value: 1 },
          { label: '江西省', value: 2 },
        ],
      }"
    />
    <pro-select
      label="城市"
      path="city"
      :field-props="{
        fallbackOption: false,
      }"
      :fetch-config="{
        immediate: false,
        api: fetchCitys,
        dependencies: {
          watch: '{{ $vals.province }}',
          runable: '{{ !!$vals.province }}',
        },
      }"
    />
  </pro-form>
</template>
