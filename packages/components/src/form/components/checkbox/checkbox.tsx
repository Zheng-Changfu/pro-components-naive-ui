import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldCheckbox from './fields/field-checkbox'
import { useProCheckboxInst } from './inst'
import { proCheckboxProps } from './props'

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
