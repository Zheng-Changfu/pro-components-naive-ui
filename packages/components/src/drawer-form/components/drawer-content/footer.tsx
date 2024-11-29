import type { PropType } from 'vue'
import type { ProButtonProps } from '../../../button'
import { computed, defineComponent } from 'vue'
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
    } = useLocale('ProDrawerContent')

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
            onClick: () => {
              form?.close()
            },
            disabled: submiting.value,
            content: getMessage('reset'),
            ...(props.resetButtonProps ?? {}),
          }
        : {}
    })

    const resolvedSubmitButtonProps = computed<ProButtonProps>(() => {
      return showSubmitButton.value
        ? {
            type: 'primary',
            onClick: () => {
              form?.submit()
            },
            loading: submiting.value,
            content: getMessage('submit'),
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
