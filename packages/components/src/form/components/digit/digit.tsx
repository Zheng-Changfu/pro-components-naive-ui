import { isString } from 'lodash-es'
import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proDigitProps } from './props'
import type { ProDigitSlots } from './slots'
import { useProDigitInst } from './inst'
import ProFieldDigit from './fields/field-digit'

export default defineComponent({
  name: 'ProDigit',
  props: proDigitProps,
  slots: Object as SlotsType<ProDigitSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProDigitInst()

    function tryConvertStringToNumber(val: any) {
      if (props.postState) {
        return props.postState(val)
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

    expose(methods)
    return {
      instRef,
      tryConvertStringToNumber,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        postState={this.tryConvertStringToNumber}
        valueType={ValueTypeEnum.DIGIT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldDigit ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
