import type { SlotsType } from 'vue'
import type { ProInputProps } from './props'
import type { ProInputSlots } from './slots'
import { defineComponent } from 'vue'
import { nilOrEmptyStringToNull } from '../../../_utils/nilOrEmptyStringToNull'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Input from './components/input'
import { provideTextInstStore } from './inst'
import { proInputProps } from './props'

const name = 'ProInput'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideTextInstStore()

    const overridedProps = useOverrideProps<ProInputProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      transform: nilOrEmptyStringToNull,
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
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'text',
        }}
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.INPUT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Input {...pureProps}>{this.$slots}</Input>
          },
        }}
      </ProField>
    )
  },
})
