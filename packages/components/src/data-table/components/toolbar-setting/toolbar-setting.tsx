import { defineComponent } from 'vue'
import ColumnSettingIcon from './column-setting'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'
import SizeIcon from './size'

export default defineComponent({
  name: 'ToolbarSetting',
  setup() {
    const {
      showDensity,
      showColumnSetting,
    } = useMergeToolbarSetting()

    return {
      showDensity,
      showColumnSetting,
    }
  },
  render() {
    return [
      this.showDensity && <SizeIcon />,
      this.showColumnSetting && <ColumnSettingIcon />,
    ]
  },
})
