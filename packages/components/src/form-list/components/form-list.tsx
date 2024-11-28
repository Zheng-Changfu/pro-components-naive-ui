import type { PropType, SlotsType } from 'vue'
import type { ProButtonProps } from '../../button'
import type { ProFormListInst } from '../inst'
import type { ActionGuard } from '../props'
import type { ProFormListSlots } from '../slots'
import { PlusOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { ROW_UUID, useInjectListField } from 'pro-composables'
import { computed, defineComponent, ref, watch } from 'vue'
import { useInjectProForm } from '../../../components'
import { resolveSlotWithProps } from '../../_utils/resolve-slot'
import { ProButton } from '../../button'
import { useReadonlyHelpers } from '../../form/components'
import { useLocale } from '../../locales'
import { provideProFormListInst } from '../context'
import { useInjectFormListInstStore } from '../inst'
import FormListItem from './form-list-item'

const CreatorButton = defineComponent({
  name: 'CreatorButton',
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
    } = useInjectListField()!

    const {
      readonly,
    } = useReadonlyHelpers()

    const addRowLoading = ref(false)

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
        loading: addRowLoading.value,
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
        addRowLoading.value = true
        const success = await beforeAddRow({ total: list.value.length, index: -1, insertIndex })
        if (success) {
          insert(insertIndex, creatorInitialValue?.() ?? {})
          if (afterAddRow) {
            afterAddRow({ total: list.value.length, index: -1, insertIndex })
          }
        }
        addRowLoading.value = false
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
  name: 'FormList',
  props: {
    min: Number,
    max: Number,
    position: String as PropType<'top' | 'bottom'>,
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
  setup() {
    const form = useInjectProForm()

    const {
      registerInst,
    } = useInjectFormListInstStore()!

    const {
      get,
      set,
      pop,
      push,
      move,
      shift,
      insert,
      moveUp,
      remove,
      unshift,
      moveDown,
      stringPath,
      value: list,
    } = useInjectListField()!

    /**
     * 长度发生变化，验证列表，如果没有传递规则，校验不会生效
     */
    watch(
      () => list.value.length,
      () => {
        form?.validate(stringPath.value)
      },
      { flush: 'post' },
    )

    const exposed: ProFormListInst = {
      get,
      set,
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

    registerInst(exposed)
    provideProFormListInst(exposed)
    return {
      list,
    }
  },
  render() {
    const {
      list,
      $props,
      $slots,
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
        <FormListItem
          key={item[ROW_UUID]}
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
