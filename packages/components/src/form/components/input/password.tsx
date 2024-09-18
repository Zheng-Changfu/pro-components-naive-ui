import type { SlotsType } from 'vue'
import type { ProInputSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldPassword from './fields/field-password'
import { useProPasswordInst } from './inst'
import { proInputProps } from './props'

const name = 'ProPassword'
export default defineComponent({
  name,
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProPasswordInst()

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
        fieldProps={{
          ...this.overridedProps.fieldProps,
          type: 'password',
        }}
        valueType={ValueTypeEnum.PASSWORD}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldPassword
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
