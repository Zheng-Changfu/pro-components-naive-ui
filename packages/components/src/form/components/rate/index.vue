<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RateProps } from 'naive-ui'
import { NRate } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { ProFormItem } from '../../form-item'
import { proRateProps } from './props'
import type { ProRateSlots } from './slots'

export default defineComponent({
  name: 'ProRate',
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props) {
    const field = useField(
      'ProRate',
      props,
      { defaultValue: null },
    )

    const parsedProps = useParseFieldProps(
      props,
      field,
      { placeholderIntoProps: false },
    )

    const nRateProps = computed<RateProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    return {
      nRateProps,
    }
  },
  render() {
    const {
      $props,
      $slots,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nRateProps,
              },
              () => (
                <NRate
                  {...this.nRateProps}
                  v-slots={$slots}
                />
              ),
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
