import type { ComputedRef, VNodeChild } from 'vue'
import type { ProCopyableTextConfig } from './copyable-text/types'
import type { ProDateTextConfig } from './date-text/types'
import type { ProTagsConfig } from './tags/types'
import { computed, unref } from 'vue'
import { isEmptyValue } from '../_utils/isEmptyValue'
import { useInjectGlobalConfig, useInjectWrappedIn } from '../config-provider'
import { transformValueToString } from './copyable-text/copyable-text'
import { transformValueToTagOptions } from './tags/tags'

export interface Transform {
  /**
   * 转化 Tags 组件的值
   * @param value 外界传递进来的值
   */
  tags?: (value: any, config: ProTagsConfig) => Array<ProTagsConfig>
  /**
   * 转化 Images 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  /**
   * 转化 DateText 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  dateText?: (value: any, config: ProDateTextConfig) => string
  // images?: (value: any) => string[]
  /**
   * 转化 CopyableText 组件的值
   * @param value 外界传递进来的值
   * @param config 外界传递进来的配置
   */
  copyableText?: (value: any, config: ProCopyableTextConfig) => string
}

const builtinTransform: Transform = {
  tags: transformValueToTagOptions,
  copyableText: transformValueToString,
}

export function usePlainComponentConfig<Name extends keyof Transform>(
  name: Name,
  props: ComputedRef<{ value?: any, config?: Record<string, any> }>,
): {
    empty: ComputedRef<boolean>
    emptyText: ComputedRef<VNodeChild>
    mergedValue: ComputedRef<ReturnType<Exclude<Transform[Name], undefined>>>
  } {
  const wrappedIn = useInjectWrappedIn()

  const {
    mergedEmpty,
    mergedPlainComponentValueTransform,
  } = useInjectGlobalConfig()

  const mergedValue = computed(() => {
    const { value, config } = props.value
    const transform = mergedPlainComponentValueTransform[name] ?? builtinTransform[name]
    return transform
      ? transform(value, config ?? {})
      : unref(value)
  })

  const empty = computed(() => {
    return isEmptyValue(mergedValue.value)
  })

  const emptyText = computed(() => {
    return mergedEmpty(wrappedIn)
  })

  return {
    empty,
    emptyText,
    mergedValue,
  }
}
