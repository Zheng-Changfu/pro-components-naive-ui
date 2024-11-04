import type { SlotsType } from 'vue'
import type { ProAutoCompleteSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import AutoComplete from './fields/auto-complete'
import { useProAutoCompleteInst } from './inst'
import { proAutoCompleteProps } from './props'

const name = 'ProAutoComplete'
export default defineComponent({
  name,
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProAutoCompleteInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    expose(methods)
    return {
      instRef,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={null}
        valueType={ValueTypeEnum.AUTO_COMPLETE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <AutoComplete
              ref="instRef"
              {...pureProps}
              v-slots={this.$slots}
            />,
          ],
        }}
      </ProField>
    )
  },
})
