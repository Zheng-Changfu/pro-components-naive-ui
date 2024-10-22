import { ReloadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectProDataTableInst } from '../../context'

export default defineComponent({
  name: 'Refresh',
  setup() {
    const { reload } = useInjectProDataTableInst()!
    const { getMessage } = useLocale('ProDataTable')

    return {
      reload,
      getMessage,
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
          <ReloadOutlined />
        </NIcon>
      </ProButton>
    )
  },
})
