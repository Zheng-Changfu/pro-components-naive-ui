import type { ExtractPublicPropTypes } from 'vue'
import { DataTableProps } from 'naive-ui'

export const proDataTableProps = {
  a:false,
  pagination:{
    type:Boolean,
  }
} as const
inject
ProconfigProvider  propsOverwrite:{

}

export type ProTableProps = ExtractPublicPropTypes<typeof proTableProps>

