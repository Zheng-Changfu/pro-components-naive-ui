import { DragOutlined, SettingOutlined } from '@vicons/antd'
import { NButton, NCheckbox, NCheckboxGroup, NFlex, NIcon, NPopover } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useCheckedColumns } from './composables/useCheckedColumns'
import { useColumnList } from './composables/useColumnList'
import { useShowIndexColumn } from './composables/useShowIndexColumn'

export default defineComponent({
  name: 'ColumnSetting',
  setup() {
    const draggableEl = ref<HTMLDivElement>()
    const uidClass = `draggable-handle-${uid()}`

    const {
      getMessage,
    } = useLocale('ProDataTable')

    const {
      showIndexColumn,
      restore: restoreShowIndexColumn,
    } = useShowIndexColumn()

    const {
      list: columnList,
      sortTableColumnsByList,
      restoreList: restoreColumnList,
    } = useColumnList()

    const {
      allChecked,
      checkedKeys,
      indeterminate,
      restore: restoreCheckedKeys,
    } = useCheckedColumns(columnList)

    function resetColumns() {
      restoreColumnList()
      restoreCheckedKeys()
      restoreShowIndexColumn()
    }

    function dragEnd() {
      sortTableColumnsByList()
    }

    return {
      dragEnd,
      uidClass,
      columnList,
      allChecked,
      getMessage,
      checkedKeys,
      draggableEl,
      resetColumns,
      indeterminate,
      showIndexColumn,
    }
  },
  render() {
    return (
      <NPopover trigger="click" placement="bottom-start">
        {{
          trigger: () => (
            <NFlex>
              <ProButton text={true} tooltip={this.getMessage('settingColumn')}>
                <NIcon size={18}>
                  <SettingOutlined />
                </NIcon>
              </ProButton>
            </NFlex>
          ),
          default: () => (
            <NCheckboxGroup v-model:value={this.checkedKeys}>
              {/* @ts-ignore */}
              <VueDraggable
                ref="draggableEl"
                v-model={this.columnList}
                animation={200}
                handle={`.${this.uidClass}`}
                onEnd={this.dragEnd}
              >
                {
                  this.columnList.map((item) => {
                    return (
                      <NFlex
                        key={item.key}
                        justify="space-between"
                        style={{ padding: '4px 0 8px 0' }}
                      >
                        <NFlex align="center">
                          <NButton text={true} class={this.uidClass} style={{ cursor: 'move' }}>
                            <NIcon size={16}>
                              <DragOutlined />
                            </NIcon>
                          </NButton>
                          <NCheckbox value={item.key}>{item.title}</NCheckbox>
                        </NFlex>
                      </NFlex>
                    )
                  })
                }
              </VueDraggable>
            </NCheckboxGroup>
          ),
          header: () => (
            <NFlex justify="space-between">
              <NCheckbox
                v-model:checked={this.allChecked}
                indeterminate={this.indeterminate}
              >
                {this.getMessage('settingShowColumn')}
              </NCheckbox>
              <NCheckbox v-model:checked={this.showIndexColumn}>{this.getMessage('settingShowIndexColumn')}</NCheckbox>
              <NButton type="primary" text={true} onClick={this.resetColumns}>{this.getMessage('settingReset')}</NButton>
            </NFlex>
          ),
        }}
      </NPopover>
    )
  },
})
