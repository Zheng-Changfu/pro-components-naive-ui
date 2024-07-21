import type { BaseField, ExcludeExpression } from 'pro-components-hooks'
import { useCompile } from 'pro-components-hooks'
import { computed, toRef, useAttrs } from 'vue'
import { isUndefined } from 'lodash-es'
import { useInjectGlobalConfigContext } from '../../config-provider'
import { ProFieldConfigKey } from './fieldCustomKeys'

export function useFieldBindValues<T extends {
  fieldProps: any
  placeholder?: any
}>(
  field: BaseField,
  props: T,
) {
  const attrs = useAttrs()
  const { proForm } = useInjectGlobalConfigContext()

  const parsedFieldProps = useCompile(
    toRef(props, 'fieldProps'),
    { scope: field.scope },
  )

  /**
   * attrs 虽然是 proxy，但 isProxy 返回 false，所以浅克隆一层
   */
  const parsedAttrs = useCompile(
    computed(() => ({ ...attrs })),
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
      : proForm.renderPlaceholder?.(field[ProFieldConfigKey])
  })

  const bindValues = computed<ExcludeExpression<T['fieldProps']>>(() => {
    return {
      ...parsedAttrs.value,
      ...parsedFieldProps.value,
    }
  })

  return {
    bindValues,
    placeholder,
  }
}
