import type { VNodeChild } from 'vue'
import { DragOutlined, SettingOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { NButton, NCheckbox, NCheckboxGroup, NFlex, NIcon, NPopover } from 'naive-ui'
import { uid } from 'pro-components-hooks'
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useCheckedColumns } from './composables/useCheckedColumns'
import { useColumnList } from './composables/useColumnList'
import { useShowIndexColumn } from './composables/useShowIndexColumn'

const columnSettingProps = {
  draggable: {
    type: Boolean,
    default: true,
  },
  checkable: {
    type: Boolean,
    default: true,
  },
  resetButton: {
    type: Boolean,
    default: true,
  },
  indexColummn: {
    type: Boolean,
    default: true,
  },
  renderIcon: {
    type: Function as PropType<() => VNodeChild>,
    default: undefined,
  },
}

export default defineComponent({
  name: 'ColumnSetting',
  props: columnSettingProps,
  setup(props) {
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

    const renderSettingIcon = computed(() => {
      return isFunction(props.renderIcon) ? props.renderIcon() : <SettingOutlined />
    })

    const columnListRender = computed(() => {
      return columnList.value.map((item) => {
        return (
          <NFlex
            key={item.key}
            justify="space-between"
            style={{ padding: '4px 0 8px 0' }}
          >
            <NFlex align="center">
              {props.draggable
                ? (
                    <NButton text={true} class={uidClass} style={{ cursor: 'move' }}>
                      <NIcon size={16}>
                        <DragOutlined />
                      </NIcon>
                    </NButton>
                  )
                : null}
              <NCheckbox value={item.key}>{item.title}</NCheckbox>
            </NFlex>
          </NFlex>
        )
      })
    })

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
      columnListRender,
      renderSettingIcon,
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
                  {this.renderSettingIcon}
                </NIcon>
              </ProButton>
            </NFlex>
          ),
          default: () =>
            this.$props.checkable
              ? (
                  <NCheckboxGroup v-model:value={this.checkedKeys}>
                    {this.$props.draggable
                      ? (
                          /* @ts-ignore */
                          <VueDraggable
                            ref="draggableEl"
                            v-model={this.columnList}
                            animation={200}
                            handle={`.${this.uidClass}`}
                            onEnd={this.dragEnd}
                          >
                            {this.columnListRender}
                          </VueDraggable>
                        )
                      : this.columnListRender}
                  </NCheckboxGroup>
                )
              : null,
          header: () => (
            <NFlex justify="space-between">
              {
                this.$props.checkable
                  ? (
                      <NCheckbox
                        v-model:checked={this.allChecked}
                        indeterminate={this.indeterminate}
                      >
                        {this.getMessage('settingShowColumn')}
                      </NCheckbox>
                    )
                  : null
              }
              {
                this.$props.indexColummn
                  ? (
                      <NCheckbox
                        v-model:checked={this.showIndexColumn}
                      >
                        {this.getMessage('settingShowIndexColumn')}
                      </NCheckbox>
                    )
                  : null
              }
              {
                this.$props.resetButton
                  ? (
                      <NButton
                        type="primary"
                        text={true}
                        onClick={this.resetColumns}
                      >
                        {this.getMessage('settingReset')}
                      </NButton>
                    )
                  : null
              }
            </NFlex>
          ),
        }}
      </NPopover>
    )
  },
})
