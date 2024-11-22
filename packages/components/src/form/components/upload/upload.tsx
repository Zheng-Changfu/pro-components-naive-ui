import type { SlotsType } from 'vue'
import type { ProUploadSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../../../composables'
import { InternalValueTypeEnum, ProField } from '../field'
import Upload from './components/upload'
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
        valueModelName="fileList"
        valueType={InternalValueTypeEnum.UPLOAD}
        postValue={this.postValue}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return (
              <Upload
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
