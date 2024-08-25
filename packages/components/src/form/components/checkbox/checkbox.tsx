import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proCheckboxProps } from './props'
import type { ProCheckboxSlots } from './slots'
import { useProCheckboxInst } from './inst'
import ProFieldCheckbox from './fields/field-checkbox'

export default defineComponent({
  name: 'ProCheckbox',
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCheckboxInst()
    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={false}
        valueModelName="checked"
        valueType={ValueTypeEnum.CHECKBOX}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldCheckbox ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
