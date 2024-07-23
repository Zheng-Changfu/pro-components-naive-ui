<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { ProFormItem } from '../../form-item'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { proPasswordProps } from './props'
import type { ProPasswordSlots } from './slots'
import type { ProPasswordInstance } from './inst'

export default defineComponent({
  name: 'ProPassword',
  props: proPasswordProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  setup(props, { expose }) {
    const nPasswordInstRef = ref<InputInst>()

    const field = useField(
      'ProPassword',
      props,
      { defaultValue: null },
    )

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const nPasswordProps = computed<InputProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'ref': nPasswordInstRef,
        'pair': false,
        'type': 'password',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProPasswordInstance = {
      blur: () => nPasswordInstRef.value?.blur(),
      clear: () => nPasswordInstRef.value?.clear(),
      focus: () => nPasswordInstRef.value?.focus(),
      select: () => nPasswordInstRef.value?.select(),
      activate: () => nPasswordInstRef.value?.activate(),
      deactivate: () => nPasswordInstRef.value?.deactivate(),
      scrollTo: (options: any) => nPasswordInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      nPasswordProps,
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
                bindProps: this.nPasswordProps,
              },
              () => (
                <NInput
                  {...this.nPasswordProps}
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
