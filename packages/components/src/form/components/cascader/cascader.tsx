import type { SlotsType } from 'vue'
import type { ProCascaderSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Cascader from './fields/cascader'
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
          input: (pureProps: any) => (
            <Cascader
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
