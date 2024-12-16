import type { SlotsType } from 'vue'
import type { ProSelectProps } from './props'
import type { ProSelectSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Select from './components/select'
import { provideSelectInstStore } from './inst'
import { proSelectProps } from './props'

const name = 'ProSelect'
export default defineComponent({
  name,
  props: proSelectProps,
  slots: Object as SlotsType<ProSelectSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideSelectInstStore()

    const overridedProps = useOverrideProps<ProSelectProps>(
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
        valueType={InternalValueTypeEnum.SELECT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Select {...pureProps}>{this.$slots}</Select>
          },
        }}
      </ProField>
    )
  },
})
