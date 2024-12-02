import type { ImageGroupProps, ImageProps } from 'naive-ui'
import type { Merge } from 'type-fest'

export type ProImagesConfig = Merge<ImageProps, { imageGroupProps?: ImageGroupProps }>
