import type { SlotsType } from 'vue'
import type { ProDigitSlots } from './slots'
import { isString } from 'lodash-es'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Digit from './fields/digit'
import { useProDigitInst } from './inst'
import { proDigitProps } from './props'

const name = 'ProDigit'
export default defineComponent({
  name,
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = useProDigitInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    function tryConvertStringToNumber(val: any) {
      if (overridedProps.value.postValue) {
        return overridedProps.value.postValue(val)
      }
      if (isString(val)) {
        if (val === '') {
          return null
        }
        const v = Number(val)
        return Number.isNaN(v) ? val : v
      }
      return val
    }

    expose(exposed)
    return {
      overridedProps,
      tryConvertStringToNumber,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        postValue={this.tryConvertStringToNumber}
        valueType={ValueTypeEnum.DIGIT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Digit
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
