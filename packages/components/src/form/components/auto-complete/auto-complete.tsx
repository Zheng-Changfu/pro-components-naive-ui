import type { SlotsType } from 'vue'
import type { ProAutoCompleteProps } from './props'
import type { ProAutoCompleteSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import AutoComplete from './components/auto-complete'
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

    const overridedProps = useOverrideProps<ProAutoCompleteProps>(
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
        valueType={InternalValueTypeEnum.AUTO_COMPLETE}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <AutoComplete {...pureProps} v-slots={this.$slots}></AutoComplete>
          },
        }}
      </ProField>
    )
  },
})
