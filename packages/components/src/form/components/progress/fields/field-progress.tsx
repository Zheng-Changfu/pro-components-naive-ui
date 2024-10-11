import type { SlotsType } from 'vue'
import type { ProProgressSlots } from '../slots'
import { isArray, isNumber } from 'lodash-es'
import { NInput, NProgress, progressProps } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldProgress',
  props: progressProps,
  slots: Object as SlotsType<ProProgressSlots>,
  inheritAttrs: false,
  setup() {
    const {
      empty,
      value,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    // 兼容编辑模式下字符串为null，undefined情况的处理
    const inputValue = computed(() => {
      if (!readonly && !isArray(value.value)) {
        return isNumber(value) ? String(value) : value
      }

      return value.value
    })

    return {
      empty,
      value,
      readonly,
      emptyText,
      inputValue,
    }
  },
  render() {
    const { value } = this

    if (this.readonly) {
      const { empty, emptyText, $slots } = this

      if ($slots.readonly) {
        return $slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NProgress
          style={{
            minWidth: '100px',
            maxWidth: '320px',
          }}
          {...this.$props}
          {...this.$attrs}
          percentage={value}
          v-slots={this.$slots}
        />
      )
    }

    const { unit = '' } = this.$props
    if (isArray(value)) {
      return (
        <NInput
          {...this.$attrs}
          value={String(value)}
          v-slots={
            unit && {
              suffix: () => unit,
            }
          }
        />
      )
    }

    return (
      <NInput
        {...this.$attrs}
        value={this.inputValue}
        v-slots={
          unit && {
            suffix: () => unit,
          }
        }
      />
    )
  },
})
