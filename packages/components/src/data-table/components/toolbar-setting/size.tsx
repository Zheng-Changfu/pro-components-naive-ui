import type { DropdownOption } from 'naive-ui'
import type { MergedToolbarDensity } from './composables/userMergeToolbarSetting'
import { ColumnHeightOutlined } from '@vicons/antd'
import { watchImmediate } from '@vueuse/core'
import { NDropdown, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { defineComponent } from 'vue'
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
      return _mergedDensity.value as Exclude<MergedToolbarDensity, boolean>
    })

    watchImmediate(
      () => mergedDensity.value.default,
      (value) => {
        if (value) {
          setTableSize(value)
        }
      },
    )

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
        return <div style={{ color: this.selectedColor }}>{option.label}</div>
      }
      return option.label
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
        onSelect={this.setTableSize}
        renderLabel={renderLabel as any}
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
