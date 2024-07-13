<markdown>
# 联动请求

在表单中，往往会有一些数据源是基于某些值进行联动请求的
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance, useProSelectInstance } from 'pro-components-naive-ui'

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const [instRef, { getFieldValue }] = useProFormInstance()
    const [sInstRef, { getFetchControls }] = useProSelectInstance()

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

    function triggerGuard() {
      const loading = getFetchControls().loading.value
      return !loading
    }

    return {
      instRef,
      sInstRef,
      fetchCity,
      fetchProvince,
      triggerGuard,
    }
  },
})
</script>

<template>
  <pro-form ref="instRef" inline>
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
    />
    <pro-select
      ref="sInstRef"
      label="城市"
      path="city"
      required
      class="w-150px"
      value="{{ !$vals.province ? null : $self }}"
      :field-props="{
        clearable: true,
      }"
      :dependencies="{
        match: 'province',
        triggerGuard,
      }"
      :fetch-config="{
        api: fetchCity,
        immediate: false,
        dependencies: {
          watch: '{{ $vals.province }}',
          apiGuard: '{{ !!$vals.province }}',
        },
      }"
    />
  </pro-form>
</template>
