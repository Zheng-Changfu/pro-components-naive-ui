import type { PropType } from 'vue'
import type { ActionGuard } from '../types'
import { PlusOutlined } from '@vicons/antd'
import { useToggle } from '@vueuse/core'
import { NIcon } from 'naive-ui'
import { useInjectListFieldContext } from 'pro-composables'
import { ProButton, type ProButtonProps } from '../../button'
import { useLocale } from '../../locales'

export default defineComponent({
  name: 'CreatorButton',
  props: {
    max: Number,
    actionGuard: Object as PropType<ActionGuard>,
    creatorInitialValue: Function as PropType<() => Record<string, any>>,
    creatorButtonProps: [Object, Boolean] as PropType<ProButtonProps | false>,
  },
  setup(props) {
    const {
      getMessage,
    } = useLocale('ProEditDataTable')

    const {
      insert,
      value: list,
    } = useInjectListFieldContext()!

    const [
      loading,
      setLoading,
    ] = useToggle()

    const showButton = computed(() => {
      /**
       * 这里按钮不被 readonly 控制
       */
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
            onClick={this.add}
          />
        )
      : null
  },
})
