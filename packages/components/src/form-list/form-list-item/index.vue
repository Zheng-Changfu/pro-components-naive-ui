<script lang='tsx'>
import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent, inject, toRef } from 'vue'
import { useInjectFormContext, useInjectParentFieldContext } from 'pro-components-hooks'
import { NFlex, NIcon, useThemeVars } from 'naive-ui'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import { omit } from 'lodash-es'
import type { ProButtonProps } from '../../button'
import { ProButton } from '../../button'
import { AUTO_CREATE_ID, useInjectProFormListInstanceContext } from '../context'
import { proFormListItemProps } from './props'
import { resolveAction, resolveItem } from './resolveRender'
import type { ProFormListItemSlots } from './slots'
import { useProvidePath } from './useProvidePath'

export default defineComponent({
  name: 'ProFormListItem',
  props: proFormListItemProps,
  slots: Object as SlotsType<ProFormListItemSlots>,
  setup(props) {
    const themeVars = useThemeVars()
    const form = useInjectFormContext()
    const nFormItem = inject<any>('n-form-item')
    const field = useInjectParentFieldContext()!
    const action = useInjectProFormListInstanceContext()
    const { path } = useProvidePath(toRef(props, 'index')) // 处理嵌套路径

    const total = computed(() => {
      return field.value.value.length
    })

    const actionHeight = computed<string>(() => {
      const {
        heightSmall,
        heightMedium,
        heightLarge,
      } = themeVars.value

      const sizeToHeightMap = {
        small: heightSmall,
        medium: heightMedium,
        large: heightLarge,
      } as any

      const size = nFormItem?.mergedSize?.value ?? 'medium'
      return sizeToHeightMap[size]
    })

    const copyButtonProps = computed<ProButtonProps | false>(() => {
      if (props.copyButtonProps === false) {
        return false
      }
      return {
        text: true,
        tooltip: '复制此项',
        renderIcon: () => {
          return (
            <NIcon>
              <CopyOutlined />
            </NIcon>
          )
        },
        ...(props.copyButtonProps ?? {}),
        onClick: copy,
      }
    })

    const removeButtonProps = computed<ProButtonProps | false>(() => {
      if (props.removeButtonProps === false) {
        return false
      }
      return {
        text: true,
        tooltip: '删除此项',
        renderIcon: () => {
          return (
            <NIcon>
              <DeleteOutlined />
            </NIcon>
          )
        },
        ...(props.removeButtonProps ?? {}),
        onClick: remove,
      }
    })

    async function copy() {
      const { index } = props
      const insertIndex = index + 1
      const row = form?.values.get(path.value) ?? {}

      if (props.actionGuard?.beforeAddRow) {
        const success = await props.actionGuard.beforeAddRow({
          index,
          insertIndex,
          total: total.value,
        })
        success && action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
      }
      else {
        action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
      }
    }

    async function remove() {
      const { index } = props
      if (props.actionGuard?.beforeRemoveRow) {
        const success = await props.actionGuard.beforeRemoveRow({
          index,
          total: total.value,
        })
        success && action.remove(index)
      }
      else {
        action.remove(index)
      }
    }

    return {
      total,
      action,
      actionHeight,
      copyButtonProps,
      removeButtonProps,
    }
  },
  render() {
    const {
      min,
      max,
      total,
      $props,
      $slots,
      action,
      actionHeight,
      copyButtonProps,
      removeButtonProps,
    } = this

    function renderCopyButton() {
      if (max !== undefined && total >= max) {
        return null
      }
      if (copyButtonProps === false) {
        return null
      }
      return <ProButton {...copyButtonProps} />
    }

    function renderRemoveButton() {
      if (min !== undefined && total <= min) {
        return null
      }
      if (removeButtonProps === false) {
        return null
      }
      return <ProButton {...removeButtonProps} />
    }

    const actionVNode = (
      <Fragment>
        {renderCopyButton()}
        {renderRemoveButton()}
      </Fragment>
    )

    const resolvedActionVNode = resolveAction(
      $props.actionRender,
      {
        total,
        action,
        actionVNode,
        index: $props.index,
      },
      () => (
        <NFlex style={{
          marginBlockEnd: 'var(--n-feedback-height)',
          height: actionHeight,
          linHeight: actionHeight,
        }}
        >
          {actionVNode}
        </NFlex>
      ),
    )

    const itemVNode = $slots.default?.({
      total,
      action,
      index: $props.index,
    })

    return resolveItem(
      $props.itemRender,
      {
        total,
        action,
        itemVNode,
        index: $props.index,
        actionVNode: resolvedActionVNode,
      },
      () => (
        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}
        >
          {itemVNode}
          {resolvedActionVNode}
        </div>
      ),
    )
  },
})
</script>
