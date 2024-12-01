import type { MaybeRefOrGetter, UseClipboardOptions } from '@vueuse/core'

export type CopyableTextConfig = UseClipboardOptions<MaybeRefOrGetter<string>>
