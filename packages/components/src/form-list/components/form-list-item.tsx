import type { PropType, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProFormListSlots } from '../slots'
import { CopyOutlined, DeleteOutlined } from '@vicons/antd'
import { get } from 'lodash-es'
import { NFlex, NIcon, useThemeVars } from 'naive-ui'
import { ROW_UUID, useInjectListField } from 'pro-composables'
import { computed, defineComponent, Fragment, inject, provide, ref, toRef } from 'vue'
import { useInjectProForm } from '../../../components'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { resolveSlotWithProps } from '../../_utils/resolveSlot'
import { simplyOmit } from '../../_utils/simplyOmit'
import { ProButton } from '../../button'
import { useFieldUtils } from '../../form/components'
import { proFieldConfigInjectionKey } from '../../form/components/field/context'
import { useLocale } from '../../locales'
import { useInjectProFormListInst } from '../context'
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
    const {
      getMessage,
    } = useLocale('ProFormList')

    const {
      readonly,
    } = useFieldUtils()

    const copyLoading = ref(false)
    const removeLoading = ref(false)
    const form = useInjectProForm()

    const {
      insert,
      remove: _remove,
      stringPath,
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
          insert(insertIndex, simplyOmit(row, [ROW_UUID]))
          if (afterAddRow) {
            afterAddRow({ index, insertIndex, total: list.value.length })
          }
        }
        copyLoading.value = false
      }
      else {
        insert(insertIndex, simplyOmit(row, [ROW_UUID]))
        if (afterAddRow) {
          afterAddRow({ index, insertIndex, total: list.value.length })
        }
      }
      form.validate(stringPath.value)
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
      form && form.validate(stringPath.value)
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
    extraProFieldConfig: Object,
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
    const form = useInjectProForm()
    const themeVars = useThemeVars()
    const action = useInjectProFormListInst()!
    const mergedClsPrefix = useNaiveClsPrefix()
    const nFormItem = inject<any>('n-form-item')

    const {
      readonly,
    } = useFieldUtils()

    const {
      path,
      rowPath,
    } = useProvidePath(toRef(props, 'index'))

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

    const row = computed(() => {
      if (!form) {
        return {}
      }
      return get(form.values.value, path.value, {})
    })

    provide(proFieldConfigInjectionKey, {
      readonly,
      showLabel: showItemLabel,
      validateBehavior: computed(() => props.extraProFieldConfig?.validateBehavior),
      validateBehaviorProps: computed(() => props.extraProFieldConfig?.validateBehaviorProps),
    })

    return {
      row,
      path,
      total,
      action,
      rowPath,
      actionHeight,
      showItemLabel,
      mergedClsPrefix,
    }
  },
  render() {
    const {
      min,
      max,
      row,
      path,
      total,
      $props,
      $slots,
      action,
      rowPath,
      actionHeight,
      showItemLabel,
      mergedClsPrefix,
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
      row,
      total,
      index,
      action,
      rowPath,
      actionDom,
    }, () => (
      <NFlex
        style={{
          height: actionHeight,
          linHeight: actionHeight,
          marginBlockStart: showItemLabel
            ? 'var(--n-feedback-height)'
            : 0,
        }}
      >
        {actionDom}
      </NFlex>
    ))

    const itemDom = (
      <Fragment>
        {$slots.default?.({
          row,
          total,
          index,
          action,
          rowPath,
        })}
      </Fragment>
    )

    return resolveSlotWithProps($slots.item, {
      row,
      total,
      index,
      action,
      itemDom,
      rowPath,
      actionDom: resolvedActionDom,
    }, () => (
      <div class={[`${mergedClsPrefix}-pro-form-list__item`]}>
        {itemDom}
        {resolvedActionDom}
      </div>
    ))
  },
})
