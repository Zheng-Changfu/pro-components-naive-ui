import type { SlotsType } from 'vue'
import type { ProUploadSlots } from './slots'
import { ProField, ValueTypeEnum } from '../field'
import ProFieldUpload from './fields/field-upload'
import { useProUploadInst } from './inst'
import { proUploadProps } from './props'
import { convertValueToFile } from './utils/file'

export default defineComponent({
  name: 'ProUpload',
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProUploadInst()

    function postState(val: any) {
      return convertValueToFile(val, props.postState)
    }

    expose(methods)
    return {
      instRef,
      postState,
    }
  },
  render() {
    return (
      <ProField
        {...this.$props}
        defaultValue={[]}
        valueModelName="fileList"
        valueType={ValueTypeEnum.UPLOAD}
        postState={this.postState}
      >
        {{
          ...this.$slots,
          input: (pureProps: any) => {
            return <ProFieldUpload ref="instRef" {...pureProps} v-slots={this.$slots} />
          },
        }}
      </ProField>
    )
  },
})
