import type { SlotsType } from 'vue'
import { ProField, ValueTypeEnum } from '../field'
import { proUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { useProUploadInst } from './inst'
import { convertValueToFile } from './utils/file'
import ProFieldUpload from './fields/field-upload'

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
