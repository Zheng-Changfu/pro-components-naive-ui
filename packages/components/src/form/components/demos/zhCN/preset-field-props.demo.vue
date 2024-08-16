<markdown>
# 预设属性

我们可以全局设置表单项的一些属性做到好用，比如想给所有的表单项添加`可清除`效果，支持所有表单项的设定，支持表单项的所有 `props`，你可以自由发挥预设
你想要的属性，`placeholder` 的预设请参考语言包
</markdown>

<script lang="tsx">
import { defineComponent } from 'vue'
import { ValueTypeEnum, useProFormInst } from 'pro-components-naive-ui'

export default defineComponent({
  setup() {
    const [proFormInst, { submit, restoreFieldsValue }] = useProFormInst()

    return {
      submit,
      proFormInst,
      ValueTypeEnum,
      restoreFieldsValue,
    }
  },
})
</script>

<template>
  <pro-config-provider
    :preset-field-props="{
      [ValueTypeEnum.INPUT]: {
        clearable: true,
      },
      [ValueTypeEnum.PASSWORD]: {
        clearable: true,
      },
    }"
  >
    <pro-form
      ref="proFormInst"
      label-width="auto"
      @submit="console.log"
    >
      <n-card title="可被清除的表单" embedded>
        <n-flex>
          <pro-input
            title="name"
            path="name"
          />
          <pro-password
            title="password"
            path="password"
          />
        </n-flex>
      </n-card>
      <n-flex class="mt-16px">
        <n-button @click="restoreFieldsValue">
          重置
        </n-button>
        <n-button type="primary" @click="submit">
          提交
        </n-button>
      </n-flex>
    </pro-form>
  </pro-config-provider>
</template>
