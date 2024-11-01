import type { PropType, SlotsType } from 'vue'
import type { ProFormListInst } from '../inst'
import type { ActionGuard } from '../props'
import type { ProFormListSlots } from '../slots'
import { PlusOutlined } from '@vicons/antd'
import { useToggle } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { computed, defineComponent, nextTick } from 'vue'
import { resolveSlotWithProps } from '../../_utils/resolve-slot'
import { ProButton, type ProButtonProps } from '../../button'
import { useReadonlyHelpers } from '../../form/components'
import { useInjectProFormInst } from '../../form/context'
import { useLocale } from '../../locales'
import { AUTO_CREATE_ID, provideProFormListInst } from '../context'
import FieldItem from './field-item'

const CreatorButton = defineComponent({
  name: 'ProFieldListCreatorButton',
  props: {
    max: Number,
    creatorButtonProps: {
      type: [Object, Boolean] as PropType<ProButtonProps | false>,
      default: undefined,
    },
    position: String as PropType<'top' | 'bottom'>,
    actionGuard: Object as PropType<Partial<ActionGuard>>,
    creatorInitialValue: Function as PropType<() => Record<string, any>>,
  },
  setup(props) {
    const {
      getMessage,
    } = useLocale('ProFormList')

    const {
      insert,
      value: list,
    } = useInjectListFieldContext()!

    const {
      readonly,
    } = useReadonlyHelpers()

    const [
      loading,
      seLoading,
    ] = useToggle()

    const showButton = computed(() => {
      const { max, creatorButtonProps } = props
      return !readonly.value
        && creatorButtonProps !== false
        && list.value.length < (max ?? Number.POSITIVE_INFINITY)
    })

    const proButtonProps = computed<ProButtonProps>(() => {
      const { creatorButtonProps } = props
      return {
        block: true,
        dashed: true,
        content: getMessage('add'),
        loading: loading.value,
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
      const { position, actionGuard, creatorInitialValue } = props
      const { beforeAddRow, afterAddRow } = actionGuard ?? {}
      const insertIndex = position === 'top' ? 0 : list.value.length

      if (beforeAddRow) {
        seLoading(true)
        const success = await beforeAddRow({ total: list.value.length, index: -1, insertIndex })
        if (success) {
          insert(insertIndex, creatorInitialValue?.() ?? {})
          if (afterAddRow) {
            afterAddRow({ total: list.value.length, index: -1, insertIndex })
          }
        }
        seLoading(false)
      }
      else {
        insert(insertIndex, creatorInitialValue?.() ?? {})
        if (afterAddRow) {
          afterAddRow({ total: list.value.length, index: -1, insertIndex })
        }
      }
    }

    return {
      add,
      showButton,
      proButtonProps,
    }
  },
  render() {
    return this.showButton
      ? (
          <ProButton
            {...this.proButtonProps}
            style={{
              marginBlockEnd: this.$props.position === 'top' ? '24px' : 0,
            }}
            onClick={this.add}
          />
        )
      : null
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
  setup(_, { expose }) {
    const form = useInjectProFormInst()!

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
    } = useInjectListFieldContext()!

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
  },
  render() {
    const {
      $props,
      $slots,
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

    const listDom = list.map((item, index) => {
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

    const creatorButtonDom = (
      <CreatorButton
        max={max}
        position={position}
        actionGuard={actionGuard}
        creatorButtonProps={creatorButtonProps}
        creatorInitialValue={creatorInitialValue}
      />
    )

    return resolveSlotWithProps($slots.container, {
      listDom,
      creatorButtonDom,
    }, () => [
      position === 'top' && creatorButtonDom,
      listDom,
      position === 'bottom' && creatorButtonDom,
    ])
  },
})
