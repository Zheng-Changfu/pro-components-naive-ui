import type { SlotsType } from 'vue'
import type { ProCascaderSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldCascader from './fields/field-cascader'
import { useProCascaderInst } from './inst'
import { proCascaderProps } from './props'

const name = 'ProCascader'
export default defineComponent({
  name,
  props: proCascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCascaderInst()

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
        valueType={ValueTypeEnum.CASCADER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldCascader
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
