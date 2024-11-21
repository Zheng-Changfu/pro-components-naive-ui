import type { SlotsType } from 'vue'
import type { ProAutoCompleteSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import AutoComplete from './fields/auto-complete'
import { provideAutoCompleteInstStore } from './inst'
import { proAutoCompleteProps } from './props'

const name = 'ProAutoComplete'
export default defineComponent({
  name,
  props: proAutoCompleteProps,
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideAutoCompleteInstStore()

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
        defaultValue={null}
        valueType={InternalValueTypeEnum.AUTO_COMPLETE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <AutoComplete
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
