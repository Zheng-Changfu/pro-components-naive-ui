<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { ProFormItem } from '../../form-item'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import type { ProInputInstance } from './inst'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const nInputInstRef = ref<InputInst>()

    const field = useField(
      'ProInput',
      props,
      { defaultValue: null },
    )

    const bindValues = useFieldBindValues(
      field,
      props,
    )

    const nInputProps = computed<InputProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value,
        'ref': nInputInstRef,
        'pair': false,
        'type': 'text',
        'value': value.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProInputInstance = {
      blur: () => nInputInstRef.value?.blur(),
      clear: () => nInputInstRef.value?.clear(),
      focus: () => nInputInstRef.value?.focus(),
      select: () => nInputInstRef.value?.select(),
      activate: () => nInputInstRef.value?.activate(),
      deactivate: () => nInputInstRef.value?.deactivate(),
      scrollTo: (options: any) => nInputInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      nInputProps,
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
              $props.renderField,
              {
                bindSlots: $slots,
                bindValues: this.nInputProps,
              },
              () => (
                <NInput
                  {...this.nInputProps}
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
