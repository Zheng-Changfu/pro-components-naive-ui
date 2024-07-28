<script lang='tsx'>
import { useInjectFieldContext } from 'pro-components-hooks'
import type { SlotsType } from 'vue'
import { defineComponent, inject, ref } from 'vue'
import { QuestionCircleOutlined } from '@vicons/antd'
import type { FormItemGiProps, FormItemInst, FormItemProps } from 'naive-ui'
import { NEl, NFormItem, NFormItemGi, NIcon, NTooltip } from 'naive-ui'
import { isArray } from 'lodash-es'
import { proFormContextKey } from '../../context'
import { fieldExtraKey } from '../field'
import { proFormItemProps } from './props'
import type { ProFormItemSlots } from './slots'
import { useRules } from './composables/useRules'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps,
  slots: Object as SlotsType<ProFormItemSlots>,
  setup(props) {
    const rules = useRules(props)
    const field = useInjectFieldContext()!
    const nFormItemInst = ref<FormItemInst>()
    const { useFormItemGi } = inject(proFormContextKey)!

    field[fieldExtraKey] = {
      ...field[fieldExtraKey],
      proFormItemInst: nFormItemInst,
    }

    return {
      rules,
      useFormItemGi,
      nFormItemInst,
    }
  },
  render() {
    const {
      rules,
      $props,
      $attrs,
      $slots,
      useFormItemGi,
    } = this

    const {
      label,
      title,
      tooltip,
      required,
      ...rest
    } = $props

    const nFormItemProps: FormItemProps | FormItemGiProps = {
      ...$attrs,
      ...rest,
      rule: rules,
      label: title ?? label,
    }

    function renderLabel() {
      let labelVNode = null
      let tooltipVNode = null
      const slotLabel = $slots.label
      const slotTooltip = $slots.tooltip

      if (slotTooltip || tooltip) {
        tooltipVNode = (
          <NTooltip
            trigger="hover"
            v-slots={{
              trigger: () => {
                return (
                  <NIcon
                    size={16}
                    depth={3}
                    style={{
                      cursor: 'help',
                      marginInlineStart: '4px',
                    }}
                  >
                    <QuestionCircleOutlined />
                  </NIcon>
                )
              },
              default: () => {
                if (slotTooltip) {
                  return slotTooltip()
                }
                const tooltips = (isArray(tooltip) ? tooltip : [tooltip]).filter(Boolean)
                return tooltips.map((t, i) => {
                  return <NEl key={i}>{t}</NEl>
                })
              },
            }}
          >
          </NTooltip>
        )
      }

      if (slotLabel || label || title) {
        labelVNode = title ?? label ?? slotLabel?.()
      }

      return (
        <NEl
          tag="div"
          style={{
            display: 'inline-flex',
            alignmItems: 'center',
          }}
        >
          {labelVNode}
          {tooltipVNode}
        </NEl>
      )
    }

    /**
     * 这个属性是因为 Naive Ui 无法二次封装 n-grid，所以设计的属性
     */
    if (useFormItemGi) {
      return (
        <NFormItemGi
          ref="nFormItemInst"
          {...nFormItemProps}
          v-slots={{
            ...$slots,
            label: renderLabel,
          }}
        >
        </NFormItemGi>
      )
    }

    return (
      <NFormItem
        ref="nFormItemInst"
        {...nFormItemProps}
        v-slots={{
          ...$slots,
          label: renderLabel,
        }}
      >
      </NFormItem>
    )
  },
})
</script>
