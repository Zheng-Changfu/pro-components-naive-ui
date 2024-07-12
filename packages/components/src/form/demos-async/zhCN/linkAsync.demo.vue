<markdown>
# 联动请求

在表单中，往往会有一些数据源是基于某些值进行联动请求的，因为表单控件支持表达式，所以可以很轻松的完成这些功能
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance, useProSelectInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { submit, getFieldValue }] = useProFormInstance()
    const [selectInstRef, { setOptions }] = useProSelectInstance()

    async function fetchProvince() {
      await delay(500)
      return [
        { label: '安徽', value: 1 },
        { label: '江西', value: 2 },
      ]
    }

    async function fetchCity() {
      await delay(500)
      const province = getFieldValue('province')
      if (!province) {
        return []
      }
      return province === 1
        ? [
            { label: '宣城', value: 3 },
            { label: '芜湖', value: 4 },
          ]
        : [
            { label: '上饶', value: 5 },
            { label: '南昌', value: 6 },
          ]
    }

    async function fetchCounty() {
      const city = getFieldValue('city')
      if (!city)
        return []
      await delay(500)
      return ({
        3: [{ label: '泾县', value: 7 }],
        4: [{ label: '镜湖', value: 8 }],
        5: [{ label: '玉山', value: 9 }],
        6: [{ label: 'XX', value: 10 }],
      } as any)[city]
    }

    function clearCountyOptions() {
      setOptions([])
    }

    function onSubmit(values: any) {
      console.log(values)
    }

    return {
      instRef,
      submit,
      onSubmit,
      fetchCity,
      fetchCounty,
      selectInstRef,
      fetchProvince,
      clearCountyOptions,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" inline @submit="onSubmit">
    <pro-select
      label="省份"
      path="province"
      required
      class="w-150px"
      :field-props="{
        clearable: true,
      }"
      :fetch-config="{
        api: fetchProvince,
      }"
      @change="clearCountyOptions"
    />
    <pro-select
      label="城市"
      path="city"
      required
      class="w-150px"
      value="{{ !$vals.province ? null : $self }}"
      :field-props="{
        clearable: true,
      }"
      :fetch-config="{
        api: fetchCity,
        immediate: false,
        dependencies: {
          watch: '{{ $vals.province }}',
          runable: '{{ !!$vals.province }}',
        },
      }"
    />
    <pro-select
      ref="selectInstRef"
      label="区县"
      path="county"
      required
      class="w-150px"
      :field-props="{
        clearable: true,
        fallbackOption: false,
      }"
      value="{{ !$vals.city ? null : $self }}"
      :fetch-config="{
        api: fetchCounty,
        immediate: false,
        dependencies: {
          watch: '{{ $vals.city }}',
          runable: '{{ !!$vals.city }}',
        },
      }"
    />
    <n-button type="primary" @click="submit">
      提交
    </n-button>
  </pro-form>
</template>
