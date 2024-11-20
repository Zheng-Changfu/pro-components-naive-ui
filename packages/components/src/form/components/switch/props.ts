import type { SwitchProps } from 'naive-ui'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import type { BaseFieldProps } from '../../../types'
import { proFieldProps } from '../field'

export const proSwitchProps = {
  ...proFieldProps,
  fieldProps: Object as PropType<BaseFieldProps<SwitchProps>>,
} as const

export type ProSwitchProps = ExtractPublicPropTypes<typeof proSwitchProps>
