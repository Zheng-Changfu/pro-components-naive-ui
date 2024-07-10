<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { RadioGroupProps } from 'naive-ui'
import { NRadio, NRadioGroup, NSpace, NSpin } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proRadioGroupProps } from './props'
import type { ProRadioGroupSlots } from './slots'
import { useOptions } from './useOptions'
import type { ProRadioGroupInstance } from './inst'

export default defineComponent({
  name: 'ProRadioGroup',
  props: proRadioGroupProps,
  slots: Object as SlotsType<ProRadioGroupSlots>,
  setup(props, { expose }) {
    const field = useField(
      'ProRadioGroup',
      props,
      { defaultValue: null },
    )

    const {
      bindValues,
    } = useFieldBindValues(field, props)

    const {
      loading,
      options,
      controls,
    } = useOptions(props, bindValues, field.scope)

    const nRadioGroupProps = computed<RadioGroupProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value as any,
        'defaultValue': undefined,
        'onUpdate:value': undefined,

        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProRadioGroupInstance = {
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      loading,
      options,
      nRadioGroupProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
      options,
      loading,
    } = this

    return (
      <ProFormItem
        {...$props}
        v-slots={{
          default: () => {
            return resolveField(
              $props.renderField,
              {
                bindSlots: $slots,
                bindValues: { options, ...this.nRadioGroupProps },
              },
              () => (
                <NSpin
                  show={loading}
                  style={{ width: '100%' }}
                  {...$props.spinProps}
                  v-slots={{
                    default: () => {
                      return (
                        <NRadioGroup
                          {...this.nRadioGroupProps}
                          v-slots={{
                            ...$slots,
                            default: () => {
                              return (
                                <NSpace
                                  {...$props.spaceProps}
                                  v-slots={{
                                    default: () => {
                                      return options.map((item) => {
                                        const { label, ...rest } = item
                                        return (
                                          <NRadio
                                            {...rest}
                                            key={item.value}
                                            v-slots={{
                                              default: () => label,
                                            }}
                                          />
                                        )
                                      })
                                    },
                                  }}
                                />
                              )
                            },
                          }}
                        />
                      )
                    },
                  }}
                >
                </NSpin>
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
