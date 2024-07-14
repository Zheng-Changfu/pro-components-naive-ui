<script lang="tsx">
import type { SlotsType } from 'vue'
import { Fragment, computed, defineComponent } from 'vue'
import { uid } from 'pro-components-hooks'
import { isArray } from 'lodash-es'
import { NIcon } from 'naive-ui'
import { PlusOutlined } from '@vicons/antd'
import { useArrayField } from '../form/field'
import { ProFormItem } from '../form/form-item'
import { resolveArrayField } from '../form/field/resolveArrayField'
import { ProButton, type ProButtonProps } from '../button'
import { proFormListProps } from './props'
import type { ProFormListSlots } from './slots'
import type { ProFormListInstance } from './inst'
import { AUTO_CREATE_ID, provideProFormListInstanceContext } from './context'
import { useCompileFormListProps } from './useCompileFormListProps'
import { ProFormListItem } from './form-list-item'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'ProFormList',
  props: proFormListProps,
  slots: Object as SlotsType<ProFormListSlots>,
  setup(props, { expose }) {
    style.mount({ id: 'form-item', head: true })
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
      attrs,
      copyButtonProps,
      removeButtonProps,
      position: compiledPosition,
      creatorButtonProps: compiledCreatorButtonProps,
    } = useCompileFormListProps(props, field.scope)

    const position = computed(() => compiledPosition.value ?? 'bottom')
    const creatorButtonText = '添加一行数据' // TODO: 国际化配置
    const creatorButtonProps = computed<ProButtonProps | false>(() => {
      const btnProps = compiledCreatorButtonProps.value
      if (btnProps === false) {
        return false
      }
      return {
        block: true,
        dashed: true,
        renderIcon: () => {
          return (
            <NIcon>
              <PlusOutlined />
            </NIcon>
          )
        },
        ...(compiledCreatorButtonProps.value || {}),
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
        success && field.insert(insertIndex, creatorInitialValue ?? {})
      }
      else {
        field.insert(insertIndex, creatorInitialValue ?? {})
      }
    }

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
    provideProFormListInstanceContext(exposed)
    return {
      min,
      max,
      list,
      attrs,
      total,
      position,
      action: exposed,
      copyButtonProps,
      removeButtonProps,
      creatorButtonText,
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
      creatorButtonText,
      creatorButtonProps,
    } = this

    function renderCreatorButton() {
      if (creatorButtonProps === false) {
        return null
      }
      if (max !== undefined && total >= max) {
        return null
      }
      return <ProButton {...creatorButtonProps}>{creatorButtonText}</ProButton>
    }

    return (
      <ProFormItem
        {...$props}
        fieldRender={undefined}
        formItemClass="n-pro-form-item"
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

            return listVNode

            return (
              {/* <TransitionGroup
                name="fade"
                tag="div"
                class="container"
                v-slots={{
                  default: () => {
                    return list.map((item, index) => {
                      return (
                        <div key={item[AUTO_CREATE_ID]}>
                          <ProFormListItem
                            index={index}
                            v-slots={$slots}
                          />
                        </div>
                      )
                    })
                  },
                }}
              /> */}
            )
          },
        }}
      >
      </ProFormItem>
    )
  },
})
</script>
