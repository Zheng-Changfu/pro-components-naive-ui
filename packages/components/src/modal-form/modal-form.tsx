import type { SlotsType } from 'vue'
import type { ProFormProps } from '../form'
import type { ProModalProps } from '../modal/props'
import type { ProModalFormSlots } from './slots'
import { pick } from 'lodash-es'
import { NFlex } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveSlotWithProps, resolveWrappedSlotWithProps } from '../_utils/resolve-slot'
import { useOverrideProps } from '../composables'
import { proFormProps as _proFormProps, ProForm } from '../form'
import { ProModal } from '../modal'
import { proModalProps as _proModalProps } from '../modal/props'
import Footer from './components/footer'
import { createProModalForm } from './composables/createProModalForm'
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
        ...pick(
          overridedProps.value,
          Object.keys(_proFormProps),
        ),
        form,
      }
    })

    const proModalProps = computed<ProModalProps>(() => {
      const {
        // #region 冲突的属性
        size,
        theme,
        themeOverrides,
        builtinThemeOverrides,
        // #endregion
        preset,
        proModalProps,
        ...restProps
      } = overridedProps.value

      return {
        ...(proModalProps ?? {}),
        ...pick(
          restProps,
          Object.keys(_proModalProps),
        ),
        'footer': undefined,
        'onClose': closeModal,
        'show': form.show.value,
        'onUpdateShow': undefined,
        'onAfterLeave': onAfterLeave,
        'preset': preset ? 'card' : undefined,
        'onUpdate:show': (val) => {
          val ? form.open() : form.close()
        },
      }
    })

    function onAfterLeave() {
      const {
        onAfterLeave,
        restoreValuesOnClosed,
      } = overridedProps.value

      if (restoreValuesOnClosed) {
        form.restoreFieldsValue()
      }

      onAfterLeave && onAfterLeave()
    }

    function closeModal() {
      const {
        onClose,
      } = overridedProps.value

      return onClose
        ? onClose()
        : !form.submiting.value
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
      footer: computed(() => overridedProps.value.footer),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      submitButtonProps: computed(() => overridedProps.value.submitButtonProps),
    }
  },
  render() {
    return (
      <ProModal
        class={[
          `${this.mergedClsPrefix}-pro-modal-form`,
        ]}
        style={{
          width: this.width ?? '520px',
          maxHeight: this.maxHeight ?? '80%',
        }}
        {...this.proModalProps}
      >
        {{
          ...this.$slots,
          default: (options: { draggableClass: string }) => {
            return resolveWrappedSlotWithProps(this.$slots.default, { options }, (children) => {
              return (
                <ProForm {...this.proFormProps}>
                  {children}
                </ProForm>
              )
            })
          },
          footer: () => {
            if (this.footer === false) {
              return null
            }

            const footerDom = (
              <Footer
                form={this.form}
                resetButtonProps={this.resetButtonProps}
                submitButtonProps={this.submitButtonProps}
              />
            )

            return resolveSlotWithProps(this.$slots.footer, {
              footerDom,
            }, () => {
              return this.footer
                ? this.footer({ footerDom })
                : <NFlex justify="flex-end" size={[8, 8]}>{footerDom}</NFlex>
            })
          },
        }}

      </ProModal>
    )
  },
})
