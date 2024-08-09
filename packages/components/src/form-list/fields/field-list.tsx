import type { PropType, SlotsType } from 'vue'
import { Fragment, computed, defineComponent, nextTick, onBeforeUpdate } from 'vue'
import type { ArrayField } from 'pro-components-hooks'
import { useInjectFieldContext } from 'pro-components-hooks'
import { NIcon } from 'naive-ui'
import { PlusOutlined } from '@vicons/antd'
import { ProButton, type ProButtonProps } from '../../button'
import type { ActionGuard } from '../props'
import type { ProFormListSlots } from '../slots'
import type { ProFormListInst } from '../inst'
import { AUTO_CREATE_ID, provideProFormListInst, useInjectProFormListInst } from '../context'
import { useInjectProFormInst } from '../../form/context'
import { useReadonlyHelpers } from '../../form/components'
import FieldItem from './field-item'

const CreatorButton = defineComponent({
  name: 'ProFieldListCreatorButton',
  props: {
    max: Number,
    readonly: {
      type: Boolean,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    creatorButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
    position: String as PropType<'top' | 'bottom'>,
    actionGuard: Object as PropType<Partial<ActionGuard>>,
    creatorInitialValue: Function as PropType<() => Record<string, any>>,
  },
  setup(props) {
    const action = useInjectProFormListInst()

    const showButton = computed(() => {
      const {
        max,
        total,
        readonly,
        creatorButtonProps,
      } = props

      return !(
        readonly
        || creatorButtonProps === false
        || (max !== undefined && total >= max)
      )
    })

    const buttonProps = computed<ProButtonProps>(() => {
      const { creatorButtonProps } = props
      return {
        block: true,
        dashed: true,
        content: '添加一行数据',
        renderIcon: () => {
          return (
            <NIcon>
              <PlusOutlined />
            </NIcon>
          )
        },
        ...(creatorButtonProps ?? {}),
      }
    })

    async function add() {
      const {
        total,
        position,
        actionGuard,
        creatorInitialValue,
      } = props

      const insertIndex = position === 'top' ? 0 : total

      if (actionGuard?.beforeAddRow) {
        const success = await actionGuard.beforeAddRow({
          total,
          index: -1,
          insertIndex,
        })
        success && action.insert(insertIndex, creatorInitialValue?.() ?? {})
      }
      else {
        action.insert(insertIndex, creatorInitialValue?.() ?? {})
      }
    }

    return {
      add,
      showButton,
      buttonProps,
    }
  },
  render() {
    const {
      add,
      $props,
      showButton,
      buttonProps,
    } = this

    if (!showButton) {
      return null
    }
    return (
      <ProButton
        {...buttonProps}
        style={{
          marginBlockEnd: $props.position === 'top' ? '24px' : 0,
        }}
        onClick={add}
      />
    )
  },
})

export default defineComponent({
  name: 'ProFieldList',
  props: {
    min: Number,
    max: Number,
    position: String as PropType<'top' | 'bottom'>,
    value: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
    },
    actionGuard: Object as PropType<Partial<ActionGuard>>,
    creatorInitialValue: Function as PropType<() => Record<string, any>>,
    onlyShowFirstItemLabel: {
      type: Boolean,
      default: undefined,
    },
    creatorButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
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
  setup(props, { expose }) {
    const form = useInjectProFormInst()

    const {
      readonly,
    } = useReadonlyHelpers()

    const {
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
      onActionChange,
      stringPath,
    } = useInjectFieldContext()! as ArrayField

    const total = computed(() => {
      return props.value.length
    })

    onActionChange((action) => {
      /**
       * 发生增删操作，验证列表
       */
      if ([
        'pop',
        'push',
        'shift',
        'insert',
        'remove',
        'unshift',
      ].includes(action)) {
        nextTick(() => {
          form.validate(stringPath.value)
        })
      }
    })

    const exposed: ProFormListInst = {
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
    }

    expose(exposed)
    provideProFormListInst(exposed)
    return {
      total,
      readonly,
    }
  },
  render() {
    const {
      total,
      $props,
      $slots,
      readonly,
      value: list,
    } = this

    const {
      min,
      max,
      actionGuard,
      copyButtonProps,
      removeButtonProps,
      position = 'bottom',
      creatorButtonProps,
      creatorInitialValue,
      onlyShowFirstItemLabel,
    } = $props

    const listVNode = list.map((item, index) => {
      return (
        <FieldItem
          key={item[AUTO_CREATE_ID]}
          min={min}
          max={max}
          index={index}
          actionGuard={actionGuard}
          copyButtonProps={copyButtonProps}
          removeButtonProps={removeButtonProps}
          onlyShowFirstItemLabel={onlyShowFirstItemLabel}
          v-slots={$slots}
        />
      )
    })

    const creatorButtonVNode = (
      <CreatorButton
        max={max}
        total={total}
        readonly={readonly}
        position={position}
        actionGuard={actionGuard}
        creatorButtonProps={creatorButtonProps}
        creatorInitialValue={creatorInitialValue}
      />
    )

    if ($slots.container) {
      return $slots.container({
        listVNode,
        creatorButtonVNode,
      })
    }

    return (
      <Fragment>
        {position === 'top' && creatorButtonVNode}
        {listVNode}
        {position === 'bottom' && creatorButtonVNode}
      </Fragment>
    )
  },
})
