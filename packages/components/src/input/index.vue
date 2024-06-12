<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import type { InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import { ProFormItem, useGetProFieldProps, useReadonlyRenderer } from '../form'
import { proInputProps } from './props'
import { type ProInputSlots, proInputExtendSlotKeys } from './slots'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { slots }) {
    const fieldProps = toRef(props, 'fieldProps')
    const placeholder = toRef(props, 'placeholder')
    const inputSlots = useOmitSlots(slots, proInputExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: '' })

    const compiledFieldProps = useCompile(fieldProps, { scope: field.scope })
    const compiledPlaceholder = useCompile(placeholder, { scope: field.scope })

    const {
      value,
      stringPath,
      doUpdateValue,
    } = field

    const inputProps = computed<InputProps>(() => {
      return {
        ...compiledFieldProps.value,
        'pair': false,
        'type': 'text',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
        'onUpdate:value': doUpdateValue,
        'placeholder': compiledPlaceholder.value,
      }
    })

    const {
      readonlyRender,
      readonlyEmptyRender,
    } = useReadonlyRenderer({
      type: 'input',
      slots: computed(() => slots),
      value: computed(() => value.value),
      props: computed(() => inputProps.value),
    })

    const empty = computed(() => {
      return [null, undefined, ''].includes(value.value)
    })

    return {
      empty,
      stringPath,
      inputSlots,
      inputProps,
      readonlyRender,
      readonlyEmptyRender,
    }
  },
  render() {
    const {
      empty,
      $props,
      $attrs,
      inputSlots,
      stringPath,
      inputProps,
      readonlyRender,
      readonlyEmptyRender,
    } = this

    return (
      <ProFormItem
        {...$props}
        empty={empty}
        path={stringPath}
        v-slots={{
          readonly: readonlyRender,
          empty: readonlyEmptyRender,
          default: () => (
            <NInput
              {...$attrs}
              {...inputProps}
              v-slots={inputSlots}
            />
          ),
        }}
      />
    )
  },
})
</script>
