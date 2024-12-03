import type { ProButtonProps } from '../../button'
import { PlusOutlined } from '@vicons/antd'
import { useToggle } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import { useInjectListField } from 'pro-composables'
import { computed, defineComponent } from 'vue'
import { ProButton } from '../../button'
import { useLocale } from '../../locales'
import { internalEditDataTableProps } from '../props'

export default defineComponent({
  name: 'CreatorButton',
  props: {
    max: internalEditDataTableProps.max,
    actionGuard: internalEditDataTableProps.actionGuard,
    creatorButtonProps: internalEditDataTableProps.creatorButtonProps,
    creatorInitialValue: internalEditDataTableProps.creatorInitialValue,
  },
  setup(props) {
    const {
      getMessage,
    } = useLocale('ProEditDataTable')

    const {
      insert,
      value: list,
    } = useInjectListField()!

    const [
      loading,
      setLoading,
    ] = useToggle()

    /**
     * 这里按钮不被 readonly 控制
     */
    const showButton = computed(() => {
      const { max, creatorButtonProps } = props
      return creatorButtonProps !== false && list.value.length < (max ?? Number.POSITIVE_INFINITY)
    })

    const proButtonProps = computed<ProButtonProps>(() => {
      const { creatorButtonProps } = props
      return {
        block: true,
        dashed: true,
        loading: loading.value,
        content: getMessage('add'),
        renderIcon: () => {
          return (
            <NIcon>
              <PlusOutlined />
            </NIcon>
          )
        },
        onClick: add,
        ...(creatorButtonProps ?? {}),
      }
    })

    async function add() {
      const { actionGuard, creatorInitialValue } = props
      const { beforeAddRow, afterAddRow } = actionGuard ?? {}
      const insertIndex = list.value.length

      if (beforeAddRow) {
        setLoading(true)
        const success = await beforeAddRow({ total: list.value.length, index: -1, insertIndex })
        if (success) {
          insert(insertIndex, creatorInitialValue?.() ?? {})
          if (afterAddRow) {
            afterAddRow({ total: list.value.length, index: -1, insertIndex })
          }
        }
        setLoading(false)
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
            style={{ marginBlockStart: '16px' }}
          />
        )
      : null
  },
})
