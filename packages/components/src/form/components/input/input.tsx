import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
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
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'text',
        }}
        valueType={InternalValueTypeEnum.INPUT}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Input
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
