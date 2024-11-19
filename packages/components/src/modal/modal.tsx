import type { ModalProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProModalSlots } from './slots'
import { NModal } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { mergeClass } from '../_utils/mergeClass'
import { useOmitProps, useOverrideProps } from '../composables'
import { DRAGGABLE_CLASS, useDragModal } from './composables/useDragModal'
import { proModalExtendProps, proModalProps } from './props'
import style from './styles/index.cssr'

const name = 'ProModal'
export default defineComponent({
  name,
  props: proModalProps,
  slots: Object as SlotsType<ProModalSlots>,
  setup(props) {
    const modalElement = ref<HTMLElement>()
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    useMountStyle(
      'ProModal',
      'pro-modal',
      style,
    )

    const modalProps = useOmitProps(
      overridedProps,
      proModalExtendProps,
    )

    const {
      startDrag,
      canDraggable,
    } = useDragModal(overridedProps)

    const draggableClass = computed(() => {
      return canDraggable.value
        ? DRAGGABLE_CLASS
        : ''
    })

    const draggableClassProps = computed<ModalProps>(() => {
      const {
        preset,
        titleClass,
        headerClass,
      } = overridedProps.value

      if (preset === 'confirm' || preset === 'dialog') {
        return {
          titleClass: mergeClass(
            titleClass,
            draggableClass.value,
          ),
        }
      }

      if (preset === 'card') {
        return {
          headerClass: mergeClass(
            headerClass,
            draggableClass.value,
          ),
        }
      }
      return {}
    })

    const nModalProps = computed<ModalProps>(() => {
      return {
        ...modalProps.value,
        ...draggableClassProps.value,
        onAfterEnter: onAfterEnter as any,
      }
    })

    function onAfterEnter(modal: HTMLElement) {
      modalElement.value = modal
      canDraggable.value && startDrag(modal)
      overridedProps.value.onAfterEnter && (overridedProps.value.onAfterEnter as any)(modal)
    }

    return {
      nModalProps,
      draggableClass,
      mergedClsPrefix,
      preset: computed(() => overridedProps.value.preset),
    }
  },
  render() {
    return (
      <NModal
        {...this.nModalProps}
        class={[`${this.mergedClsPrefix}-pro-modal`]}
      >
        {{
          ...this.$slots,
          default: () => {
            return this.$slots.default?.({ draggableClass: this.draggableClass })
          },
        }}
      </NModal>
    )
  },
})
