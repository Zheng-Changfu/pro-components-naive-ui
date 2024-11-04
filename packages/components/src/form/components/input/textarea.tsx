import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Input from './fields/input'
import { provideTextInstStore } from './inst'
import { proInputProps } from './props'

const name = 'ProTextarea'
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
        defaultValue={null}
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'textarea',
        }}
        valueType={ValueTypeEnum.TEXTAREA}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Input
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
