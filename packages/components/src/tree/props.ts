import type { ExtractPublicPropTypes } from 'vue'
import { omit } from 'lodash-es'
import { treeProps } from 'naive-ui'

export const proTreeProps = {
  ...omit(treeProps, [
    'defaultExpandAll',
    'defaultCheckedKeys',
    'defaultExpandedKeys',
    'defaultSelectedKeys',
  ]),
} as const

export type ProTreeProps = ExtractPublicPropTypes<typeof proTreeProps>
