import type { SlotsType } from 'vue'
import type { ProUploadSlots } from './slots'
import { useOverrideProps } from '../../../composables'
import { ProField, ValueTypeEnum } from '../field'
import Upload from './fields/upload'
import { provideUploadInstStore } from './inst'
import { proUploadProps } from './props'
import { convertValueToFile } from './utils/file'

const name = 'ProUpload'
export default defineComponent({
  name,
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideUploadInstStore()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    function postValue(val: any) {
      return convertValueToFile(val, overridedProps.value.postValue)
    }

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
        defaultValue={[]}
        valueModelName="fileList"
        valueType={ValueTypeEnum.UPLOAD}
        postValue={this.postValue}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => (
            <Upload
              {...pureProps}
              v-slots={this.$slots}
            />
          ),
        }}
      </ProField>
    )
  },
})
