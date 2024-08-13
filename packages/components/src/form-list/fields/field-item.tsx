import type { PropType, SlotsType } from 'vue'
import { Fragment, computed, defineComponent, inject, provide, toRef } from 'vue'
import { NEl, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { useInjectParentFieldContext } from 'pro-components-hooks'
import { omit } from 'lodash-es'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import type { ProFormListSlots } from '../slots'
import type { ActionGuard } from '../props'
import type { ProButtonProps } from '../../button'
import { ProButton } from '../../button'
import { proFormContextKey, useInjectProFormInst } from '../../form/context'
import { AUTO_CREATE_ID, proFormListContextKey, useInjectProFormListInst } from '../context'
import { useReadonlyHelpers } from '../../form/components'
import { useLocale } from '../../locales'
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
    total: {
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
    const form = useInjectProFormInst()
    const action = useInjectProFormListInst()
    const { getMessage } = useLocale('ProFormList')

    const showCopyButton = computed(() => {
      const {
        max,
        total,
        readonly,
        copyButtonProps,
      } = props

      return !(
        readonly
        || copyButtonProps === false
        || (max !== undefined && total >= max)
      )
    })

    const showRemoveButton = computed(() => {
      const {
        min,
        total,
        readonly,
        removeButtonProps,
      } = props

      return !(
        readonly
        || removeButtonProps === false
        || (min !== undefined && total <= min)
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
      const {
        path,
        index,
        total,
        actionGuard,
      } = props

      const insertIndex = index + 1
      const row = form.getFieldValue(path!) ?? {}

      if (actionGuard?.beforeAddRow) {
        const success = await actionGuard.beforeAddRow({
          index,
          total,
          insertIndex,
        })
        success && action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
      }
      else {
        action.insert(insertIndex, omit(row, AUTO_CREATE_ID))
      }
    }

    async function remove() {
      const {
        index,
        total,
        actionGuard,
      } = props

      if (actionGuard?.beforeRemoveRow) {
        const success = await actionGuard.beforeRemoveRow({
          index,
          total,
        })
        success && action.remove(index)
      }
      else {
        action.remove(index)
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
    const field = useInjectParentFieldContext()!
    const { validateBehavior } = inject(proFormContextKey)!
    const { path } = useProvidePath(toRef(props, 'index')) // 处理嵌套路径

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

    const resolvedActionVNode = $slots.action
      ? $slots.action({
        total,
        index,
        action,
        actionVNode,
      })
      : (
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

    return $slots.item
      ? $slots.item({
        total,
        index,
        action,
        itemVNode,
        actionVNode: resolvedActionVNode,
      })
      : (
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
        )
  },
})
