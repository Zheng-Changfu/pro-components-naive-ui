<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { TransferProps } from 'naive-ui'
import { NSpin, NTransfer } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { ProFormItem } from '../../form-item'
import { proTransferProps } from './props'
import type { ProTransferSlots } from './slots'
import { useOptions } from './useOptions'
import type { ProTransferInstance } from './inst'

export default defineComponent({
  name: 'ProTransfer',
  props: proTransferProps,
  slots: Object as SlotsType<ProTransferSlots>,
  setup(props, { expose }) {
    const field = useField(
      'ProTransfer',
      props,
      { defaultValue: [] },
    )

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const {
      options,
      loading,
      controls,
      setOptions,
    } = useOptions(props, parsedProps, field)

    const nTransferProps = computed<TransferProps>(() => {
      const { value, doUpdateValue } = field
      const { placeholder, ...restProps } = parsedProps.value
      const [s, t] = placeholder ?? []
      return {
        ...restProps,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'value': value.value,
        'options': options.value,
        'sourceFilterPlaceholder': s,
        'targetFilterPlaceholder': t,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProTransferInstance = {
      setOptions,
      getOptions: () => options.value,
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      loading,
      nTransferProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
      loading,
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
                bindProps: this.nTransferProps,
              },
              () => (
                <NSpin
                  show={loading}
                  style={{ width: '100%' }}
                  {...$props.spinProps}
                  v-slots={{
                    default: () => {
                      return (
                        <NTransfer
                          {...this.nTransferProps}
                          v-slots={$slots}
                        />
                      )
                    },
                  }}
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
