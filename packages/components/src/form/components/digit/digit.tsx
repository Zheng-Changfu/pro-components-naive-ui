import type { SlotsType } from 'vue'
import type { ProDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { isString } from 'lodash-es'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Digit from './components/digit'
import { provideDigitInstStore } from './inst'
import { proDigitProps } from './props'

const name = 'ProDigit'
export default defineComponent({
  name,
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideDigitInstStore()

    const overridedProps = useOverrideProps<ProDigitProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      transform: (value) => {
        if (isString(value)) {
          if (value === '') {
            return null
          }
          const v = Number(value)
          return Number.isNaN(v) ? value : v
        }
        return value ?? null
      },
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
        valueType={InternalValueTypeEnum.DIGIT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Digit
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
