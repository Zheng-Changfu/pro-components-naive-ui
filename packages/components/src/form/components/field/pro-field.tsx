import type { SlotsType, VNodeChild } from 'vue'
import type { ProFormItemProps } from '../form-item'
import type { ProFieldSlots } from './slots'
import { computed, defineComponent } from 'vue'
import { ProFormItem } from '../form-item'
import { ProPopoverFormItem } from '../popover-form-item'
import { createField } from './composables/createField'
import { useMergeOptions } from './composables/useMergeOptions'
import { useValidationStatus } from './composables/useValidationStatus'
import { useVModelProps } from './composables/useVModelProps'
import { fieldExtraKey } from './field-extra-info'
import { proFieldProps } from './props'

export default defineComponent({
  name: 'ProField',
  inheritAttrs: false,
  props: proFieldProps,
  slots: Object as SlotsType<ProFieldSlots>,
  setup(props, { attrs }) {
    const field = createField(props)

    const vModelProps = useVModelProps(
      props,
      { field },
    )

    const {
      mergedTitle,
      mergedReadonly,
      mergedShowLabel,
      mergedPlaceholder,
      mergedShowFeedback,
      mergedValidateBehavior,
      mergedValidateBehaviorProps,
    } = useMergeOptions(props, { field })

    const inputProps = computed(() => {
      const fieldProps = props.fieldProps ?? {}
      if (mergedPlaceholder.value === undefined) {
        return {
          ...fieldProps,
          ...vModelProps.value,
        }
      }
      return {
        ...fieldProps,
        ...vModelProps.value,
        placeholder: mergedPlaceholder.value,
      }
    })

    const proFormItemProps = computed<ProFormItemProps>(() => {
      return {
        ...attrs,
        size: props.size,
        rule: props.rule,
        first: props.first,
        theme: props.theme,
        tooltip: props.tooltip,
        rulePath: props.rulePath,
        feedback: props.feedback,
        required: props.required,
        title: mergedTitle.value,
        labelWidth: props.labelWidth,
        labelAlign: props.labelAlign,
        labelProps: props.labelProps,
        labelStyle: props.labelStyle,
        path: field.stringPath.value,
        showLabel: mergedShowLabel.value,
        feedbackClass: props.feedbackClass,
        feedbackStyle: props.feedbackStyle,
        labelPlacement: props.labelPlacement,
        themeOverrides: props.themeOverrides,
        showFeedback: mergedShowFeedback.value,
        showRequireMark: props.showRequireMark,
        ignorePathChange: props.ignorePathChange,
        validationStatus: props.validationStatus,
        requireMarkPlacement: props.requireMarkPlacement,
        builtinThemeOverrides: props.builtinThemeOverrides,
      }
    })

    field[fieldExtraKey] = {
      readonly: mergedReadonly,
    }

    return {
      inputProps,
      show: field.show,
      proFormItemProps,
      mergedValidateBehavior,
      mergedValidateBehaviorProps,
      validationStatus: useValidationStatus(field),
    }
  },
  render() {
    if (!this.show) {
      return null
    }

    if (this.simple) {
      // 简单模式下不包裹 ProFormItem
      return this.$slots.input(this.inputProps)
    }

    const {
      proFormItemProps,
      validationStatus,
      mergedValidateBehavior,
      mergedValidateBehaviorProps,
    } = this

    const proFormItemSlots = {
      label: this.$slots.label,
      feedback: this.$slots.feedback,
    }

    let formItemDom: VNodeChild

    if (mergedValidateBehavior === 'popover') {
      formItemDom = (
        <ProPopoverFormItem
          {...proFormItemProps}
          popoverProps={mergedValidateBehaviorProps}
          v-slots={{
            ...proFormItemSlots,
            default: () => this.$slots.input(this.inputProps),
          }}
        />
      )
    }

    formItemDom = (
      <ProFormItem
        {...proFormItemProps}
        v-slots={{
          ...proFormItemSlots,
          default: () => this.$slots.input(this.inputProps),
        }}
      />
    )

    return this.$slots['form-item']
      ? this.$slots['form-item']({
        proFormItemProps,
        proFormItemDom: formItemDom,
        errors: validationStatus.errors.value,
        warnings: validationStatus.warnings.value,
        feedbacks: validationStatus.feedbacks.value,
        feedbackColor: validationStatus.feedbackColor.value,
      })
      : formItemDom
  },
})
