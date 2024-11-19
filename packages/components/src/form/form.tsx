import type { FormInst, FormProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { CreateProFormReturn } from './composables/createProForm'
import type { ProFormSlots } from './slots'
import { NForm } from 'naive-ui'
import { provideInternalForm } from 'pro-composables'
import { computed, onMounted, provide } from 'vue'
import { useOmitProps, useOverrideProps } from '../composables'
import { createProForm, proFormInternalKey, provideProForm } from './composables/createProForm'
import { proFormConfigKey } from './context'
import { proFormExtendProps, proFormProps } from './props'

const name = 'ProForm'
export default defineComponent({
  name,
  props: proFormProps,
  slots: Object as SlotsType<ProFormSlots>,
  setup(props) {
    const nFormInst = ref<FormInst>()

    const form = props.form
      ? props.form
      : (__DEV__ && createProForm()) as any as CreateProFormReturn

    const overridedProps = useOverrideProps(
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
      registerNFormInst,
      validationResults,
    } = form[proFormInternalKey]

    onMounted(() => {
      registerNFormInst(nFormInst.value!)
    })

    provide(proFormConfigKey, {
      validationResults,
      readonly: computed(() => overridedProps.value.readonly),
      validateBehavior: computed(() => overridedProps.value.validateBehavior),
      readonlyEmptyText: computed(() => overridedProps.value.readonlyEmptyText),
      validationTrigger: computed(() => overridedProps.value.validationTrigger),
      validateBehaviorProps: computed(() => overridedProps.value.validateBehaviorProps),
    })
    provideProForm(form)
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
