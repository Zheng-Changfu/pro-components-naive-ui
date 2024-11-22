import type { SlotsType } from 'vue'
import type { ProCascaderSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
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
        valueType={InternalValueTypeEnum.CASCADER}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Cascader
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
