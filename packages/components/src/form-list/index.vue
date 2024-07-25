<script lang="tsx">
import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent, nextTick } from 'vue'
import type { ArrayFieldAction } from 'pro-components-hooks'
import { uid } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { PlusOutlined } from '@vicons/antd'
import { useArrayField } from '../form/field'
import { ProFormItem } from '../form/form-item'
import { resolveArrayField } from '../form/field/resolveArrayField'
import { ProButton, type ProButtonProps } from '../button'
import { useInjectProFormInstance } from '../form/context'
import { proFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import type { ProFormListInstance } from './inst'
import { AUTO_CREATE_ID, provideProFormListInstance } from './context'
import { useParseFormListProps } from './useParseFormListProps'
import { ProFormListItem } from './form-list-item'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    style.mount({
      id: 'pro-form-item',
      head: true,
      anchorMetaName: 'naive-ui-style',
    })

    const form = useInjectProFormInstance()

    const field = useArrayField('ProFormList', props, {
      defaultValue: [],
      postState: autoCreateRowId,
    })

    const total = computed(() => {
      return field.value.value.length
    })

    const {
      min,
      max,
      copyButtonProps,
      removeButtonProps,
      position: parsedPosition,
      creatorButtonProps: parsedCreatorButtonProps,
    } = useParseFormListProps(props, field.scope)

    const position = computed(() => parsedPosition.value ?? 'bottom')
    const creatorButtonProps = computed<ProButtonProps | false>(() => {
      const btnProps = parsedCreatorButtonProps.value
      if (btnProps === false) {
        return false
      }
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
        ...(parsedCreatorButtonProps.value || {}),
        onClick: add,
      }
    })

    function autoCreateRowId(val: any) {
      const { postState } = props
      if (!isArray(val)) {
        return postState ? postState(val) : []
      }
      const normalizedVals = val.map((item) => {
        return item[AUTO_CREATE_ID]
          ? item
          : { ...item, [AUTO_CREATE_ID]: uid() }
      })
      return postState
        ? postState(normalizedVals)
        : normalizedVals
    }

    function validateList(action: ArrayFieldAction) {
      if ([
        'pop',
        'push',
        'shift',
        'insert',
        'remove',
        'unshift',
      ].includes(action)) {
        nextTick(() => {
          form.validate(field.stringPath.value)
        })
      }
    }

    async function add() {
      const pos = position.value
      const total = field.value.value.length
      const insertIndex = pos === 'top' ? 0 : total
      const { actionGuard, creatorInitialValue } = props
      if (actionGuard?.beforeAddRow) {
        const success = await actionGuard.beforeAddRow({
          total,
          index: -1,
          insertIndex,
        })
        success && field.insert(insertIndex, creatorInitialValue?.() ?? {})
      }
      else {
        field.insert(insertIndex, creatorInitialValue?.() ?? {})
      }
    }

    field.onActionChange(validateList)

    const {
      pop,
      move,
      push,
      shift,
      insert,
      remove,
      moveUp,
      unshift,
      moveDown,
      value: list,
    } = field

    const exposed: ProFormListInstance = {
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
    provideProFormListInstance(exposed)
    return {
      min,
      max,
      list,
      total,
      position,
      action: exposed,
      copyButtonProps,
      removeButtonProps,
      creatorButtonProps,
    }
  },
  render() {
    const {
      max,
      list,
      total,
      $props,
      $slots,
      position,
      creatorButtonProps,
    } = this

    function renderCreatorButton() {
      if (creatorButtonProps === false) {
        return null
      }
      if (max !== undefined && total >= max) {
        return null
      }
      return (
        <ProButton
          {...creatorButtonProps}
          style={{
            marginBlockEnd: position === 'top' ? '24px' : 0,
          }}
        />
      )
    }

    return (
      <ProFormItem
        {...$props}
        fieldRender={undefined}
        class="n-pro-form-item"
        v-slots={{
          default: () => {
            const creatorButtonVNode = renderCreatorButton()
            const listVNode = list.map((item, index) => {
              return (
                <ProFormListItem
                  key={item[AUTO_CREATE_ID]}
                  index={index}
                  min={this.min}
                  max={this.max}
                  itemRender={$props.itemRender}
                  actionGuard={$props.actionGuard}
                  actionRender={$props.actionRender}
                  copyButtonProps={this.copyButtonProps}
                  removeButtonProps={this.removeButtonProps}
                  onlyShowFirstItemLabel={$props.onlyShowFirstItemLabel}
                  v-slots={$slots}
                />
              )
            })

            const fieldVNode = (
              <Fragment>
                {position === 'top' && creatorButtonVNode}
                {listVNode}
                {position === 'bottom' && creatorButtonVNode}
              </Fragment>
            )

            return resolveArrayField(
              $props.fieldRender,
              {
                listVNode,
                fieldVNode,
                creatorButtonVNode,
              },
              () => fieldVNode,
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
