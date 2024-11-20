import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProModalProps } from '../modal/props'
import type { ProModalFormSlots } from './slots'
import { pick } from 'lodash-es'
import { NFlex } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveSlotWithProps } from '../_utils/resolve-slot'
import { useOverrideProps } from '../composables'
import { proFormProps as _proFormProps, ProForm } from '../form'
import { proFormInternalKey } from '../form/composables/createProForm'
import { ProModal } from '../modal'
import { proModalProps as _proModalProps } from '../modal/props'
import { createProModalForm } from './composables/createProModalForm'
import Footer from './modal-form-footer'
import { proModalFormProps } from './props'
import style from './styles/index.cssr'

const name = 'ProModalForm'
export default defineComponent({
  name,
  props: proModalFormProps,
  slots: Object as SlotsType<ProModalFormSlots>,
  setup(props) {
    let form = props.form
    if (!form && __DEV__) {
      form = createProModalForm()
    }

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const mergedClsPrefix = useNaiveClsPrefix()

    const proFormProps = computed<ProFormProps>(() => {
      return {
        ...pick(overridedProps.value, Object.keys(_proFormProps)),
        form,
      }
    })

    const proModalProps = computed<ProModalProps>(() => {
      const {
        size,
        theme,
        preset,
        proModalProps,
        ...restProps
      } = overridedProps.value

      return {
        ...(proModalProps ?? {}),
        ...pick(restProps, Object.keys(_proModalProps)),
        'footer': undefined,
        'onClose': closeModal,
        'onUpdateShow': undefined,
        'onUpdate:show': undefined,
        'preset': preset ? 'card' : undefined,
        'onAfterLeave': restoreValuesOnClosed,
        'show': form[proFormInternalKey].show.value,
      }
    })

    function restoreValuesOnClosed() {
      const {
        restoreValuesOnClosed,
      } = overridedProps.value

      if (restoreValuesOnClosed) {
        form.restoreFieldsValue()
      }
    }

    function closeModal() {
      const {
        onClose,
      } = overridedProps.value

      onClose
        ? onClose()
        : !form.submiting.value && form.close()
    }

    useMountStyle(
      name,
      'pro-modal-form',
      style,
      mergedClsPrefix,
    )

    return {
      form,
      proFormProps,
      proModalProps,
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <ProModal
        class={[
          `${this.mergedClsPrefix}-pro-modal-form`,
        ]}
        {...this.proModalProps}
      >
        {{
          ...this.$slots,
          default: (options: { draggableClass: string }) => {
            return <ProForm {...this.proFormProps}>{this.$slots.default?.(options)}</ProForm>
          },
          footer: () => {
            if (this.$props.footer === false) {
              return null
            }

            const {
              footer,
              resetButtonProps,
              submitButtonProps,
            } = this.$props

            const footerDom = (
              <Footer
                form={this.form}
                resetButtonProps={resetButtonProps}
                submitButtonProps={submitButtonProps}
              />
            )

            return resolveSlotWithProps(this.$slots.footer, {
              footerDom,
            }, () => {
              return footer
                ? footer({ footerDom })
                : <NFlex justify="flex-end" size={[8, 8]}>{footerDom}</NFlex>
            })
          },
        }}

      </ProModal>
    )
  },
})
