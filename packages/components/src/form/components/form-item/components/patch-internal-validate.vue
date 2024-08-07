<script setup lang='tsx'>
import { useInjectFieldContext } from 'pro-components-hooks'
import type { PropType } from 'vue'
import { inject, onUnmounted, provide } from 'vue'
import type { FormItemRule } from 'naive-ui'
import type { FieldExtraInfo } from '../../field'
import { fieldExtraKey } from '../../field'
import { proFormContextKey } from '../../../context'
import type { FormItemInternalValidateResult } from '../../../composables/useValidateResult'

/**
 * 对表单项调用校验的方法打补丁，为了收集校验结果，实现错误信息自定义位置
 */
defineOptions({
  name: 'PatchInternalValidate',
})

const props = defineProps({
  rule: Array as PropType<FormItemRule[]>,
})

const field = useInjectFieldContext()!
const nFormItem = inject('n-form-item')!
const formContext = inject(proFormContextKey)
const formItemInstRef = (field?.[fieldExtraKey] as FieldExtraInfo)?.proFormItemInst

function collectValidateResult(trigger: string, res: Partial<FormItemInternalValidateResult>) {
  const { errors, warnings } = res
  if (!field)
    return
  const path = field.stringPath.value

  const activeRules = (
    props.rule!.filter((rule) => {
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.includes(trigger)
      }
      else {
        return rule.trigger === trigger
      }
    })
  )
  if (!activeRules.length) {
    return
  }

  if (path && formContext) {
    formContext.clearValidateResults(path)
    formContext.addValidateErrors(path, errors)
    formContext.addValidateWarnings(path, warnings)
  }
}

function handleContentBlur(): void {
  formItemInstRef?.value
    .internalValidate('blur')
    .then(res => collectValidateResult('blur', res))
}

function handleContentChange(): void {
  formItemInstRef?.value
    .internalValidate('change')
    .then(res => collectValidateResult('change', res))
}

function handleContentFocus(): void {
  formItemInstRef?.value
    .internalValidate('focus')
    .then(res => collectValidateResult('focus', res))
}

function handleContentInput(): void {
  formItemInstRef?.value
    .internalValidate('input')
    .then(res => collectValidateResult('input', res))
}

provide('n-form-item', {
  ...nFormItem,
  handleContentBlur,
  handleContentChange,
  handleContentFocus,
  handleContentInput,
})

onUnmounted(() => {
  if (formContext && field) {
    formContext.clearValidateResults(field.stringPath.value)
  }
})
</script>

<template>
  <slot name="default" />
</template>
