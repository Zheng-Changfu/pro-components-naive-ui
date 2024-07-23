<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { CheckboxGroupProps } from 'naive-ui'
import { NCheckbox, NCheckboxGroup, NFlex, NSpin } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
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

    const parsedProps = useParseFieldProps(
      props,
      field,
      { placeholderIntoProps: false },
    )

    const {
      loading,
      options,
      controls,
      setOptions,
    } = useOptions(props, parsedProps, field)

    const nCheckboxGroupProps = computed<CheckboxGroupProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProCheckboxGroupInstance = {
      setOptions,
      getOptions: () => options.value,
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
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: { options, ...this.nCheckboxGroupProps },
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
                                <NFlex
                                  {...$props.flexProps}
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
