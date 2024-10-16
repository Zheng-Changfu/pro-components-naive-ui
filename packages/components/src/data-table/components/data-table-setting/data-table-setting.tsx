import { defineComponent } from 'vue'
import ColumnSetting from './column-setting'
import RefreshIcon from './refresh'
import SizeIcon from './size'

export default defineComponent({
  name: 'DataTableSetting',
  setup() {

  },
  render() {
    return [
      <RefreshIcon />,
      <SizeIcon />,
      <ColumnSetting />,
    ]
  },
})
