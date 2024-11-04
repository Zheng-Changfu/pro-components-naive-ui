import type { SlotsType } from 'vue'
import type { ProPasswordSlots } from '../slots'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import { inputProps, NButton, NFlex, NIcon, NInput } from 'naive-ui'
import { ref } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useProPasswordInst } from '../inst'

export default defineComponent({
  name: 'Password',
  props: inputProps,
  slots: Object as SlotsType<ProPasswordSlots>,
  inheritAttrs: false,
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
    }
  },
  render() {
    if (this.readonly) {
      const { value, empty, emptyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex align="center" wrap={false}>
          {this.open ? value : '********'}
          <NButton type="primary" text={true} onClick={() => this.setOpen(!this.open)}>
            <NIcon size={16}>
              {this.open ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </NIcon>
          </NButton>
        </NFlex>
      )
    }
    return (
      <NInput
        ref="instRef"
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
