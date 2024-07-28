<script lang='tsx'>
import { NButton, NFlex, NIcon, NInput, inputProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent, ref } from 'vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import { useReadonlyHelpers } from '../field'
import type { ProPasswordSlots } from './slots'
import { useProPasswordInst } from './inst'

export default defineComponent({
  name: 'FieldPassword',
  props: inputProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  setup(_, { expose }) {
    const open = ref(false)

    const [
      instRef,
      methods,
    ] = useProPasswordInst()

    const {
      empty,
      value,
      readonly,
      emptyText,
      readonlyRender,
    } = useReadonlyHelpers()

    function setOpen(v: boolean) {
      open.value = v
    }

    expose(methods)
    return {
      open,
      empty,
      value,
      instRef,
      setOpen,
      readonly,
      emptyText,
      readonlyRender,
    }
  },
  render() {
    const {
      open,
      empty,
      value,
      $props,
      $slots,
      setOpen,
      readonly,
      emptyText,
      readonlyRender,
    } = this

    if (readonly) {
      if (readonlyRender) {
        return readonlyRender()
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex align="center" wrap={false}>
          {open ? value : '********'}
          <NButton text type="primary" onClick={() => setOpen(!open)}>
            <NIcon size={16}>
              {open ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </NIcon>
          </NButton>
        </NFlex>
      )
    }

    return (
      <NInput
        ref="instRef"
        {...$props}
        type="password"
        v-slots={$slots}
      />
    )
  },
})
</script>
