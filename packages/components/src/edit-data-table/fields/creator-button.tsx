import { PlusOutlined } from '@vicons/antd'
import { NIcon } from 'naive-ui'
import { useInjectListFieldContext } from 'pro-components-hooks'
import { ProButton, type ProButtonProps } from '../../button'
import { useReadonlyHelpers } from '../../form'
import { useLocale } from '../../locales'

export default defineComponent({
  name: 'CreatorButton',
  props: {
    max: Number,
    creatorInitialValue: Function as PropType<() => Record<string, any>>,
    creatorButtonProps: [Object, Boolean] as PropType<ProButtonProps | false>,
  },
  setup(props) {
    const {
      readonly,
    } = useReadonlyHelpers()

    const {
      getMessage,
    } = useLocale('ProEditDataTable')

    const {
      insert,
      value: list,
    } = useInjectListFieldContext()!

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

    function add() {
      const { creatorInitialValue } = props
      const total = list.value.length
      const insertIndex = total
      insert(insertIndex, creatorInitialValue?.() ?? {})
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
