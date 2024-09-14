import type { Component, ExtractPublicPropTypes, MaybeRef, PropType } from 'vue'
import type { FieldValueType } from '../form'
import { configProviderProps } from 'naive-ui'

export const proConfigProviderExtendProps = {
  propOverrides: Object as PropType<MaybeRef<Record<string, object>>>,
  valueTypeMap: Object as PropType<MaybeRef<Partial<Record<FieldValueType, Component>>>>,
} as const

export const proConfigProviderProps = {
  ...configProviderProps,
  ...proConfigProviderExtendProps,
} as const

export type ProConfigProviderProps = ExtractPublicPropTypes<typeof proConfigProviderProps>
export type ProConfigProviderExtendProps = ExtractPublicPropTypes<typeof proConfigProviderExtendProps>
