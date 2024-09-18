import type { BaseField } from 'pro-components-hooks'
import type { ProFieldProps } from '../props'
import { useCompile } from 'pro-components-hooks'
import { computed, toRef, useAttrs } from 'vue'

export function useParseProps({ scope }: BaseField, props: ProFieldProps) {
  const attrs = useAttrs()
  const parsedSize = useCompile(toRef(props, 'size'), { scope })
  const parsedRule = useCompile(toRef(props, 'rule'), { scope })
  const parsedTitle = useCompile(toRef(props, 'title'), { scope })
  const parsedLabel = useCompile(toRef(props, 'label'), { scope })
  const parsedFirst = useCompile(toRef(props, 'first'), { scope })
  const parsedSimple = useCompile(toRef(props, 'simple'), { scope })
  const parsedTooltip = useCompile(toRef(props, 'tooltip'), { scope })
  const parsedRulePath = useCompile(toRef(props, 'rulePath'), { scope })
  const parsedFeedback = useCompile(toRef(props, 'feedback'), { scope })
  const parsedReadonly = useCompile(toRef(props, 'readonly'), { scope })
  const parsedRequired = useCompile(toRef(props, 'required'), { scope })
  const parsedValueType = useCompile(toRef(props, 'valueType'), { scope })
  const parsedShowLabel = useCompile(toRef(props, 'showLabel'), { scope })
  const parsedAttrs = useCompile(computed(() => ({ ...attrs })), { scope })
  const parsedAddonAfter = useCompile(toRef(props, 'addonAfter'), { scope })
  const parsedLabelWidth = useCompile(toRef(props, 'labelWidth'), { scope })
  const parsedLabelAlign = useCompile(toRef(props, 'labelAlign'), { scope })
  const parsedFieldProps = useCompile(toRef(props, 'fieldProps'), { scope })
  const parsedLabelProps = useCompile(toRef(props, 'labelProps'), { scope })
  const parsedLabelStyle = useCompile(toRef(props, 'labelStyle'), { scope })
  const parsedPlaceholder = useCompile(toRef(props, 'placeholder'), { scope })
  const parsedAddonBefore = useCompile(toRef(props, 'addonBefore'), { scope })
  const parsedShowFeedback = useCompile(toRef(props, 'showFeedback'), { scope })
  const parsedFeedbackStyle = useCompile(toRef(props, 'feedbackStyle'), { scope })
  const parsedFeedbackClass = useCompile(toRef(props, 'feedbackClass'), { scope })
  const parsedLabelPlacement = useCompile(toRef(props, 'labelPlacement'), { scope })
  const parsedValueModelName = useCompile(toRef(props, 'valueModelName'), { scope })
  const parsedShowRequireMark = useCompile(toRef(props, 'showRequireMark'), { scope })
  const parsedIgnorePathChange = useCompile(toRef(props, 'ignorePathChange'), { scope })
  const parsedValidationStatus = useCompile(toRef(props, 'validationStatus'), { scope })
  const parsedValidateBehavior = useCompile(toRef(props, 'validateBehavior'), { scope })
  const parsedRequireMarkPlacement = useCompile(toRef(props, 'requireMarkPlacement'), { scope })
  const parsedValidateBehaviorProps = useCompile(toRef(props, 'validateBehaviorProps'), { scope })

  return {
    size: parsedSize,
    rule: parsedRule,
    title: parsedTitle,
    label: parsedLabel,
    first: parsedFirst,
    attrs: parsedAttrs,
    simple: parsedSimple,
    tooltip: parsedTooltip,
    rulePath: parsedRulePath,
    feedback: parsedFeedback,
    readonly: parsedReadonly,
    required: parsedRequired,
    valueType: parsedValueType,
    showLabel: parsedShowLabel,
    addonAfter: parsedAddonAfter,
    labelWidth: parsedLabelWidth,
    labelAlign: parsedLabelAlign,
    fieldProps: parsedFieldProps,
    labelProps: parsedLabelProps,
    labelStyle: parsedLabelStyle,
    addonBefore: parsedAddonBefore,
    placeholder: parsedPlaceholder,
    showFeedback: parsedShowFeedback,
    feedbackStyle: parsedFeedbackStyle,
    feedbackClass: parsedFeedbackClass,
    labelPlacement: parsedLabelPlacement,
    valueModelName: parsedValueModelName,
    showRequireMark: parsedShowRequireMark,
    ignorePathChange: parsedIgnorePathChange,
    validationStatus: parsedValidationStatus,
    validateBehavior: parsedValidateBehavior,
    requireMarkPlacement: parsedRequireMarkPlacement,
    validateBehaviorProps: parsedValidateBehaviorProps,
  }
}
