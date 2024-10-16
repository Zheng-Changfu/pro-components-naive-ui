import { ReloadOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useInjectProDataTableInst } from '../../context'

export default defineComponent({
  name: 'Refresh',
  setup() {
    const { reload } = useInjectProDataTableInst()!
    return {
      reload,
    }
  },
  render() {
    return (
      <ProButton text={true} tooltip="刷新" onClick={this.reload}>
        <NIcon size={18}>
          <ReloadOutlined />
        </NIcon>
      </ProButton>
    )
  },
})
