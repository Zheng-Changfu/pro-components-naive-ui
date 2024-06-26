<script lang="tsx">
import type { SlotsType, ToRefs } from 'vue'
import { computed, defineComponent, inject, ref, toRefs, unref } from 'vue'
import type { FormItemInst, FormItemProps } from 'naive-ui'
import { NFormItem, NInputGroup } from 'naive-ui'
import { useCompile, useInjectFieldContext } from 'pro-components-hooks'
import { isBoolean } from 'lodash-es'
import { proFormReadonlyContextKey } from '../context'
import { ProComponentConfigKey } from '../field'
import { useReadonlyRenderer } from '../useReadonlyRenderer'
import { usePlaceholder } from '../usePlaceholder'
import { proFormItemProps } from './props'
import type { ProFormItemSlots } from './slots'
import { useFormItemRule } from './useFormItemRule'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps,
  slots: Object as SlotsType<ProFormItemSlots>,
  setup(props) {
    const {
      rule,
      size,
      label,
      first,
      feedback,
      rulePath,
      required,
      showLabel,
      fieldProps,
      labelWidth,
      labelAlign,
      labelProps,
      labelStyle,
      placeholder,
      showFeedback,
      feedbackClass,
      feedbackStyle,
      labelPlacement,
      showRequireMark,
      validationStatus,
      ignorePathChange,
      requireMarkPlacement,
      path, // path 不支持表达式
    } = toRefs(props)

    const field = useInjectFieldContext()!
    const formItemInstRef = ref<FormItemInst>()
    const formReadonlyRef = inject(proFormReadonlyContextKey)

    const {
      show,
      scope,
      value,
    } = field

    /**
     * 每个属性单独使用 useCompile 编译，提高性能（缓存）
     */
    const compiledRule = useCompile(rule, { scope })
    const compiledSize = useCompile(size, { scope })
    const compiledLabel = useCompile(label, { scope })
    const compiledFirst = useCompile(first, { scope })
    const compiledRequired = useCompile(required, { scope })
    const compiledFeedback = useCompile(feedback, { scope })
    const compiledRulePath = useCompile(rulePath, { scope })
    const compiledShowLabel = useCompile(showLabel, { scope })
    const compiledLabelWidth = useCompile(labelWidth, { scope })
    const compiledFieldProps = useCompile(fieldProps, { scope })
    const compiledLabelAlign = useCompile(labelAlign, { scope })
    const compiledLabelProps = useCompile(labelProps, { scope })
    const compiledLabelStyle = useCompile(labelStyle, { scope })
    const compiledPlaceholder = useCompile(placeholder, { scope })
    const compiledShowFeedback = useCompile(showFeedback, { scope })
    const compiledFeedbackClass = useCompile(feedbackClass, { scope })
    const compiledFeedbackStyle = useCompile(feedbackStyle, { scope })
    const compiledLabelPlacement = useCompile(labelPlacement, { scope })
    const compiledShowRequireMark = useCompile(showRequireMark, { scope })
    const compiledValidationStatus = useCompile(validationStatus, { scope })
    const compiledIgnorePathChange = useCompile(ignorePathChange, { scope })
    const compiledRequireMarkPlacement = useCompile(requireMarkPlacement, { scope })

    const mergedRule = useFormItemRule({
      rule: compiledRule,
      required: compiledRequired,
    })

    const readonly = computed(() => {
      const propReadonly = props.readonly
      const formReadonly = unref(formReadonlyRef)
      if (isBoolean(propReadonly)) {
        return propReadonly
      }
      if (isBoolean(formReadonly)) {
        return formReadonly
      }
      return false
    })

    const formItemProps: ToRefs<FormItemProps> = {
      path,
      rule: mergedRule,
      size: compiledSize,
      label: compiledLabel,
      first: compiledFirst,
      feedback: compiledFeedback,
      rulePath: compiledRulePath,
      showLabel: compiledShowLabel,
      labelWidth: compiledLabelWidth,
      labelAlign: compiledLabelAlign,
      labelProps: compiledLabelProps,
      labelStyle: compiledLabelStyle,
      showFeedback: compiledShowFeedback,
      feedbackClass: compiledFeedbackClass,
      feedbackStyle: compiledFeedbackStyle,
      labelPlacement: compiledLabelPlacement,
      showRequireMark: compiledShowRequireMark,
      validationStatus: compiledValidationStatus,
      ignorePathChange: compiledIgnorePathChange,
      requireMarkPlacement: compiledRequireMarkPlacement,
    }

    /**
     * 完善 ProComponentConfig
     */
    field[ProComponentConfigKey] = {
      value,
      formItemProps,
      formItemInstRef,
      fieldProps: compiledFieldProps,
      ...field[ProComponentConfigKey],
    }

    const {
      empty,
    } = field[ProComponentConfigKey]

    const mergedPlaceholder = usePlaceholder(
      compiledPlaceholder,
      field[ProComponentConfigKey],
    )

    const {
      readonlyRender,
      readonlyEmptyRender,
    } = useReadonlyRenderer(field[ProComponentConfigKey])

    return {
      show,
      path,
      empty,
      readonly,
      readonlyRender,
      readonlyEmptyRender,
      fieldProps: compiledFieldProps,
      placeholder: mergedPlaceholder,
      formItemInst: { ref: formItemInstRef },
      ...formItemProps,
    }
  },
  render() {
    const {
      show,
      empty,
      $props,
      $slots,
      readonly,
      readonlyRender,
      readonlyEmptyRender,
    } = this

    const {
      label: labelSlot,
      default: defaultSlot,
      feedback: feedbackSlot,
    } = $slots

    const {
      simple,
      renderField,
      renderFormItem,
    } = $props

    const renderContent = () => {
      if (!readonly) {
        const children = defaultSlot?.({
          fieldProps: this.fieldProps,
          placeholder: this.placeholder,
        })
        if (!$slots['addon-after'] && !$slots['addon-before']) {
          return renderField ? renderField(children) : children
        }
        const fieldVNode = (
          <NInputGroup>
            {$slots['addon-before']?.()}
            {children}
            {$slots['addon-after']?.()}
          </NInputGroup>
        )
        return renderField ? renderField(fieldVNode) : fieldVNode
      }
      return !empty
        ? readonlyRender?.()
        : readonlyEmptyRender?.()
    }

    if (!show) {
      return null
    }

    if (simple) {
      return renderContent()
    }

    const {
      rule,
      size,
      label,
      path,
      first,
      feedback,
      rulePath,
      showLabel,
      labelWidth,
      labelAlign,
      labelProps,
      labelStyle,
      formItemInst,
      showFeedback,
      feedbackClass,
      feedbackStyle,
      labelPlacement,
      showRequireMark,
      validationStatus,
      ignorePathChange,
      requireMarkPlacement,
    } = this

    const formItemProps: FormItemProps = {
      rule,
      size,
      label,
      path,
      first,
      feedback,
      rulePath,
      showLabel,
      labelWidth,
      labelAlign,
      labelProps,
      labelStyle,
      showFeedback,
      feedbackClass,
      feedbackStyle,
      labelPlacement,
      showRequireMark,
      validationStatus,
      ignorePathChange,
      requireMarkPlacement,
    }

    const domVNode = (
      <NFormItem
        {...formItemProps}
        ref={formItemInst.ref}
        v-slots={{
          label: labelSlot,
          feedback: feedbackSlot,
          default: () => renderContent(),
        }}
      >
      </NFormItem>
    )
    return renderFormItem ? renderFormItem(domVNode) : domVNode
  },
})
</script>
