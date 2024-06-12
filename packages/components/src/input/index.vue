<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref, toRef } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { createField, useCompile } from 'pro-components-hooks'
import { useOmitSlots } from '../hooks/useOmitSlots'
import { ProFormItem, useGetProFieldProps, useReadonlyRenderer } from '../form'
import { proInputProps } from './props'
import { type ProInputSlots, proInputExtendSlotKeys } from './slots'
import type { ProInputInstance } from './inst'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { slots, expose }) {
    const inputInstRef = ref<InputInst>()
    const fieldProps = toRef(props, 'fieldProps')
    const placeholder = toRef(props, 'placeholder')
    const inputSlots = useOmitSlots(slots, proInputExtendSlotKeys)

    const proFieldProps = useGetProFieldProps(props)
    const field = createField({ ...proFieldProps, defaultValue: '' })

    const {
      scope,
      value,
      stringPath,
      doUpdateValue,
    } = field

    const compiledFieldProps = useCompile(fieldProps, { scope })
    const compiledPlaceholder = useCompile(placeholder, { scope })

    const inputProps = computed<InputProps>(() => {
      return {
        ...compiledFieldProps.value,
        'ref': inputInstRef,
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

    const exposed: ProInputInstance = {
      blur: () => inputInstRef.value?.blur(),
      clear: () => inputInstRef.value?.clear(),
      focus: () => inputInstRef.value?.focus(),
      select: () => inputInstRef.value?.select(),
      activate: () => inputInstRef.value?.activate(),
      deactivate: () => inputInstRef.value?.deactivate(),
      scrollTo: (options: any) => inputInstRef.value?.scrollTo(options),
    }

    expose(exposed)
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
