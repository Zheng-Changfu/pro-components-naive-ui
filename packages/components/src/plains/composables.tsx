import type { ComputedRef, Ref, VNodeChild } from 'vue'
import type { CopyableTextConfig } from './copyable-text'
import { isString, toString } from 'lodash-es'
import { computed, unref } from 'vue'
import { isEmptyValue } from '../_utils/isEmptyValue'
import { useInjectGlobalConfig, useInjectWrappedIn } from '../config-provider'

export interface Transform {
  /**
   * 转化 Tags 组件的值
   * @param value 外界传递进来的值
   */
  // tags?: (value: any) => string[]
  /**
   * 转化 Images 组件的值
   * @param value 外界传递进来的值
   */
  // images?: (value: any) => string[]
  /**
   * 转化 CopyableText 组件的值
   * @param value 外界传递进来的值
   */
  copyableText?: (value: any, config: CopyableTextConfig) => string
  /**
   * 转化 DateText 组件的值
   * @param value 外界传递进来的值
   * @param format 外界传递进来的格式化方式
   */
  // dateText?: (value: any, format: string) => string
}

export const emptyText = '-'
const builtinTransform: Transform = {
  copyableText: (value: any) => {
    return isString(value) ? value : toString(value)
  },
}

export function usePlainComponentConfig<Name extends keyof Transform>(
  name: Name,
  value: Ref<any>,
  config: Ref<any>,
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
    const transform = mergedPlainComponentValueTransform[name] ?? builtinTransform[name]
    return transform
      ? transform(unref(value), unref(config))
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
