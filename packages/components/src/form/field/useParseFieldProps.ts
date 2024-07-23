import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { useCompile } from 'pro-components-hooks'
import { computed, toRef } from 'vue'
import { isUndefined } from 'lodash-es'
import { useInjectGlobalConfigContext } from '../../config-provider'
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
  const { placeholderIntoProps = true } = options
  const { proForm } = useInjectGlobalConfigContext()

  const parsedFieldProps = useCompile(
    toRef(props, 'fieldProps'),
    { scope: field.scope },
  )

  const parsedPlaceholder = useCompile(
    toRef(props, 'placeholder'),
    { scope: field.scope },
  )

  const placeholder = computed(() => {
    const ph = parsedPlaceholder.value
    return !isUndefined(ph)
      ? ph
      : proForm.renderPlaceholder?.(field[proFieldConfigKey])
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
