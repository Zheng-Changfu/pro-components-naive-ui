import type { DataTableColumn } from 'naive-ui'
import type { SortableEvent } from 'vue-draggable-plus'
import { DragOutlined, SettingOutlined } from '@vicons/antd'
import { cloneDeep } from 'lodash-es'
import { NButton, NCheckbox, NCheckboxGroup, NFlex, NIcon, NPopover } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { defineComponent, ref, watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { ProButton } from '../../../button'
import { useInjectProDataTableInst } from '../../context'
import { useCheckedColumns } from './composables/useCheckedColumns'

export default defineComponent({
  name: 'ColumnSetting',
  setup() {
    const draggableEl = ref<HTMLDivElement>()
    const columns = ref<DataTableColumn[]>([])
    const uidClass = `draggable-handle-${uid()}`

    const {
      getColumns,
      moveColumn: moveTableColumn,
    } = useInjectProDataTableInst()!

    const {
      checkedColumnKeys,
      checkedAllColumnKeys,
      visibleColumnsChecked,
      visibleColumnsIndeterminate,
    } = useCheckedColumns()

    watchEffect(() => {
      const tableColumns = getColumns().slice()
      columns.value = cloneDeep(tableColumns)
      checkedAllColumnKeys()
    })

    function resetColumns() {
      checkedAllColumnKeys()
    }

    function dragEnd(event: SortableEvent) {
      moveTableColumn(event.oldIndex!, event.newIndex!)
    }

    return {
      dragEnd,
      columns,
      uidClass,
      draggableEl,
      resetColumns,
      checkedColumnKeys,
      visibleColumnsChecked,
      visibleColumnsIndeterminate,
    }
  },
  render() {
    return (
      <NPopover trigger="click" placement="bottom-start">
        {{
          trigger: () => (
            <NFlex>
              <ProButton text={true} tooltip="列设置">
                <NIcon size={18}>
                  <SettingOutlined />
                </NIcon>
              </ProButton>
            </NFlex>
          ),
          default: () => (
            <NCheckboxGroup v-model:value={this.checkedColumnKeys}>
              {/* @ts-ignore */}
              <VueDraggable
                ref="draggableEl"
                v-model={this.columns}
                animation={200}
                handle={`.${this.uidClass}`}
                onEnd={this.dragEnd}
              >
                {
                  this.columns.map((column: any) => {
                    if (typeof column.title !== 'string' || typeof column.key !== 'string') {
                      return null
                    }
                    return (
                      <NFlex
                        key={column.key}
                        justify="space-between"
                        style={{ padding: '4px 0 8px 0' }}
                      >
                        <NFlex align="center">
                          <NButton text={true} class={this.uidClass} style={{ cursor: 'move' }}>
                            <NIcon size={18}>
                              <DragOutlined />
                            </NIcon>
                          </NButton>
                          <NCheckbox label={column.title} value={column.key} />
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
                v-model:checked={this.visibleColumnsChecked}
                indeterminate={this.visibleColumnsIndeterminate}
              >
                列展示
              </NCheckbox>
              <NButton type="primary" text={true} onClick={this.resetColumns}>重置</NButton>
            </NFlex>
          ),
        }}
      </NPopover>
    )
  },
})
