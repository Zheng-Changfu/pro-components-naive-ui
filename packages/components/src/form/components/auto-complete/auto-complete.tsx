import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { useProAutoCompleteInst } from './inst'
import { proAutoCompleteProps } from './props'
import type { ProAutoCompleteSlots } from './slots'
import ProFieldAutoComplete from './fields/field-auto-complete'

export default defineComponent({
  name: 'ProAutoComplete',
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProAutoCompleteInst()
    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={null}
        valueType={ValueTypeEnum.AUTO_COMPLETE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldAutoComplete ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
