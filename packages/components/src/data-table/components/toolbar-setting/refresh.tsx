import type { ToolbarReloadSetting } from '../../types'
import { ReloadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectProDataTableInst } from '../../context'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'

export default defineComponent({
  name: 'Refresh',
  setup() {
    const { reload } = useInjectProDataTableInst()!
    const { getMessage } = useLocale('ProDataTable')
    const { mergedReload: _mergedReload } = useMergeToolbarSetting()

    const mergedReload = computed(() => {
      return _mergedReload.value as ToolbarReloadSetting
    })

    return {
      reload,
      getMessage,
      mergedReload,
    }
  },
  render() {
    const { renderIcon } = this.mergedReload
    return (
      <ProButton
        text={true}
        onClick={this.reload}
        tooltip={this.getMessage('settingReload')}
      >
        {
          renderIcon
            ? renderIcon()
            : (
                <NIcon size={18}>
                  <ReloadOutlined />
                </NIcon>
              )
        }
      </ProButton>
    )
  },
})
