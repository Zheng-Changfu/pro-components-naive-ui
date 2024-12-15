import type { FormInst, FormProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProFormProps } from './props'
import type { ProFormSlots } from './slots'
import { useEventListener } from '@vueuse/core'
import { NForm } from 'naive-ui'
import { provideInternalForm } from 'pro-composables'
import { computed, defineComponent, onMounted, provide, ref } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
import { provideWrappedIn } from '../config-provider'
import { createProForm, proFormInternalKey, provideProForm } from './composables/createProForm'
import { proFormConfigInjectionKey } from './context'
import { proFormExtendProps, proFormProps } from './props'

const name = 'ProForm'
export default defineComponent({
  name,
  props: proFormProps,
  slots: Object as SlotsType<ProFormSlots>,
  setup(props) {
    let form = props.form
    if (!form && __DEV__) {
      form = createProForm()
    }

    const nFormInst = ref<FormInst>()

    const overridedProps = useOverrideProps<ProFormProps>(
      name,
      props,
    )

    const formProps = useOmitProps(
      overridedProps,
      proFormExtendProps,
    )

    const nFormProps = computed<FormProps>(() => {
      return {
        ...formProps.value,
        rules: undefined,
        ref: nFormInst,
        model: form[proFormInternalKey].model.value,
        /**
         * 支持 button `attr-type = submit` 提交表单
         */
        onSubmit: (e) => {
          e.preventDefault()
          form.submit()
          props.onSubmit && props.onSubmit(e)
        },
        /**
         * 支持 button `attr-type = reset` 重置表单
         */
        onReset: (e: Event) => {
          e.preventDefault()
          form.restoreFieldsValue()
        },
      }
    })

    const {
      internalForm,
      validationResults,
      registerNFormInst,
    } = form[proFormInternalKey]

    onMounted(() => {
      registerNFormInst(nFormInst.value!)
    })

    /**
     * form 元素默认行为是支持按下回车提交的，所以这里只需要做阻止操作即可
     */
    useEventListener(() => {
      return overridedProps.value.submitOnPressEnter
        ? null
        : (nFormInst.value as any)?.$el
    }, 'keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
      }
    })

    provide(proFormConfigInjectionKey, {
      validationResults,
      rules: computed(() => overridedProps.value.rules),
      readonly: computed(() => overridedProps.value.readonly),
      validateBehavior: computed(() => overridedProps.value.validateBehavior),
      validationTrigger: computed(() => overridedProps.value.validationTrigger!),
      validateBehaviorProps: computed(() => overridedProps.value.validateBehaviorProps),
    })
    provideProForm(form)
    provideWrappedIn('form')
    provideInternalForm(internalForm)
    return {
      nFormProps,
    }
  },
  render() {
    return (
      <NForm
        {...this.nFormProps}
        v-slots={this.$slots}
      />
    )
  },
})
