import type { Component, ExtractPublicPropTypes, MaybeRef, PropType } from 'vue'
import { configProviderProps } from 'naive-ui'
import type { FieldValueType } from '../form'
import type { GlobalConfigProButton, GlobalConfigProForm, GlobalConfigProTable, GlobalConfigProUpload } from './types'

export const proConfigProviderExtendProps = {
  proForm: Object as PropType<Partial<GlobalConfigProForm>>,
  proTable: Object as PropType<Partial<GlobalConfigProTable>>,
  proButton: Object as PropType<Partial<GlobalConfigProButton>>,
  proUpload: Object as PropType<Partial<GlobalConfigProUpload>>,
  fieldComponents: Object as PropType<MaybeRef<Partial<Record<FieldValueType, Component>>>>,
  presetFieldProps: Object as PropType<MaybeRef<Partial<Record<FieldValueType, Record<string, any>>>>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
