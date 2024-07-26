import type { VNodeChild } from 'vue'
import { computed, defineComponent, ref } from 'vue'
import { NButton, NFlex, NIcon } from 'naive-ui'
import { EyeInvisibleOutlined, EyeOutlined } from '@vicons/antd'
import { isArray } from 'lodash-es'
import type { ProFieldConfig } from '../../form'
import { isEmptyValue } from '../../form/form-item/utils/valueUtil'

const ProPassword = defineComponent({
  props: ['value'],
  setup(props) {
    const opened = ref(false)

    function setOpened(v: boolean) {
      opened.value = v
    }

    const text = computed(() => {
      return opened.value ? props.value : '*'.repeat(8)
    })

    return {
      text,
      opened,
      setOpened,
    }
  },
  render() {
    const {
      text,
      opened,
      setOpened,
    } = this

    return (
      <NFlex align="center" wrap={false}>
        {text}
        <NButton text type="primary" onClick={() => setOpened(!opened)}>
          <NIcon size={16}>
            {opened ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </NIcon>
        </NButton>
      </NFlex>
    )
  },
})

export const builtInReadonlyRenderers: Record<
ProFieldConfig['name'],
(opt: { value: any, fullProps: Record<string, any> }) => VNodeChild
> = {
  ProSwitch: ({ value }) => {
    return value ? '打开' : '关闭'
  },
  ProTreeSelect: ({ value }) => {
    return isArray(value) ? value.join() : value
  },
  ProSelect: ({ value, fullProps }) => {
    console.log(fullProps)
    return isArray(value) ? value.join() : value
  },
  ProTransfer: ({ value }) => {
    return value.join()
  },
  ProCheckbox: ({ value }) => {
    return value ? '选中' : '未选中'
  },
  ProCheckboxGroup: ({ value }) => {
    return value.join()
  },
  ProPassword: ({ value }) => {
    return <ProPassword value={value} />
  },
}
