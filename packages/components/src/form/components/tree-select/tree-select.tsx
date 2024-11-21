import type { SlotsType } from 'vue'
import type { ProTreeSelectSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import TreeSelect from './fields/tree-select'
import { provideTreeSelectInstStore } from './inst'
import { proTreeSelectProps } from './props'

const name = 'ProTreeSelect'
export default defineComponent({
  name,
  props: proTreeSelectProps,
  slots: Object as SlotsType<ProTreeSelectSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTreeSelectInstStore()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    expose(exposed)
    return {
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={InternalValueTypeEnum.TREE_SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <TreeSelect
                {...pureProps}
                v-slots={this.$slots}
              />
            )
          },
        }}
      </ProField>
    )
  },
})
