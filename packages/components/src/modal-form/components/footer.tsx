import type { ProButtonProps } from '../../button'
import type { CreateProModalFormReturn } from '../composables/createProModalForm'
import { ProButton } from '../../button'
import { useLocale } from '../../locales'

export default defineComponent({
  name: 'Footer',
  props: {
    form: {
      type: Object as PropType<CreateProModalFormReturn>,
      required: true,
    },
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
    } = useLocale('ProModalForm')

    const submiting = computed(() => {
      return props.form.submiting.value
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
              props.form.close()
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
              props.form.submit()
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
