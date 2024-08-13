<script setup lang='tsx'>
import { computed, unref } from 'vue'
import { NConfigProvider } from 'naive-ui'
import { useOmitProps } from '../hooks'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'

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

const {
  proForm: parentProForm,
  proTable: parentProTable,
  proButton: parentProButton,
  proUpload: parentProUpload,
  fieldComponents: parentFieldComponents,
  presetFieldProps: parentPresetFieldProps,
} = useInjectGlobalConfig()

const fieldComponentsRecord = computed(() => {
  return {
    ...unref(parentFieldComponents),
    ...(unref(props.fieldComponents) ?? {}),
  }
})

const presetFieldPropsRecord = computed(() => {
  return {
    ...unref(parentPresetFieldProps),
    ...(unref(props.presetFieldProps) ?? {}),
  }
})

provideGlobalConfig({
  proForm: {
    validateTrigger: 'input',
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
  fieldComponents: fieldComponentsRecord,
  presetFieldProps: presetFieldPropsRecord,
})
</script>

<template>
  <NConfigProvider v-bind="nConfigProviderProps">
    <slot />
  </NConfigProvider>
</template>
