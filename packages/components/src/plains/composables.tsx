import type { ComputedRef } from 'vue'
import type { ProCopyableTextConfig } from './copyable-text/types'
import type { ProDateTextConfig } from './date-text/types'
import type { ProImagesConfig } from './images/types'
import type { ProTagsConfig } from './tags/types'
import { computed, unref } from 'vue'
import { isEmptyValue } from '../_utils/isEmptyValue'
import { transformValueToString } from './copyable-text/transform'
import { transformValueToSrcs } from './images/transform'
import { transformValueToTagOptions } from './tags/transform'

export interface Transform {
  /**
   * 转化 ProTags 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  tags?: (value: any, config: ProTagsConfig) => Array<ProTagsConfig>
  /**
   * 转化 ProImages 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  images?: (value: any, config: ProImagesConfig) => string[]
  /**
   * 转化 ProDateText 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  dateText?: (value: any, config: ProDateTextConfig) => string
  /**
   * 转化 ProCopyableText 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  copyableText?: (value: any, config: ProCopyableTextConfig) => string
}

const builtinTransform: Transform = {
  images: transformValueToSrcs,
  tags: transformValueToTagOptions,
  copyableText: transformValueToString,
}

export function usePlainComponentConfig<Name extends keyof Transform>(
  name: Name,
  props: ComputedRef<{ value?: any, config?: Record<string, any> }>,
): {
    empty: ComputedRef<boolean>
    mergedValue: ComputedRef<ReturnType<Exclude<Transform[Name], undefined>>>
  } {
  const mergedValue = computed(() => {
    const { value, config } = props.value
    const transform = builtinTransform[name]
    return transform
      ? transform(value, config ?? {})
      : unref(value)
  })

  const empty = computed(() => {
    return isEmptyValue(mergedValue.value)
  })

  return {
    empty,
    mergedValue,
  }
}
