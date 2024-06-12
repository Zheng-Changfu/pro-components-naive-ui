<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, inject, toRefs, unref } from 'vue'
import type { FormItemProps } from 'naive-ui'
import { NFormItem } from 'naive-ui'
import { useCompile, useInjectFieldContext } from 'pro-components-hooks'
import { isBoolean } from 'lodash-es'
import { proFormReadonlyContextKey } from '../context'
import { proFormItemProps } from './props'
import type { ProFormItemSlots } from './slots'

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
      path, // path 不支持表达式
    } = toRefs(props)

    const { scope, show } = useInjectFieldContext()!
    const formReadonlyRef = inject(proFormReadonlyContextKey)

    /**
     * 每个属性单独使用 useCompile 编译，提高性能（缓存）
     */
    const compiledRule = useCompile(rule, { scope })
    const compiledSize = useCompile(size, { scope })
    const compiledLabel = useCompile(label, { scope })
    const compiledFirst = useCompile(first, { scope })
    const compiledFeedback = useCompile(feedback, { scope })
    const compiledRulePath = useCompile(rulePath, { scope })
    const compiledRequired = useCompile(required, { scope })
    const compiledShowLabel = useCompile(showLabel, { scope })
    const compiledLabelWidth = useCompile(labelWidth, { scope })
    const compiledLabelAlign = useCompile(labelAlign, { scope })
    const compiledLabelProps = useCompile(labelProps, { scope })
    const compiledLabelStyle = useCompile(labelStyle, { scope })
    const compiledShowFeedback = useCompile(showFeedback, { scope })
    const compiledFeedbackClass = useCompile(feedbackClass, { scope })
    const compiledFeedbackStyle = useCompile(feedbackStyle, { scope })
    const compiledLabelPlacement = useCompile(labelPlacement, { scope })
    const compiledShowRequireMark = useCompile(showRequireMark, { scope })
    const compiledValidationStatus = useCompile(validationStatus, { scope })
    const compiledIgnorePathChange = useCompile(ignorePathChange, { scope })
    const compiledRequireMarkPlacement = useCompile(requireMarkPlacement, { scope })

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

    return {
      show,
      path,
      readonly,
      rule: compiledRule,
      size: compiledSize,
      label: compiledLabel,
      first: compiledFirst,
      feedback: compiledFeedback,
      rulePath: compiledRulePath,
      required: compiledRequired,
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
  },
  render() {
    const {
      show,
      readonly,
    } = this

    const {
      empty,
      simple,
    } = this.$props

    const {
      label: labelSlot,
      empty: emptySlot,
      default: defaultSlot,
      readonly: readonlySlot,
      feedback: feedbackSlot,
    } = this.$slots

    const renderContent = () => {
      if (!readonly) {
        return defaultSlot?.()
      }
      return empty
        ? emptySlot?.()
        : readonlySlot?.()
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
      required,
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
    } = this

    const formItemProps: FormItemProps = {
      rule,
      size,
      label,
      path,
      first,
      feedback,
      rulePath,
      required,
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
    return (
      <NFormItem
        {...formItemProps}
        v-slots={{
          label: labelSlot,
          feedback: feedbackSlot,
          default: () => renderContent(),
        }}
      >
      </NFormItem>
    )
  },
})
</script>
