<script lang="tsx">
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { FieldRenderParameters } from '../field'
import { ProField, ValueTypeEnum } from '../field'
import type { ProUploadFieldProps } from './props'
import { proUploadProps } from './props'
import type { ProUploadSlots } from './slots'
import { useProUploadInst } from './inst'
import { convertValueToFile } from './utils/file'
import FieldUpload from './fields/field-upload.vue'

export default defineComponent({
  name: 'ProUpload',
  props: proUploadProps,
  slots: Object as SlotsType<ProUploadSlots>,
  setup(_, { expose }) {
    const [instRef, methods] = useProUploadInst()

    expose(methods)
    return {
      instRef,
    }
  },
  render() {
    const {
      $slots,
      $props,
    } = this

    function postState(val: any) {
      return convertValueToFile(val, $props.postState)
    }

    return (
      <ProField
        {...$props}
        defaultValue={[]}
        postState={postState}
        valueModelName="fileList"
        valueType={ValueTypeEnum.UPLOAD}
        v-slots={{
          ...$slots,
          field: ({
            bindProps,
            bindSlots,
          }: FieldRenderParameters<ProUploadFieldProps, ProUploadSlots>) => {
            return (
              <FieldUpload
                ref="instRef"
                {...bindProps}
                v-slots={bindSlots}
              />
            )
          },
        }}
      />
    )
  },
})
</script>
