import type { SlotsType } from 'vue'
import type { ProCascaderSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, InternalValueTypeEnum } from '../field'
import Cascader from './fields/cascader'
import { provideCascaderInstStore } from './inst'
import { proCascaderProps } from './props'

const name = 'ProCascader'
export default defineComponent({
  name,
  props: proCascaderProps,
  slots: Object as SlotsType<ProCascaderSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideCascaderInstStore()

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
        valueType={InternalValueTypeEnum.CASCADER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Cascader
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
