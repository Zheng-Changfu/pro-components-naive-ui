import type { PropType, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ActionGuard } from '../props'
import type { ProFormListSlots } from '../slots'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import { omit } from 'lodash-es'
import { NFlex, NIcon, useThemeVars } from 'naive-ui'
import { ROW_UUID, useInjectListField } from 'pro-composables'
import { computed, defineComponent, Fragment, inject, provide, ref, toRef } from 'vue'
import { useInjectProForm } from '../../../components'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { ProButton } from '../../button'
import { useReadonlyHelpers } from '../../form/components'
import { useInjectProFormConfig } from '../../form/context'
import { useLocale } from '../../locales'
import { proFormListContextKey, useInjectProFormListInst } from '../context'
import { useProvidePath } from './composables/useProvidePath'

const Action = defineComponent({
  name: 'Action',
  props: {
    min: Number,
    max: Number,
    index: {
      type: Number,
      required: true,
    },
    copyButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
    removeButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
    path: Array as PropType<Array<string>>,
    actionGuard: Object as PropType<Partial<ActionGuard>>,
  },
  setup(props) {
    const form = useInjectProForm()

    const {
      getMessage,
    } = useLocale('ProFormList')

    const {
      readonly,
    } = useReadonlyHelpers()

    const copyLoading = ref(false)
    const removeLoading = ref(false)

    const {
      insert,
      remove: _remove,
      value: list,
    } = useInjectListField()!

    const showCopyButton = computed(() => {
      const { max, copyButtonProps } = props
      return !readonly.value
        && copyButtonProps !== false
        && list.value.length < (max ?? Number.POSITIVE_INFINITY)
    })

    const showRemoveButton = computed(() => {
      const { min, removeButtonProps } = props
      return !readonly.value
        && removeButtonProps !== false
        && list.value.length > (min ?? Number.NEGATIVE_INFINITY)
    })

    const getCopyButtonProps = computed<ProButtonProps>(() => {
      return {
        text: true,
        loading: copyLoading.value,
        tooltip: getMessage('copyThisLine'),
        renderIcon: () => {
          return (
            <NIcon>
              <CopyOutlined />
            </NIcon>
          )
        },
        ...(props.copyButtonProps ?? {}),
      }
    })

    const getRemoveButtonProps = computed<ProButtonProps>(() => {
      return {
        text: true,
        loading: removeLoading.value,
        tooltip: getMessage('removeThisLine'),
        renderIcon: () => {
          return (
            <NIcon>
              <DeleteOutlined />
            </NIcon>
          )
        },
        ...(props.removeButtonProps ?? {}),
      }
    })

    async function copy() {
      if (!form)
        return
      const { path, index, actionGuard } = props
      const { beforeAddRow, afterAddRow } = actionGuard ?? {}

      const insertIndex = index + 1
      const row = form.getFieldValue(path!) ?? {}

      if (beforeAddRow) {
        copyLoading.value = true
        const success = await beforeAddRow({ index, insertIndex, total: list.value.length })
        if (success) {
          insert(insertIndex, omit(row, ROW_UUID))
          if (afterAddRow) {
            afterAddRow({ index, insertIndex, total: list.value.length })
          }
        }
        copyLoading.value = false
      }
      else {
        insert(insertIndex, omit(row, ROW_UUID))
        if (afterAddRow) {
          afterAddRow({ index, insertIndex, total: list.value.length })
        }
      }
    }

    async function remove() {
      const { index, actionGuard } = props
      const { beforeRemoveRow, afterRemoveRow } = actionGuard ?? {}

      if (beforeRemoveRow) {
        removeLoading.value = true
        const success = await beforeRemoveRow({ index, total: list.value.length })
        if (success) {
          _remove(index)
          if (afterRemoveRow) {
            afterRemoveRow({ index, total: list.value.length })
          }
        }
        removeLoading.value = false
      }
      else {
        _remove(index)
        if (afterRemoveRow) {
          afterRemoveRow({ index, total: list.value.length })
        }
      }
    }
    return {
      copy,
      remove,
      showCopyButton,
      showRemoveButton,
      copyButtonProps: getCopyButtonProps,
      removeButtonProps: getRemoveButtonProps,
    }
  },
  render() {
    const copyButtonDom = this.showCopyButton
      ? (
          <ProButton
            {...this.copyButtonProps}
            onClick={this.copy}
          />
        )
      : null

    const removeButtonDom = this.showRemoveButton
      ? (
          <ProButton
            {...this.removeButtonProps}
            onClick={this.remove}
          />
        )
      : null

    return (
      <Fragment>
        {copyButtonDom}
        {removeButtonDom}
      </Fragment>
    )
  },
})

export default defineComponent({
  name: 'FormListItem',
  props: {
    min: Number,
    max: Number,
    actionGuard: Object as PropType<Partial<ActionGuard>>,
    index: {
      type: Number,
      required: true,
    },
    onlyShowFirstItemLabel: {
      type: Boolean,
      default: undefined,
    },
    copyButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
    removeButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
  },
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props) {
    const themeVars = useThemeVars()
    const action = useInjectProFormListInst()
    const nFormItem = inject<any>('n-form-item')

    const {
      path,
    } = useProvidePath(toRef(props, 'index'))

    const {
      validateBehavior,
    } = useInjectProFormConfig()

    const {
      value: list,
    } = useInjectListField()!

    const total = computed(() => {
      return list.value.length
    })

    const showItemLabel = computed(() => {
      const { index, onlyShowFirstItemLabel } = props
      return onlyShowFirstItemLabel && index === 0
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

    provide(proFormListContextKey, {
      showLabel: showItemLabel,
    })

    return {
      path,
      total,
      action,
      actionHeight,
      validateBehavior,
    }
  },
  render() {
    const {
      min,
      max,
      path,
      total,
      $props,
      $slots,
      action,
      actionHeight,
      validateBehavior,
    } = this

    const {
      index,
      actionGuard,
      copyButtonProps,
      removeButtonProps,
    } = $props

    const actionDom = (
      <Action
        min={min}
        max={max}
        path={path}
        index={index}
        actionGuard={actionGuard}
        copyButtonProps={copyButtonProps}
        removeButtonProps={removeButtonProps}
      />
    )

    const resolvedActionDom = resolveSlotWithProps($slots.action, {
      total,
      index,
      action,
      actionDom,
    }, () => (
      <NFlex
        style={{
          height: actionHeight,
          linHeight: actionHeight,
          marginBlockEnd: ($slots as any).item || validateBehavior === 'popover'
            ? 0
            : 'var(--n-feedback-height)',
        }}
      >
        {actionDom}
      </NFlex>
    ))

    const itemDom = (
      <Fragment>
        {$slots.default?.({
          total,
          index,
          action,
        })}
      </Fragment>
    )

    return resolveSlotWithProps($slots.item, {
      total,
      index,
      action,
      itemDom,
      actionDom: resolvedActionDom,
    }, () => (
      <div
        style={{
          display: 'flex',
          gap: '0 16px',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}
      >
        {itemDom}
        {resolvedActionDom}
      </div>
    ))
  },
})
