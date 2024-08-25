import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proInputProps } from './props'
import type { ProInputSlots } from './slots'
import { useProPasswordInst } from './inst'
import ProFieldPassword from './fields/field-password'

export default defineComponent({
  name: 'ProPassword',
  props: proInputProps,
  slots: Object as SlotsType<ProInputSlots>,
  setup(_, { expose }) {
    const [
      instRef,
      methods,
    ] = useProPasswordInst()

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
        fieldProps={{
          ...this.$props.fieldProps,
          type: 'password',
        }}
        valueType={ValueTypeEnum.PASSWORD}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldPassword ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
