import type { SwitchProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldSharedProps } from '../field'

export const proSwitchProps = {
  ...proFieldSharedProps,
  fieldProps: Object as PropType<BaseFieldProps<SwitchProps>>,
} as const

export type ProSwitchProps = ExtractPublicPropTypes<typeof proSwitchProps>
