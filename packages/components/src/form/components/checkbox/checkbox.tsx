import type { SlotsType } from 'vue'
import type { ProCheckboxSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Checkbox from './fields/checkbox'
import { useProCheckboxInst } from './inst'
import { proCheckboxProps } from './props'

const name = 'ProCheckbox'
export default defineComponent({
  name,
  props: proCheckboxProps,
  slots: Object as SlotsType<ProCheckboxSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCheckboxInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    expose(methods)
    return {
      instRef,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={false}
        valueModelName="checked"
        valueType={ValueTypeEnum.CHECKBOX}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Checkbox
              ref="instRef"
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
