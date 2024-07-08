<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { SelectInst, SelectProps } from 'naive-ui'
import { NSelect } from 'naive-ui'
import { resolveField, useField, useFieldBindValues } from '../../field'
import { ProFormItem } from '../../form-item'
import { proSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import type { ProSelectInstance } from './inst'
import { useOptions } from './useOptions'

export default defineComponent({
  name: 'ProSelect',
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { expose }) {
    const nSelectInstRef = ref<SelectInst>()

    const field = useField(
      'ProSelect',
      props,
      { defaultValue: null },
    )

    const bindValues = useFieldBindValues(
      field,
      props,
    )

    const {
      loading,
      options,
      controls,
      onSearch,
    } = useOptions(props, bindValues)

    const nSelectProps = computed<SelectProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...bindValues.value as any,
        'defaultValue': undefined,
        'onUpdate:value': undefined,

        'ref': nSelectInstRef,
        'value': value.value,
        'loading': loading.value,
        'options': options.value,
        onSearch,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProSelectInstance = {
      getFetchControls: () => controls,
      blur: () => nSelectInstRef.value?.blur(),
      focus: () => nSelectInstRef.value?.focus(),
      blurInput: () => nSelectInstRef.value?.blurInput(),
      focusInput: () => nSelectInstRef.value?.focusInput(),
    }

    expose(exposed)
    return {
      nSelectProps,
    }
  },
  render() {
    const {
      $slots,
      $props,
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
                bindValues: this.nSelectProps,
              },
              () => (
                <NSelect
                  {...this.nSelectProps}
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
