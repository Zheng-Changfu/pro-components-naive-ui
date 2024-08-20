<script setup lang='tsx'>
import { computed, unref } from 'vue'
import type { ConfigProviderProps } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import { merge, omit } from 'lodash-es'
import { proConfigProviderExtendProps, proConfigProviderProps } from './props'
import { provideGlobalConfig, useInjectGlobalConfig } from './context'

defineOptions({
  name: 'ProConfigProvider',
})

const props = defineProps(proConfigProviderProps)

const {
  proForm = {},
  proTable = {},
  proButton = {},
} = props

const {
  proForm: parentProForm,
  proTable: parentProTable,
  proButton: parentProButton,
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

const nConfigProviderProps = computed<ConfigProviderProps>(() => {
  return omit(
    {
      ...props,
      themeOverrides: merge(
        {
          Card: {
            borderRadius: '8px',
          },
        },
        props.themeOverrides ?? {},
      ),
    },
    Object.keys(proConfigProviderExtendProps),
  )
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
  fieldComponents: fieldComponentsRecord,
  presetFieldProps: presetFieldPropsRecord,
})
</script>

<template>
  <NConfigProvider v-bind="nConfigProviderProps">
    <slot />
  </NConfigProvider>
</template>
