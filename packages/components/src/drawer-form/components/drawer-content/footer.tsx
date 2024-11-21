import type { ProButtonProps } from '../../../button'
import { warnOnce } from '../../../_utils/warn'
import { ProButton } from '../../../button'
import { useLocale } from '../../../locales'
import { useInjectDrawerForm } from '../../composables/createDrawerForm'

export default defineComponent({
  name: 'Footer',
  props: {
    resetButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
    submitButtonProps: {
      type: [Boolean, Object] as PropType<false | ProButtonProps>,
      default: undefined,
    },
  },
  setup(props) {
    const {
      getMessage,
    } = useLocale('DrawerForm')

    const form = useInjectDrawerForm()
    if (!form) {
      warnOnce(
        'drawer-content',
        '`pro-drawer-content` must be placed inside `drawer-form`.',
      )
    }

    const submiting = computed(() => {
      return form?.submiting.value
    })

    const showResetButton = computed(() => {
      return props.resetButtonProps !== false
    })

    const showSubmitButton = computed(() => {
      return props.submitButtonProps !== false
    })

    const resolvedResetButtonProps = computed<ProButtonProps>(() => {
      return showResetButton.value
        ? {
            content: getMessage(
              'reset',
              '取 消',
            ),
            onClick: () => {
              form?.close()
            },
            disabled: submiting.value,
            ...(props.resetButtonProps ?? {}),
          }
        : {}
    })

    const resolvedSubmitButtonProps = computed<ProButtonProps>(() => {
      return showSubmitButton.value
        ? {
            type: 'primary',
            content: getMessage(
              'submit',
              '确 认',
            ),
            onClick: () => {
              form?.submit()
            },
            loading: submiting.value,
            ...(props.submitButtonProps ?? {}),
          }
        : {}
    })

    return {
      showResetButton,
      showSubmitButton,
      resolvedResetButtonProps,
      resolvedSubmitButtonProps,
    }
  },
  render() {
    const {
      showResetButton,
      showSubmitButton,
      resolvedResetButtonProps,
      resolvedSubmitButtonProps,
    } = this

    const resetButtonDom = showResetButton
      ? <ProButton {...resolvedResetButtonProps} />
      : null

    const submitButtonDom = showSubmitButton
      ? <ProButton {...resolvedSubmitButtonProps} />
      : null

    return [
      resetButtonDom,
      submitButtonDom,
    ]
  },
})
