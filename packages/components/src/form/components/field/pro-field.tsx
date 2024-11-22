import type { SlotsType } from 'vue'
import type { ProFormItemProps } from '../form-item'
import type { ProFieldSlots } from './slots'
import { NFlex } from 'naive-ui'
import { computed, defineComponent, Fragment } from 'vue'
import { ProFormItem } from '../form-item'
import { ProPopoverFormItem } from '../popover-form-item'
import { createField } from './composables/createField'
import { useMergeOptions } from './composables/useMergeOptions'
import { useValidationStatus } from './composables/useValidationStatus'
import { useVModelProps } from './composables/useVModelProps'
import { fieldExtraKey } from './keys'
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

    const fieldBindProps = computed(() => {
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

    const proFormItemBindProps = computed<ProFormItemProps>(() => {
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
      valueType: props.valueType,
    }

    return {
      fieldBindProps,
      show: field.show,
      proFormItemBindProps,
      mergedValidateBehavior,
      mergedValidateBehaviorProps,
      validationStatus: useValidationStatus(field),
    }
  },
  render() {
    if (!this.show) {
      return null
    }

    const renderFieldGroup = () => {
      const {
        $slots,
        addonAfter,
        addonBefore,
        fieldBindProps,
      } = this

      const groupRender = $slots.group
      const FieldComp = $slots.input?.(fieldBindProps)
      const addonAfterRender = $slots['addon-after'] ?? (() => addonAfter)
      const addonBeforeRender = $slots['addon-before'] ?? (() => addonBefore)

      if (
        !addonAfter
        && !addonBefore
        && !$slots['addon-after']
        && !$slots['addon-before']
      ) {
        return FieldComp
      }

      const FieldGroupComp = (
        <Fragment>
          {addonBeforeRender()}
          {FieldComp}
          {addonAfterRender()}
        </Fragment>
      )

      if (groupRender) {
        return groupRender(FieldGroupComp)
      }

      return (
        <NFlex
          wrap={false}
          align="center"
          size={[8, 0]}
          style={{ width: '100%' }}
        >
          {FieldGroupComp}
        </NFlex>
      )
    }

    if (this.simple) {
      // 简单模式下不包裹 ProFormItem
      return renderFieldGroup()
    }

    const {
      proFormItemBindProps,
      mergedValidateBehavior,
      mergedValidateBehaviorProps,
    } = this

    const proFormItemSlots = {
      label: this.$slots.label,
      feedback: this.$slots.feedback,
    }

    if (this.$slots.validation) {
      const formItemDom = (
        <ProFormItem
          {...proFormItemBindProps}
          showFeedback={false}
          v-slots={{
            ...proFormItemSlots,
            default: renderFieldGroup,
          }}
        />
      )

      const {
        errors,
        warnings,
        feedbacks,
        feedbackColor,
      } = this.validationStatus

      return this.$slots.validation({
        formItemDom,
        errors: errors.value,
        warnings: warnings.value,
        feedbacks: feedbacks.value,
        feedbackColor: feedbackColor.value,
      })
    }

    if (mergedValidateBehavior === 'popover') {
      return (
        <ProPopoverFormItem
          {...proFormItemBindProps}
          popoverProps={mergedValidateBehaviorProps}
          v-slots={{
            ...proFormItemSlots,
            default: renderFieldGroup,
          }}
        />
      )
    }

    return (
      <ProFormItem
        {...proFormItemBindProps}
        v-slots={{
          ...proFormItemSlots,
          default: renderFieldGroup,
        }}
      />
    )
  },
})
