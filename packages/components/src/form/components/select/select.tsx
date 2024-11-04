import type { SlotsType } from 'vue'
import type { ProSelectSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Select from './fields/select'
import { useProSelectInst } from './inst'
import { proSelectProps } from './props'

const name = 'ProSelect'
export default defineComponent({
  name,
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProSelectInst()

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
        valueType={ValueTypeEnum.SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <Select
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
