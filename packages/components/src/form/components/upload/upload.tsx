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

    function postValue(val: any) {
      return convertValueToFile(val, overridedProps.value.postValue)
    }

    expose(methods)
    return {
      instRef,
      postValue,
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
        postValue={this.postValue}
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
