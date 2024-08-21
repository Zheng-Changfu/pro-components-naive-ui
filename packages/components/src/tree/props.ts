import { treeProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'vue'
import { omit } from 'lodash-es'

export const proTreeProps = {
  ...omit(treeProps, [
    'defaultExpandAll',
    'defaultCheckedKeys',
    'defaultExpandedKeys',
    'defaultSelectedKeys',
  ]),
} as const

export type ProTreeProps = ExtractPublicPropTypes<typeof proTreeProps>
