import type { ExcludeExpression } from 'pro-components-hooks'
import { useInjectFieldContext } from 'pro-components-hooks'
import type { ToRefs } from 'vue'
import { computed } from 'vue'
import { isArray } from 'lodash-es'
import type { FormItemRule } from 'naive-ui'
import { useInjectGlobalConfigContext } from '../../config-provider'
import { ProFieldConfigKey } from '../field'
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
    validateMessageRender,
  } = useInjectGlobalConfigContext().proForm

  const field = useInjectFieldContext()!
  const { stringPath } = field

  return computed(() => {
    const rawRule = rule.value
    const rawRequired = required.value
    const normalizedRule = (isArray(rawRule) ? [...rawRule] : [rawRule].filter(Boolean)) as FormItemRule[]
    if (rawRequired) {
      // 增加 required 规则
      const requiredRule: FormItemRule = {
        required: true,
        validator: (_, value) => !isEmptyValue(value),
      }
      // 支持 required 提示信息国际化
      if (validateMessageRender) {
        requiredRule.renderMessage = () => validateMessageRender(field[ProFieldConfigKey])
      }
      normalizedRule.push(requiredRule)
    }
    return normalizedRule.map((rule) => {
      return {
        /**
         * 统一设置表单校验时机
         */
        trigger: validateTrigger,
        ...rule,
        /**
         * 给每个 rule 增加 key，方便 validate 方法校验
         */
        key: stringPath.value,
      }
    })
  })
}
