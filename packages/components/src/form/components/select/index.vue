<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { SelectInst, SelectProps } from 'naive-ui'
import { NSelect } from 'naive-ui'
import { resolveField, useField, useParseFieldProps } from '../../field'
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

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const {
      loading,
      options,
      controls,
      onSearch,
      setOptions,
    } = useOptions(props, parsedProps, field)

    const nSelectProps = computed<SelectProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value as any,
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
      setOptions,
      getOptions: () => options.value,
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
              $props.fieldRender,
              {
                bindSlots: $slots,
                bindProps: this.nSelectProps,
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
