import { NButton, NFlex, NIcon, NInput, inputProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { ref } from 'vue'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import type { ProPasswordSlots } from '../slots'
import { useProPasswordInst } from '../inst'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldPassword',
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
