import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProModalProps } from '../modal/props'
import type { CreateProModalFormReturn } from './composables/createProModalForm'
import type { ProModalFormSlots } from './slots'
import { defineComponent } from 'vue'
import { useOverrideProps } from '../composables'
import { createProModalForm, provideProModalForm } from './composables/createProModalForm'
import { proModalFormProps } from './props'

const name = 'ProModalForm'
export default defineComponent({
  name,
  props: proModalFormProps,
  slots: Object as SlotsType<ProModalFormSlots>,
  setup(props) {
    const modalForm = props.modalForm
      ? props.modalForm
      : (__DEV__ && createProModalForm()) as any as CreateProModalFormReturn

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const proFormProps = computed<ProFormProps>(() => {

    })

    const proModalProps = computed<ProModalProps>(() => {

    })

    provideProModalForm(modalForm)
    return {

    }
  },
  render() {

  },
})
