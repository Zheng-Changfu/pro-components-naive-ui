<markdown>
  # 基本使用
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useProFormInstance } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit }] = useProFormInstance()

    function onSubmit(values: any) {
      console.log(values, 'values')
    }

    return {
      submit,
      onSubmit,
      proFormInst,
    }
  },
})
</script>

<template>
  <pro-form
    ref="proFormInst"
    @submit="onSubmit"
  >
    <pro-form-list
      label="用户信息"
      path="userInfo"
    >
      <pro-input
        show-label="{{ $index === 0 }}"
        label="姓名1"
        path="nameExpression"
      />
      <pro-input
        show-label="{{ $index === 0 }}"
        label="姓名2"
        path="nameSlot2"
      />
      <pro-select
        show-label="{{ $index === 0 }}"
        label="城市"
        path="city"
        class="w-150px"
        visible="{{ !!$row.nameSlot }}"
        required
        :field-props="{
          options: [
            { label: '北京', value: 0 },
            { label: '上海', value: 1 },
          ],
        }"
      />
    </pro-form-list>
    <n-button type="primary" @click="submit">
      登录
    </n-button>
  </pro-form>
</template>
