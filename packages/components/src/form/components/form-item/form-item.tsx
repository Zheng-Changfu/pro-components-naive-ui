import type { FormItemInst, FormItemProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormItemSlots } from './slots'
import { QuestionCircleOutlined } from '@vicons/antd'
import { NEl, NFormItem, NIcon } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed, defineComponent, ref, useAttrs } from 'vue'
import ProTooltip from '../../../_internal/components/pro-tooltip'
import { fieldExtraKey } from '../field'
import TrackValidationResult from './components/track-validation-result'
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
    const field = useInjectField()
    const nFormItemInst = ref<FormItemInst>()

    const nFormItemProps = computed<FormItemProps> (() => {
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
    const labelDom = this.$slots.label?.()
      ?? this.title
      ?? this.label
    /** TODO: style -> class */
    return (
      <NFormItem {...this.nFormItemProps}>
        {{
          feedback: this.$slots.feedback,
          label: labelDom
            ? () => {
                return (
                  <NEl
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    {labelDom}
                    <ProTooltip
                      trigger="hover"
                      tooltip={this.tooltip}
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
              <TrackValidationResult rule={this.rules}>
                {this.$slots.default?.()}
              </TrackValidationResult>
            )
          },
        }}
      </NFormItem>
    )
  },
})
