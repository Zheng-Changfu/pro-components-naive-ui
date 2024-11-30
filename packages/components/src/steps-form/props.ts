import type { ExtractPublicPropTypes } from 'vue'
import { pick } from 'lodash-es'
import { stepsProps } from 'naive-ui'
import { proFormProps } from '../form'

console.log(
  '冲突的属性',
  pick(stepsProps, Object.keys(proFormProps)),
  pick(proFormProps, Object.keys(stepsProps)),
)
export const proStepsFormProps = {

} as const

export type ProStepsFormProps = ExtractPublicPropTypes<typeof proStepsFormProps>
