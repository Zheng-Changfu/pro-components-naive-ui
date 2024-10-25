import type { PropType } from 'vue'
import type {
  ProDataTableSettingDensity,
  ProDataTableSettingReload,
  ProDataTableToolbarColumnSetting,
} from '../../types'
import { defineComponent } from 'vue'
import ColumnSetting from './column-setting'
import RefreshIcon from './refresh'
import SizeIcon from './size'

const dataTableSettingProps = {
  density: [Object, Boolean] as PropType<false | ProDataTableSettingDensity>,
  reload: [Object, Boolean] as PropType<false | ProDataTableSettingReload>,
  columnSetting: [Object, Boolean] as PropType<false | ProDataTableToolbarColumnSetting>,
}

export default defineComponent({
  name: 'DataTableSetting',
  props: dataTableSettingProps,
  render() {
    const { reload, density, columnSetting } = this.$props
    return [
      (reload === false
        ? null
        : <RefreshIcon {...reload} />
      ),
      (density === false
        ? null
        : <SizeIcon {...density} />
      ),
      (columnSetting === false
        ? null
        : <ColumnSetting {...columnSetting} />
      ),
    ]
  },
})
