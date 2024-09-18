import type { SlotsType } from 'vue'
import type { ProUploadSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldUpload from './fields/field-upload'
import { useProUploadInst } from './inst'
import { proUploadProps } from './props'
import { convertValueToFile } from './utils/file'

const name = 'ProUpload'
export default defineComponent({
  name,
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProUploadInst()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    function postState(val: any) {
      return convertValueToFile(val, overridedProps.value.postState)
    }

    expose(methods)
    return {
      instRef,
      postState,
      overridedProps,
    }
  },
  render() {
    return (
      <ProField
        {...this.overridedProps}
        defaultValue={[]}
        valueModelName="fileList"
        valueType={ValueTypeEnum.UPLOAD}
        postState={this.postState}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => [
            <ProFieldUpload
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
