<script lang="tsx">
import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent, ref } from 'vue'
import type { FormItemInst, FormItemProps } from 'naive-ui'
import { NFlex, NFormItem } from 'naive-ui'
import { useInjectFieldContext } from 'pro-components-hooks'
import { ProFieldConfigKey } from '../field'
import { proFormItemProps } from './props'
import type { ProFormItemSlots } from './slots'
import { useFormItemRule } from './useFormItemRule'
import { isEmptyValue } from './utils/valueUtil'
import { useCompileFormItemProps } from './useCompileFormItemProps'
import { useFormItemReadonly } from './useFormItemReadonly'
import { useReadonlyRenderer } from './useReadonlyRenderer'
import { useAddonSlotRenderer } from './useAddonSlotRenderer'
import { resolveFormItem } from './resolveFormItem'
import { resolveFieldGroup } from './resolveFieldGroup'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps,
  slots: Object as SlotsType<ProFormItemSlots>,
  setup(props) {
    const field = useInjectFieldContext()!
    const formItemInstRef = ref<FormItemInst>()

    const {
      show,
      value,
      stringPath,
    } = field

    const {
      rule: compiledRule,
      simple: compiledSimple,
      readonly: compiledReadonly,
      required: compiledRequired,
      nFormItemProps: compiledNFormItemProps,
    } = useCompileFormItemProps(props)

    const mergedRule = useFormItemRule({
      rule: compiledRule,
      required: compiledRequired,
    })

    const readonly = useFormItemReadonly({
      readonly: compiledReadonly,
    })

    const empty = computed(() => {
      return isEmptyValue(value.value)
    })

    const {
      addonAfterSlot,
      addonBeforeSlot,
    } = useAddonSlotRenderer(field[ProFieldConfigKey])

    const {
      renderReadonly,
      readonlyEmptyRender,
    } = useReadonlyRenderer(props, field[ProFieldConfigKey])

    const nFormItemExcludeRuleProps = computed<Omit<FormItemProps, 'rule'>>(() => {
      return {
        ref: formItemInstRef,
        path: stringPath.value,
        ...compiledNFormItemProps.value,
      }
    })

    const nFormItemProps = computed<FormItemProps>(() => {
      return {
        rule: mergedRule.value,
        ...nFormItemExcludeRuleProps.value,
      }
    })

    field[ProFieldConfigKey] = {
      formItemInstRef,
      formItemProps: nFormItemExcludeRuleProps,
      ...field[ProFieldConfigKey],
    }

    return {
      show,
      empty,
      readonly,
      nFormItemProps,
      addonAfterSlot,
      renderReadonly,
      addonBeforeSlot,
      readonlyEmptyRender,
      simple: compiledSimple,
    }
  },
  render() {
    const {
      show,
      empty,
      $props,
      $slots,
      simple,
      readonly,
      nFormItemProps,
      addonAfterSlot,
      addonBeforeSlot,
      renderReadonly,
      readonlyEmptyRender,
    } = this

    const {
      label: labelSlot,
      default: defaultSlot,
      feedback: feedbackSlot,
    } = $slots

    const renderContent = () => {
      if (!readonly) {
        const children = defaultSlot?.()
        if (!addonBeforeSlot && !addonAfterSlot) {
          return children
        }
        const vnode = (
          <Fragment>
            {addonBeforeSlot?.()}
            {children}
            {addonAfterSlot?.()}
          </Fragment>
        )

        return resolveFieldGroup(
          $props.fieldGroupRender,
          { vnode },
          () => (
            <NFlex
              wrap={false}
              style={{ width: '100%' }}
            >
              {vnode}
            </NFlex>
          ),
        )
      }
      return !empty
        ? renderReadonly?.()
        : readonlyEmptyRender?.()
    }

    if (!show) {
      return null
    }

    if (simple) {
      return renderContent()
    }

    const nFormItemSlots = {
      label: labelSlot,
      feedback: feedbackSlot,
      default: () => renderContent(),
    }

    return resolveFormItem(
      $props.formItemRender,
      {
        bindSlots: nFormItemSlots,
        bindValues: nFormItemProps,
      },
      () => (
        <NFormItem
          {...nFormItemProps}
          v-slots={nFormItemSlots}
        >
        </NFormItem>
      ),
    )
  },
})
</script>
