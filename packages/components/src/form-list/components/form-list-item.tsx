import type { PropType, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProFormListSlots } from '../slots'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import { omit } from 'lodash-es'
import { NFlex, NIcon, useThemeVars } from 'naive-ui'
import { ROW_UUID, useInjectListField } from 'pro-composables'
import { computed, defineComponent, Fragment, inject, provide, ref, toRef } from 'vue'
import { useInjectProForm } from '../../../components'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { ProButton } from '../../button'
import { useReadonlyHelpers } from '../../form/components'
import { useInjectProFormConfig } from '../../form/context'
import { useLocale } from '../../locales'
import { proFormListConfigInjectionKey, useInjectProFormListInst } from '../context'
import { internalFormListProps } from '../props'
import { useProvidePath } from './composables/useProvidePath'

const Action = defineComponent({
  name: 'Action',
  props: {
    min: internalFormListProps.min,
    max: internalFormListProps.max,
    actionGuard: internalFormListProps.actionGuard,
    copyButtonProps: internalFormListProps.copyButtonProps,
    removeButtonProps: internalFormListProps.removeButtonProps,
    path: Array as PropType<Array<string>>,
    index: {
      type: Number,
      required: true,
    },
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
        onClick: copy,
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
        onClick: remove,
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
      ? <ProButton {...this.copyButtonProps} />
      : null

    const removeButtonDom = this.showRemoveButton
      ? <ProButton {...this.removeButtonProps} />
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
    min: internalFormListProps.min,
    max: internalFormListProps.max,
    actionGuard: internalFormListProps.actionGuard,
    copyButtonProps: internalFormListProps.copyButtonProps,
    removeButtonProps: internalFormListProps.removeButtonProps,
    onlyShowFirstItemLabel: internalFormListProps.onlyShowFirstItemLabel,
    index: {
      type: Number,
      required: true,
    },
  },
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props) {
    const themeVars = useThemeVars()
    const action = useInjectProFormListInst()
    const mergedClsPrefix = useNaiveClsPrefix()
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

    provide(proFormListConfigInjectionKey, {
      showLabel: showItemLabel,
    })

    return {
      path,
      total,
      action,
      actionHeight,
      mergedClsPrefix,
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
      mergedClsPrefix,
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
      <div class={[`${mergedClsPrefix}-pro-form-list__item`]}>
        {itemDom}
        {resolvedActionDom}
      </div>
    ))
  },
})
