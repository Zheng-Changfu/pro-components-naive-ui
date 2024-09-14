import type { ExtractPublicPropTypes } from 'vue'
import { dataTableProps } from 'naive-ui'

export const proDataTableExtendProps = {

} as const

export const proDataTableProps = {
  ...dataTableProps,

} as const

export type ProDataTableProps = ExtractPublicPropTypes<typeof proDataTableProps>
export type ProDataTableExtendProps = ExtractPublicPropTypes<typeof proDataTableExtendProps>
