import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { CopyableTextConfig } from './copyable-text'
import { isString, toString } from 'lodash-es'
import { computed, inject, provide, unref } from 'vue'
import { isEmptyValue } from '../_utils/isEmptyValue'

interface Transform {
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

interface PlainComponentConfig {
  /**
   * 转化值,转化后的值进行渲染
   */
  transform?: Transform
}

export const emptyText = '-'
const builtinTransform: Transform = {
  copyableText: (value: any) => {
    if (isEmptyValue(value)) {
      return emptyText
    }
    return isString(value) ? value : toString(value)
  },
}

const plainComponentConfigContextKey = 'plain-component-config' as any as InjectionKey<PlainComponentConfig>

export function providePlainComponentConfig(config: PlainComponentConfig) {
  provide(plainComponentConfigContextKey, config)
}

export function useInjectPlainComponentConfig() {
  return inject(plainComponentConfigContextKey, {})
}

export function useMergePlainComponentConfig<Name extends keyof Transform>(
  name: Name,
  value: Ref<any>,
  config: Ref<any>,
): {
    mergedValue: ComputedRef<ReturnType<Exclude<Transform[Name], undefined>>>
  } {
  const { transform } = useInjectPlainComponentConfig()
  const transformFn = (transform ?? {})[name] ?? builtinTransform[name]

  const mergedValue = computed(() => {
    return transformFn
      ? transformFn(unref(value), unref(config))
      : unref(value)
  })

  return {
    mergedValue,
  }
}
