<script setup lang='tsx'>
import { computed } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'
import { builtInRenderRequiredMessage } from './renderers/requiredMessage'
import { builtInRenderPlaceholder } from './renderers/placeholder'

defineOptions({
  name: 'ProConfigProvider',
})

const props = defineProps(proConfigProviderProps)

const nConfigProviderProps = useOmitProps(props, proConfigProviderExtendProps)

const {
  proForm = {},
  proTable = {},
  proButton = {},
  proUpload = {},
} = props

/**
 * 可能会嵌套，自己取不到，取上层的
 */
const {
  proForm: parentProForm,
  proTable: parentProTable,
  proButton: parentProButton,
  proUpload: parentProUpload,
} = useInjectGlobalConfig()

provideGlobalConfig({
  proForm: {
    validateTrigger: 'input',
    renderPlaceholder: builtInRenderPlaceholder,
    renderRequiredMessage: builtInRenderRequiredMessage,
    ...parentProForm,
    ...proForm,
  },
  proTable: {
    ...parentProTable,
    ...proTable,
  },
  proButton: {
    ...parentProButton,
    ...proButton,
    authData: computed(() => {
      const propAuthData = props.proButton?.authData
      const parentAuthData = parentProButton.authData?.value
      return propAuthData ?? parentAuthData
    }),
  },
  proUpload: {
    title: '上传',
    ...parentProUpload,
    ...proUpload,
  },
})
</script>

<template>
  <NConfigProvider v-bind="nConfigProviderProps">
    <slot />
  </NConfigProvider>
</template>
