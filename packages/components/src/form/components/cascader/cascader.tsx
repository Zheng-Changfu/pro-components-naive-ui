import type { SlotsType } from 'vue'
import type { ProCascaderProps } from './props'
import type { ProCascaderSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Cascader from './components/cascader'
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

    const overridedProps = useOverrideProps<ProCascaderProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToNull: true,
    })

    expose(exposed)
    return {
      postValue,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        postValue={this.postValue}
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
