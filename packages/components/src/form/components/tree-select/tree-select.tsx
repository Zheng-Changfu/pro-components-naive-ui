import type { SlotsType } from 'vue'
import type { ProTreeSelectSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import TreeSelect from './fields/tree-select'
import { useProTreeSelectInst } from './inst'
import { proTreeSelectProps } from './props'

const name = 'ProTreeSelect'
export default defineComponent({
  name,
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProTreeSelectInst()

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
        valueType={ValueTypeEnum.TREE_SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <TreeSelect
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
