import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { useProInputInst } from './inst'
import ProFieldInput from './fields/field-input'

export default defineComponent({
  name: 'ProInput',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProInputInst()

    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        fieldProps={{
          ...this.$props.fieldProps,
          type: 'text',
        }}
        valueType={ValueTypeEnum.INPUT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldInput ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
