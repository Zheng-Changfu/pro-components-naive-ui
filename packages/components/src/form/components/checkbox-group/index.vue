<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { CheckboxGroupProps } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NSpace, NSpin } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proCheckboxGroupProps } from './props'
import type { ProCheckboxGroupSlots } from './slots'
import { useOptions } from './useOptions'
import type { ProCheckboxGroupInstance } from './inst'

export default defineComponent({
  name: 'ProCheckboxGroup',
  props: proCheckboxGroupProps,
  slots: Object as SlotsType<ProCheckboxGroupSlots>,
  setup(props, { expose }) {
    const field = useField(
      'ProCheckboxGroup',
      props,
      { defaultValue: [] },
    )

    const {
      bindValues,
    } = useFieldBindValues(field, props)

    const {
      loading,
      options,
      controls,
    } = useOptions(props, bindValues, field.scope)

    const nCheckboxGroupProps = computed<CheckboxGroupProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value as any,
        'defaultValue': undefined,
        'onUpdate:value': undefined,

        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProCheckboxGroupInstance = {
      getFetchControls: () => controls,
    }

    expose(exposed)
    return {
      loading,
      options,
      nCheckboxGroupProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
      loading,
      options,
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
                bindValues: { options, ...this.nCheckboxGroupProps },
              },
              () => (
                <NSpin
                  show={loading}
                  style={{ width: '100%' }}
                  {...$props.spinProps}
                  v-slots={{
                    default: () => {
                      return (
                        <NCheckboxGroup
                          {...this.nCheckboxGroupProps}
                          v-slots={{
                            ...$slots,
                            default: () => {
                              return (
                                <NSpace
                                  {...$props.spaceProps}
                                  v-slots={{
                                    default: () => {
                                      return options.map((item) => {
                                        return (
                                          <NCheckbox
                                            {...item}
                                            key={item.value}
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
