import type { FormItemGiProps, FormItemInst, FormItemProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormItemSlots } from './slots'
import { QuestionCircleOutlined } from '@vicons/antd'
import { NEl, NFormItem, NIcon } from 'naive-ui'
import { useInjectFieldContext } from 'pro-components-hooks'
import { computed, defineComponent, ref, useAttrs } from 'vue'
import ProTooltip from '../../../_internal/components/pro-tooltip'
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

    if (field) {
      field[fieldExtraKey] = {
        ...field[fieldExtraKey],
        proFormItemInst: nFormItemInst,
      }
    }

    return {
      rules,
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
                return (
                  <NEl
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {label}
                    <ProTooltip
                      trigger="hover"
                      tooltip={this.$props.tooltip}
                    >
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
                      }}
                    </ProTooltip>
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
