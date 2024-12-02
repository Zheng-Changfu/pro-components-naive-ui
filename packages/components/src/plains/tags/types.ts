import type { TagProps } from 'naive-ui'
import type { Merge } from 'type-fest'

export type ProTagsConfig = Merge<TagProps, { content?: string }>
