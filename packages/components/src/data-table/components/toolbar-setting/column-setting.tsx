import type { MergedToolbarColumnSetting } from './composables/userMergeToolbarSetting'
import { DragOutlined, SettingOutlined } from '@vicons/antd'
import { NButton, NCheckbox, NCheckboxGroup, NFlex, NIcon, NPopover } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { defineComponent, ref, watchPostEffect } from 'vue'
import { useDraggable } from 'vue-draggable-plus'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useCheckedColumns } from './composables/useCheckedColumns'
import { useColumnList } from './composables/useColumnList'
import { useMergeToolbarSetting } from './composables/userMergeToolbarSetting'
import { useShowIndexColumn } from './composables/useShowIndexColumn'

export default defineComponent({
  name: 'ColumnSetting',
  setup() {
    const draggableEl = ref<HTMLDivElement>()
    const dragHandleId = `draggable-handle-${uid()}`

    const {
      mergedColumnSetting: _mergedColumnSetting,
    } = useMergeToolbarSetting()

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

    const { start, pause } = useDraggable(
      draggableEl,
      columnList,
      {
        immediate: false,
        animation: 200,
        handle: `.${dragHandleId}`,
        onEnd: sortTableColumnsByList,
      },
    )

    function resetColumns() {
      restoreColumnList()
      restoreCheckedKeys()
      restoreShowIndexColumn()
    }

    const mergedColumnSetting = computed(() => {
      return _mergedColumnSetting.value as Exclude<MergedToolbarColumnSetting, boolean>
    })

    const canDraggable = computed(() => {
      return mergedColumnSetting.value.draggable !== false
    })

    watchPostEffect(() => {
      if (
        canDraggable.value
        && draggableEl.value
        && columnList.value.length > 0
      ) {
        start()
      }
      else {
        pause()
      }
    })

    return {
      columnList,
      allChecked,
      getMessage,
      checkedKeys,
      draggableEl,
      dragHandleId,
      resetColumns,
      indeterminate,
      showIndexColumn,
      mergedColumnSetting,
    }
  },
  render() {
    const {
      draggable,
      checkable,
      renderIcon,
      resetButton,
      indexColummn,
    } = this.mergedColumnSetting

    return (
      <NPopover trigger="click" placement="bottom-start">
        {{
          trigger: () => (
            <NFlex>
              <ProButton text={true} tooltip={this.getMessage('settingColumn')}>
                {renderIcon
                  ? renderIcon()
                  : (
                      <NIcon size={18}>
                        <SettingOutlined />
                      </NIcon>
                    )}
              </ProButton>
            </NFlex>
          ),
          default: () => (
            <NCheckboxGroup v-model:value={this.checkedKeys}>
              <div ref="draggableEl">
                {
                  this.columnList.map((item) => {
                    return (
                      <NFlex
                        key={item.key}
                        justify="space-between"
                        style={{ padding: '4px 0 8px 0' }}
                      >
                        <NFlex align="center">
                          {
                            draggable && (
                              <NButton text={true} class={this.dragHandleId} style={{ cursor: 'move' }}>
                                <NIcon size={16}>
                                  <DragOutlined />
                                </NIcon>
                              </NButton>
                            )
                          }
                          {
                            checkable
                              ? <NCheckbox value={item.key}>{item.title}</NCheckbox>
                              : item.title
                          }
                        </NFlex>
                      </NFlex>
                    )
                  })
                }
              </div>
            </NCheckboxGroup>
          ),
          header: () => (
            <NFlex justify="space-between">
              {
                checkable
                  ? (
                      <NCheckbox
                        v-model:checked={this.allChecked}
                        indeterminate={this.indeterminate}
                      >
                        {this.getMessage('settingShowColumn')}
                      </NCheckbox>
                    )
                  : this.getMessage('settingShowColumn')
              }
              {indexColummn && <NCheckbox v-model:checked={this.showIndexColumn}>{this.getMessage('settingShowIndexColumn')}</NCheckbox>}
              {resetButton && <NButton type="primary" text={true} onClick={this.resetColumns}>{this.getMessage('settingReset')}</NButton>}
            </NFlex>
          ),
        }}
      </NPopover>
    )
  },
})
