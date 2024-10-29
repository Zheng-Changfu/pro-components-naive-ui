import type { DropdownOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { ToolbarDensitySetting } from '../../types'
import { ColumnHeightOutlined } from '@vicons/antd'
import { NDropdown, NEl, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { defineComponent, watchEffect } from 'vue'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectProDataTableInst } from '../../context'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'

export default defineComponent({
  name: 'Size',
  setup() {
    const themeVars = useThemeVars()

    const {
      getTableSize,
      setTableSize,
    } = useInjectProDataTableInst()!

    const {
      getMessage,
    } = useLocale('ProDataTable')

    const {
      mergedDensity: _mergedDensity,
    } = useMergeToolbarSetting()

    const mergedDensity = computed(() => {
      return _mergedDensity.value as ToolbarDensitySetting
    })

    watchEffect(() => {
      const defaultSize = mergedDensity.value.default
      if (defaultSize) {
        setTableSize(defaultSize)
      }
    })

    return {
      themeVars,
      getMessage,
      getTableSize,
      setTableSize,
      mergedDensity,
      selectedColor: computed(() => themeVars.value.primaryColor),
    }
  },
  render() {
    const { renderIcon } = this.mergedDensity

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
            key: 'large',
            label: this.getMessage('settingDensLarge'),
          },
          {
            key: 'medium',
            label: this.getMessage('settingDensMedium'),
          },
          {
            key: 'small',
            label: this.getMessage('settingDensSmall'),
          },
        ]}
        renderLabel={renderLabel}
        onSelect={this.setTableSize}
      >
        <NFlex>
          <ProButton text={true} tooltip={this.getMessage('settingDens')}>
            {
              renderIcon
                ? renderIcon()
                : (
                    <NIcon size={18}>
                      <ColumnHeightOutlined />
                    </NIcon>
                  )
            }
          </ProButton>
        </NFlex>
      </NDropdown>
    )
  },
})
