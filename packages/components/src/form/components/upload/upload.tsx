import type { SlotsType } from 'vue'
import type { ProUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { isArray, isString } from 'lodash-es'
import { uid } from 'pro-composables'
import { defineComponent } from 'vue'
import { useOverrideProps, usePostValue } from '../../../composables'
import { ProField } from '../field'
import { InternalValueTypeEnum } from '../field/enums'
import Upload from './components/upload'
import { provideUploadInstStore } from './inst'
import { proUploadProps } from './props'

const name = 'ProUpload'
export default defineComponent({
  name,
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const {
      exposed,
    } = provideUploadInstStore()

    const overridedProps = useOverrideProps<ProUploadProps>(
      name,
      props,
    )

    const postValue = usePostValue(overridedProps, {
      transform: (value) => {
        /**
         * 自动生成 id
         * 支持文件 url 组成的 fileList 回显
         */
        if (!isArray(value)) {
          value = [value].filter(Boolean)
        }
        return value.map((file: any) => {
          if (isString(file)) {
            return {
              id: uid(),
              url: file,
              name: file,
              status: 'finished',
            }
          }
          return {
            id: uid(),
            ...file,
          }
        })
      },
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
        valueModelName="fileList"
        postValue={this.postValue}
        valueType={InternalValueTypeEnum.UPLOAD}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <Upload {...pureProps} v-slots={this.$slots}></Upload>
          },
        }}
      </ProField>
    )
  },
})
