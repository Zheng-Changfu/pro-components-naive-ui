import type { FormItemRule } from 'naive-ui'
import { type MaybeExpression, compile, useInjectFieldContext } from 'pro-components-hooks'
import type { ToRefs } from 'vue'
import { computed } from 'vue'
import { isArray, isBoolean, isFunction, isString } from 'lodash-es'
import { ProComponentConfigKey } from '../field'
import { useInjectGlobalConfigContext } from '../../config-provider'
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
  const {
    rule,
    required,
  } = options

  const {
    validateTrigger,
    validateMessageRender,
  } = useInjectGlobalConfigContext().proForm

  const field = useInjectFieldContext()!
  const { scope, stringPath } = field

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

  return computed(() => {
    const rawRule = rule.value
    const rawRequired = required.value
    const normalizedRule = (isArray(rawRule) ? [...rawRule] : [rawRule].filter(Boolean)) as ProFormItemRule[]
    if (rawRequired) {
      // 增加规则
      const ruleType = field[ProComponentConfigKey].ruleType
      const ruleTypes = isArray(ruleType) ? ruleType : [ruleType]
      const requiredRules = ruleTypes.map((t) => {
        const baseRule: ProFormItemRule = {
          type: t,
          required: true,
        }
        // 支持 required 提示信息国际化
        if (validateMessageRender) {
          baseRule.renderMessage = () => validateMessageRender(field[ProComponentConfigKey])
        }
        return baseRule
      })
      normalizedRule.push(...requiredRules)
    }
    return normalizedRule.map((rule) => {
      return {
        /**
         * 统一设置表单校验时机
         */
        trigger: validateTrigger,
        /**
         *  whenError 代替了 validator，是 validator 的一种简写形式
         *  如果既有 whenError，又有 validator，忽略掉 validator
         */
        ...convertWhenErrorToValidator(rule),
        /**
         * 给每个 rule 增加 key，方便 validate 方法校验
         */
        key: stringPath.value,
      }
    })
  })
}
