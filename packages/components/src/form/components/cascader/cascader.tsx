import type { SlotsType } from 'vue'
import type { ProCascaderSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldCascader from './fields/field-cascader'
import { useProCascaderInst } from './inst'
import { proCascaderProps } from './props'

export default defineComponent({
  name: 'ProCascader',
  props: proCascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProCascaderInst()
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
        valueType={ValueTypeEnum.CASCADER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldCascader ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
