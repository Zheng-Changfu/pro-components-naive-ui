import type { PropType, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ActionGuard } from '../props'
import type { ProFormListSlots } from '../slots'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import { omit } from 'lodash-es'
import { NEl, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { computed, defineComponent, Fragment, inject, provide, toRef } from 'vue'
import { resolveSlotWithProps } from '../../_utils/resolve-slot'
import { ProButton } from '../../button'
import { useReadonlyHelpers } from '../../form/components'
import { useInjectProFormContext, useInjectProFormInst } from '../../form/context'
import { useLocale } from '../../locales'
import { AUTO_CREATE_ID, proFormListContextKey, useInjectProFormListInst } from '../context'
import { useProvidePath } from './composables/useProvidePath'

const Action = defineComponent({
  name: 'ProFieldItemAction',
  props: {
    min: Number,
    max: Number,
    index: {
      type: Number,
      required: true,
    },
    readonly: {
      type: Boolean,
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
    path: Array as PropType<Array<string | number>>,
    actionGuard: Object as PropType<Partial<ActionGuard>>,
  },
  setup(props) {
    const form = useInjectProFormInst()!
    const action = useInjectProFormListInst()
    const { getMessage } = useLocale('ProFormList')

    const {
      value: list,
    } = useInjectListFieldContext()!

    const showCopyButton = computed(() => {
      const { max, readonly, copyButtonProps } = props

      return !(
        readonly
        || copyButtonProps === false
        || (max !== undefined && list.value.length >= max)
      )
    })

    const showRemoveButton = computed(() => {
      const { min, readonly, removeButtonProps } = props

      return !(
        readonly
        || removeButtonProps === false
        || (min !== undefined && list.value.length <= min)
      )
    })

    const getCopyButtonProps = computed<ProButtonProps>(() => {
      return {
        text: true,
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
      const { path, index, actionGuard } = props
      const { beforeAddRow, afterAddRow } = actionGuard ?? {}

      const insertIndex = index + 1
      const row = form.getFieldValue(path!) ?? {}

      if (beforeAddRow) {
        const success = await beforeAddRow({ index, insertIndex, total: list.value.length })
        if (success) {
          action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
          if (afterAddRow) {
            afterAddRow({ index, insertIndex, total: list.value.length })
          }
        }
      }
      else {
        action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
        if (afterAddRow) {
          afterAddRow({ index, insertIndex, total: list.value.length })
        }
      }
    }

    async function remove() {
      const { index, actionGuard } = props
      const { beforeRemoveRow, afterRemoveRow } = actionGuard ?? {}

      if (beforeRemoveRow) {
        const success = await beforeRemoveRow({ index, total: list.value.length })
        if (success) {
          action.remove(index)
          if (afterRemoveRow) {
            afterRemoveRow({ index, total: list.value.length })
          }
        }
      }
      else {
        action.remove(index)
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
    const {
      copy,
      remove,
      showCopyButton,
      copyButtonProps,
      showRemoveButton,
      removeButtonProps,
    } = this

    const copyButtonVNode = showCopyButton
      ? (
          <ProButton
            {...copyButtonProps}
            onClick={copy}
          />
        )
      : null

    const removeButtonVNode = showRemoveButton
      ? (
          <ProButton
            {...removeButtonProps}
            onClick={remove}
          />
        )
      : null

    return (
      <Fragment>
        {copyButtonVNode}
        {removeButtonVNode}
      </Fragment>
    )
  },
})

export default defineComponent({
  name: 'FieldItem',
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
    const { readonly } = useReadonlyHelpers()
    const nFormItem = inject<any>('n-form-item')
    const field = useInjectListFieldContext()!
    const { validateBehavior } = useInjectProFormContext()
    const { path } = useProvidePath(toRef(props, 'index'))

    const total = computed(() => {
      return field.value.value.length
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
      readonly,
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
      readonly,
      actionHeight,
      validateBehavior,
    } = this

    const {
      index,
      actionGuard,
      copyButtonProps,
      removeButtonProps,
    } = $props

    const actionVNode = (
      <Action
        min={min}
        max={max}
        path={path}
        index={index}
        total={total}
        readonly={readonly}
        actionGuard={actionGuard}
        copyButtonProps={copyButtonProps}
        removeButtonProps={removeButtonProps}
      />
    )

    const resolvedActionVNode = resolveSlotWithProps(
      $slots.action,
      {
        total,
        index,
        action,
        actionVNode,
      },
      () => (
        <NFlex
          style={{
            height: actionHeight,
            linHeight: actionHeight,
            marginBlockEnd: $slots.item || validateBehavior === 'popover'
              ? 0
              : 'var(--n-feedback-height)',
          }}
        >
          {actionVNode}
        </NFlex>
      ),
    )

    const itemVNode = (
      <Fragment>
        {$slots.default?.({
          total,
          index,
          action,
        })}
      </Fragment>
    )

    return resolveSlotWithProps(
      $slots.item,
      {
        total,
        index,
        action,
        itemVNode,
        actionVNode: resolvedActionVNode,
      },
      () => (
        <NEl
          style={{
            display: 'flex',
            gap: '0 16px',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          {itemVNode}
          {resolvedActionVNode}
        </NEl>
      ),
    )
  },
})
