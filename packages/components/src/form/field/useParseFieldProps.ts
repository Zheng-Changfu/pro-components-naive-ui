import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { compile, useCompile } from 'pro-components-hooks'
import { computed, toRef } from 'vue'
import { isFunction } from 'lodash-es'
import { useInjectGlobalConfig } from '../../config-provider'
import { proFieldConfigKey } from './fieldCustomKeys'

interface UseParseFieldPropsOptions {
  /**
   * placeholder 是否添加到 bindProps 中，默认 true
   */
  placeholderIntoProps?: boolean
}
export function useParseFieldProps<T extends {
  fieldProps: any
  placeholder?: any
}>(
  props: T,
  field: BaseField,
  options: UseParseFieldPropsOptions = {},
) {
  const { scope } = field
  const { proForm } = useInjectGlobalConfig()
  const { placeholderIntoProps = true } = options
  const { name: componentName } = field[proFieldConfigKey]

  const parsedFieldProps = useCompile(
    toRef(props, 'fieldProps'),
    { scope },
  )

  const parsedPlaceholder = useCompile(
    toRef(props, 'placeholder'),
    { scope },
  )

  const parsedGlobalPlaceholder = computed(() => {
    let kv = proForm.placeholder
    if (!kv) {
      return
    }
    if (isFunction(kv)) {
      kv = kv()
    }
    const placeholder = kv[componentName] ?? kv.default
    return compile(placeholder, scope)
  })

  const placeholder = computed(() => {
    return parsedPlaceholder.value ?? parsedGlobalPlaceholder.value
  })

  const bindProps = computed<ExcludeExpression<T['fieldProps']>>(() => {
    const parsedProps = parsedFieldProps.value
    if (!placeholderIntoProps) {
      return parsedProps
    }
    return {
      ...parsedProps,
      placeholder: placeholder.value,
    }
  })

  return bindProps
}
