import { ReloadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'
import { useInjectProDataTableInst } from '../../context'

export default defineComponent({
  name: 'Refresh',
  setup() {
    const { reload } = useInjectProDataTableInst()!
    const { getMessage } = useLocale('ProDataTable')
    const { mergedReload } = useMergeToolbarSetting()

    return {
      reload,
      getMessage,
      mergedReload,
    }
  },
  render() {
    const { mergedReload } = this
    return (
      <ProButton
        text={true}
        onClick={this.reload}
        tooltip={this.getMessage('settingReload')}
      >
        {
          mergedReload !== false && mergedReload.renderIcon
            ? mergedReload.renderIcon()
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
