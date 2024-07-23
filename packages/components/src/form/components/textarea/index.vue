<script lang="tsx">
import type { SlotsType } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import type { InputInst, InputProps } from 'naive-ui'
import { NInput } from 'naive-ui'
import { ProFormItem } from '../../form-item'
import { resolveField, useField, useParseFieldProps } from '../../field'
import { proTextareaProps } from './props'
import type { ProTextareaSlots } from './slots'
import type { ProTextareaInstance } from './inst'

export default defineComponent({
  name: 'ProTextarea',
  props: proTextareaProps,
  slots: Object as SlotsType<ProTextareaSlots>,
  setup(props, { expose }) {
    const nTextareaInstRef = ref<InputInst>()

    const field = useField(
      'ProTextarea',
      props,
      { defaultValue: null },
    )

    const parsedProps = useParseFieldProps(
      props,
      field,
    )

    const nTextareaProps = computed<InputProps>(() => {
      const { value, doUpdateValue } = field
      return {
        ...parsedProps.value,
        'defaultValue': undefined,
        'onUpdate:value': undefined,
        'ref': nTextareaInstRef,
        'pair': false,
        'type': 'textarea',
        'value': value.value,
        'onUpdateValue': doUpdateValue,
      }
    })

    const exposed: ProTextareaInstance = {
      blur: () => nTextareaInstRef.value?.blur(),
      clear: () => nTextareaInstRef.value?.clear(),
      focus: () => nTextareaInstRef.value?.focus(),
      select: () => nTextareaInstRef.value?.select(),
      activate: () => nTextareaInstRef.value?.activate(),
      deactivate: () => nTextareaInstRef.value?.deactivate(),
      scrollTo: (options: any) => nTextareaInstRef.value?.scrollTo(options),
    }

    expose(exposed)
    return {
      nTextareaProps,
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
                bindProps: this.nTextareaProps,
              },
              () => (
                <NInput
                  {...this.nTextareaProps}
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
