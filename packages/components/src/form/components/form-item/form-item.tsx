import type { FormItemInst, FormItemProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormItemSlots } from './slots'
import { QuestionCircleOutlined } from '@vicons/antd'
import { NFormItem, NIcon } from 'naive-ui'
import { useInjectField } from 'pro-composables'
import { computed, defineComponent, Fragment, ref, useAttrs } from 'vue'
import ProTooltip from '../../../_internal/components/pro-tooltip'
import { useNaiveClsPrefix } from '../../../_internal/useClsPrefix'
import { useMountStyle } from '../../../_internal/useMountStyle'
import { useFieldUtils } from '../field'
import { fieldExtraKey } from '../field/field-extra-info'
import TrackValidationResult from './components/track-validation-result'
import { useRules } from './composables/useRules'
import { proFormItemProps } from './props'
import style from './styles/index.cssr'

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
    const mergedClsPrefix = useNaiveClsPrefix()

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

    useMountStyle(
      'ProFormItem',
      'pro-form-item',
      style,
    )

    return {
      rules,
      nFormItemProps,
      mergedClsPrefix,
      fieldUtils: field ? useFieldUtils(field) : null,
    }
  },
  render() {
    const feedback = this.$slots.feedback
    const labelDom = this.$slots.label?.()
      ?? this.title
      ?? this.label

    return (
      <NFormItem
        {...this.nFormItemProps}
        class={[`${this.mergedClsPrefix}-pro-form-item`]}
      >
        {{
          feedback: feedback as any
            ? () => {
                /**
                 * 如果 form-item 不包含在 form 中，拿不到这些信息
                 */
                if (!this.fieldUtils) {
                  return feedback({
                    errors: [],
                    warnings: [],
                    feedbacks: [],
                    feedbackDom: null,
                    feedbackColor: '',
                  })
                }

                const {
                  errors,
                  warnings,
                  feedbacks,
                  feedbackColor,
                } = this.fieldUtils

                const feedbackDom = (
                  <Fragment>
                    {feedbacks.value.map((feedback) => {
                      return (
                        <div class={[`${this.mergedClsPrefix}-pro-form-item__feedback-message`]}>
                          {feedback.message}
                        </div>
                      )
                    })}
                  </Fragment>
                )

                return feedback({
                  feedbackDom,
                  errors: errors.value,
                  warnings: warnings.value,
                  feedbacks: feedbacks.value,
                  feedbackColor: feedbackColor.value,
                })
              }
            : undefined,
          label: labelDom
            ? () => {
                return (
                  <div class={[`${this.mergedClsPrefix}-pro-form-item__label`]}>
                    {labelDom}
                    <ProTooltip
                      trigger="hover"
                      tooltip={this.tooltip}
                    >
                      {{
                        trigger: () => {
                          return (
                            <NIcon
                              depth={3}
                              size={16}
                              class={[`${this.mergedClsPrefix}-pro-form-item__icon`]}
                            >
                              <QuestionCircleOutlined />
                            </NIcon>
                          )
                        },
                      }}
                    </ProTooltip>
                  </div>
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
