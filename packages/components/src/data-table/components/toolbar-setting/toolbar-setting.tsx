import { defineComponent } from 'vue'
import ColumnSettingIcon from './column-setting'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'
import RefreshIcon from './refresh'
import SizeIcon from './size'

export default defineComponent({
  name: 'DataTableSetting',
  setup() {
    const {
      showReload,
      showDensity,
      showColumnSetting,
    } = useMergeToolbarSetting()

    return {
      showReload,
      showDensity,
      showColumnSetting,
    }
  },
  render() {
    return [
      this.showReload && <RefreshIcon />,
      this.showDensity && <SizeIcon />,
      this.showColumnSetting && <ColumnSettingIcon />,
    ]
  },
})
