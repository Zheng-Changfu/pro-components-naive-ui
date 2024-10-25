import type { VNodeChild } from 'vue'
import { ReloadOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectProDataTableInst } from '../../context'

export default defineComponent({
  name: 'Refresh',
  props: {
    renderIcon: Function as PropType<() => VNodeChild>,
  },
  setup({ renderIcon }) {
    const { reload } = useInjectProDataTableInst()!
    const { getMessage } = useLocale('ProDataTable')

    const renderFreshIcon = computed(() => {
      return isFunction(renderIcon) ? renderIcon() : <ReloadOutlined />
    })

    return {
      reload,
      getMessage,
      renderFreshIcon,
    }
  },
  render() {
    return (
      <ProButton
        text={true}
        onClick={this.reload}
        tooltip={this.getMessage('settingReload')}
      >
        <NIcon size={18}>
          {this.renderFreshIcon}
        </NIcon>
      </ProButton>
    )
  },
})
