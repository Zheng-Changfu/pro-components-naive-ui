import type { FormItemGiProps, FormItemInst, FormItemProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormItemSlots } from './slots'
import { QuestionCircleOutlined } from '@vicons/antd'
import { isArray } from 'lodash-es'
import { NEl, NFormItem, NIcon, NTooltip } from 'naive-ui'
import { useInjectFieldContext } from 'pro-components-hooks'
import { computed, defineComponent, ref, useAttrs } from 'vue'
import { fieldExtraKey } from '../field'
import PatchInternalValidate from './components/patch-internal-validate'
import { useRules } from './composables/useRules'
import { proFormItemProps } from './props'

export default defineComponent({
  name: 'ProFormItem',
  inheritAttrs: false,
  props: proFormItemProps,
  slots: Object as SlotsType<ProFormItemSlots>,
  setup(props) {
    const attrs = useAttrs()
    const rules = useRules(props)
    const field = useInjectFieldContext()
    const nFormItemInst = ref<FormItemInst>()

    const nFormItemProps = computed<FormItemProps | FormItemGiProps> (() => {
      const {
        label,
        title,
        tooltip,
        required,
        ...rest
      } = props
      return {
        ...attrs,
        ...rest,
        rule: rules.value,
        ref: nFormItemInst,
        label: title ?? label,
      }
    })

    const tooltips = computed(() => {
      const { tooltip } = props
      return (isArray(tooltip) ? tooltip : [tooltip]).filter(Boolean) as string[]
    })

    if (field) {
      field[fieldExtraKey] = {
        ...field[fieldExtraKey],
        proFormItemInst: nFormItemInst,
      }
    }

    return {
      rules,
      tooltips,
      nFormItemProps,
    }
  },
  render() {
    const showLabel = !!(this.$slots.label?.() ?? this.title ?? this.label)

    return (
      <NFormItem {...this.nFormItemProps}>
        {{
          feedback: this.$slots.feedback,
          label: showLabel
            ? () => {
                const label = this.$slots.label?.() ?? this.title ?? this.label
                const showTooltip = this.tooltips.length > 0 || !!this.$slots.tooltip
                return (
                  <NEl
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {label}
                    {showTooltip && (
                      <NTooltip trigger="hover">
                        {{
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
                            if (this.$slots.tooltip) {
                              return this.$slots.tooltip()
                            }
                            return this.tooltips.map((t, i) => {
                              return <NEl key={i + t}>{t}</NEl>
                            })
                          },
                        }}
                      </NTooltip>
                    )}
                  </NEl>
                )
              }
            : undefined,
          default: () => {
            return (
              <PatchInternalValidate rule={this.rules}>
                {this.$slots.default?.()}
              </PatchInternalValidate>
            )
          },
        }}
      </NFormItem>
    )
  },
})
