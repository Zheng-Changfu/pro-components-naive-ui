import type { ExcludeExpression } from 'pro-components-hooks'
import { useCompile, useInjectFieldContext } from 'pro-components-hooks'
import type { ToRefs } from 'vue'
import { computed } from 'vue'
import { isArray, isFunction } from 'lodash-es'
import type { FormItemRule } from 'naive-ui'
import { useInjectGlobalConfig } from '../../config-provider'
import { proFieldConfigKey } from '../field'
import { isEmptyValue } from './utils/valueUtil'

export interface UseFormItemRuleOptions {
  /**
   * 编译后的 required
   */
  required: boolean | undefined
  /**
   * 编译后的 rule
   */
  rule: ExcludeExpression<FormItemRule | FormItemRule[] | undefined>
}
export function useFormItemRule(options: ToRefs<UseFormItemRuleOptions>) {
  const {
    rule,
    required,
  } = options

  const {
    validateTrigger,
    requiredMessage,
  } = useInjectGlobalConfig().proForm

  const field = useInjectFieldContext()!
  const { scope, stringPath } = field
  const { name: componentName } = field[proFieldConfigKey]

  function requiredValidator(_: any, value: any) {
    return !isEmptyValue(value)
  }

  const parsedRequiredMessage = useCompile(
    computed(() => {
      let kv = requiredMessage
      if (!kv) {
        return
      }
      if (isFunction(kv)) {
        kv = kv()
      }
      const source = kv[componentName] ?? kv.default
      return source
    }),
    { scope },
  )

  function getRequiredMessage() {
    return parsedRequiredMessage.value!
  }

  return computed(() => {
    const rawRule = rule.value
    const rawRequired = required.value
    let normalizedRule = (isArray(rawRule) ? [...rawRule] : [rawRule].filter(Boolean)) as FormItemRule[]
    /**
     * 解决 naive-ui 如果需要为一个值为 number 类型的表项设定 required，需要在 rule 对象中设定 `type: 'number'` 的问题
     */
    if (rawRequired) {
      normalizedRule.push({
        required: true,
        validator: requiredValidator,
      })
    }
    normalizedRule = normalizedRule.map((rule) => {
      const { type, required, validator, asyncValidator } = rule
      const shouldAddRequiredValidator = required && [type, validator, asyncValidator].filter(Boolean).length === 0
      if (shouldAddRequiredValidator) {
        return {
          ...rule,
          validator: requiredValidator,
        }
      }
      return rule
    })

    return normalizedRule.map((rule) => {
      return {
        /**
         * 统一设置表单校验时机
         */
        trigger: validateTrigger,
        /**
         * 统一设置必填的提示信息
         */
        message: getRequiredMessage,
        ...rule,
        /**
         * 给每个 rule 增加 key，方便 validate 方法校验
         */
        key: stringPath.value,
      }
    })
  })
}
