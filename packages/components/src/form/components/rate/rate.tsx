import type { SlotsType } from 'vue'
import type { ProRateSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Rate from './components/rate'
import { proRateProps } from './props'

const name = 'ProRate'
export default defineComponent({
  name,
  props: proRateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      nilToNull: true,
    })

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
        valueType={InternalValueTypeEnum.RATE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Rate
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
