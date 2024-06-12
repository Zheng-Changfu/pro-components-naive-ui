import type { FormItemRule } from 'naive-ui'
import { type MaybeExpression, compile, useCompile, useInjectFieldContext } from 'pro-components-hooks'
import type { ToRefs } from 'vue'
import { computed } from 'vue'
import { isArray, isBoolean, isFunction, isString } from 'lodash-es'
import type { ProFormItemRule } from './types'

export interface UseFormItemRuleOptions {
  /**
   * props 的 required
   */
  required: MaybeExpression<boolean | undefined>
  /**
   * props 的 rule
   */
  rule: MaybeExpression<ProFormItemRule | ProFormItemRule[] | undefined>
}
export function useFormItemRule(options: ToRefs<UseFormItemRuleOptions>) {
  const { required, rule } = options
  const { scope } = useInjectFieldContext()!

  const compiledRule = useCompile(rule, { scope })
  const compiledRequired = useCompile(required, { scope })

  function convertWhenErrorToValidator(rule: ProFormItemRule): FormItemRule {
    const { whenError, ...restRule } = rule
    if (!whenError) {
      return rule
    }

    if (isFunction(whenError)) {
      return {
        ...restRule,
        validator: (...args) => !whenError(...args),
      }
    }

    if (isBoolean(whenError)) {
      return {
        ...restRule,
        validator: () => !whenError,
      }
    }

    if (isString(whenError)) {
      return {
        ...restRule,
        validator: () => !compile(whenError, scope),
      }
    }
    return restRule
  }

  const formItemRule = computed(() => {
    const rule = compiledRule.value
    const required = compiledRequired.value
    const normalizedRule = (isArray(rule) ? rule : [rule].filter(Boolean)) as FormItemRule[]
    console.log(required, rule)
    if (required) {
      normalizedRule.push({ type: 'string' })
    }
    return normalizedRule.map(convertWhenErrorToValidator)
  })

  // const rule = computed<Array<FormItemRule>>(() => {
  //   const { rule } = props
  // })

  return {
    rule: formItemRule,
    required: compiledRequired,
  }
}
