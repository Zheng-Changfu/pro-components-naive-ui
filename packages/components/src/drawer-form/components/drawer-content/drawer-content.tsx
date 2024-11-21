import type { SlotsType } from 'vue'
import type { ProDrawerContentSlots } from './slots'
import { NDrawerContent, NFlex } from 'naive-ui'
import { resolveSlotWithProps } from '../../../_utils/resolve-slot'
import { useOmitProps, useOverrideProps } from '../../../composables'
import Footer from './footer'
import { proDrawerContentExtendProps, proDrawerContentProps } from './props'

const name = 'ProDrawerContent'
export default defineComponent({
  name,
  props: proDrawerContentProps,
  slots: Object as SlotsType<ProDrawerContentSlots>,
  setup(props) {
    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const nDrawerContentProps = useOmitProps(
      overridedProps,
      proDrawerContentExtendProps,
    )

    const showFooter = computed(() => {
      const {
        footer,
        resetButtonProps,
        submitButtonProps,
      } = overridedProps.value

      return footer !== false
        && (resetButtonProps !== false || submitButtonProps !== false)
    })

    return {
      showFooter,
      nDrawerContentProps,
      footer: computed(() => overridedProps.value.footer),
      resetButtonProps: computed(() => overridedProps.value.resetButtonProps),
      submitButtonProps: computed(() => overridedProps.value.submitButtonProps),
    }
  },
  render() {
    return (
      <NDrawerContent {...this.nDrawerContentProps}>
        {{
          ...this.$slots,
          footer: this.showFooter
            ? () => {
                const footerDom = (
                  <Footer
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
              }
            : null,
        }}
      </NDrawerContent>
    )
  },
})
