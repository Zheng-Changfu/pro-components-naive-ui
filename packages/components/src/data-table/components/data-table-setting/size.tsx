import type { DropdownOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { ColumnHeightOutlined } from '@vicons/antd'
import { NDropdown, NEl, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { defineComponent } from 'vue'
import { ProButton } from '../../../button'
import { useInjectProDataTableInst } from '../../context'

export default defineComponent({
  name: 'Size',
  setup() {
    const themeVars = useThemeVars()

    const {
      getTableSize,
      setTableSize,
    } = useInjectProDataTableInst()!

    return {
      themeVars,
      getTableSize,
      setTableSize,
      selectedColor: computed(() => themeVars.value.primaryColor),
    }
  },
  render() {
    const renderLabel = (option: DropdownOption) => {
      if (option.key === this.getTableSize()) {
        return <NEl style={{ color: this.selectedColor }}>{option.label}</NEl>
      }
      return option.label as VNodeChild
    }

    return (
      <NDropdown
        trigger="click"
        placement="bottom-start"
        options={[
          {
            label: '宽松',
            key: 'large',
          },
          {
            label: '中等',
            key: 'medium',
          },
          {
            label: '紧凑',
            key: 'small',
          },
        ]}
        renderLabel={renderLabel}
        onSelect={this.setTableSize}
      >
        <NFlex>
          <ProButton text={true} tooltip="密度">
            <NIcon size={18}>
              <ColumnHeightOutlined />
            </NIcon>
          </ProButton>
        </NFlex>
      </NDropdown>
    )
  },
})
