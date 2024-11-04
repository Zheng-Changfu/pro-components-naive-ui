import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Input from './fields/input'
import { useProInputInst } from './inst'
import { proInputProps } from './props'

const name = 'ProTextarea'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProInputInst()

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
        defaultValue={null}
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'textarea',
        }}
        valueType={ValueTypeEnum.TEXTAREA}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <Input
              ref="instRef"
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
