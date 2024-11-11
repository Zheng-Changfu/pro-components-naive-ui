import type { ModalProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProModalInst } from './inst'
import type { ProModalSlots } from './slots'
import { FullscreenExitOutlined, FullscreenOutlined } from '@vicons/antd'
import { createEventHook, useFullscreen, useVModel } from '@vueuse/core'
import { isFunction } from 'lodash-es'
import { NButton, NIcon, NModal } from 'naive-ui'
import { computed, defineComponent, nextTick } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOmitProps, useOverrideProps } from '../composables'
import { useDragModal } from './composables/useDragModal'
import { draggableClass } from './const'
import { proModalExtendProps, proModalProps } from './props'
import style from './styles/index.cssr'

const name = 'ProModal'
export default defineComponent({
  name,
  props: proModalProps,
  slots: Object as SlotsType<ProModalSlots>,
  setup(props, { expose }) {
    const modalElement = ref<HTMLElement>()
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      on: onAfterEnterHook,
      trigger: triggerAfterEnter,
    } = createEventHook()

    const {
      on: onAfterLeaveHook,
      trigger: triggerAfterLeave,
    } = createEventHook()

    useMountStyle(
      'ProModal',
      'pro-modal',
      style,
    )

    const modalProps = useOmitProps(
      overridedProps,
      proModalExtendProps,
    )

    const show = useVModel(
      props,
      'show',
      undefined,
      { passive: true },
    )

    const {
      isFullscreen,
      exit: exitFullscreen,
      enter: enterFullscreen,
      toggle: toggleFullscreen,
    } = useFullscreen(modalElement)

    const {
      canDraggable,
      bindingEvents: bindingDragEvents,
    } = useDragModal(overridedProps)

    const headerClassProps = computed<ModalProps>(() => {
      const {
        preset,
        titleClass,
        headerClass,
      } = overridedProps.value

      if (preset === 'confirm' || preset === 'dialog') {
        return {
          titleClass: [
            titleClass,
            canDraggable.value && draggableClass,
          ].filter(Boolean).join(' '),
        }
      }
      if (preset === 'card') {
        return {
          headerClass: [
            headerClass,
            canDraggable.value && draggableClass,
          ].filter(Boolean).join(' '),
        }
      }
      return {}
    })

    const nModalProps = computed<ModalProps>(() => {
      return {
        ...modalProps.value,
        ...headerClassProps.value,
        'show': show.value,
        'onUpdate:show': v => show.value = v,
        'onAfterEnter': onAfterEnter as any,
        'onAfterLeave': onAfterLeave as any,
      }
    })

    function onAfterEnter(modal: HTMLElement) {
      modalElement.value = modal
      overridedProps.value.onAfterEnter && (overridedProps.value.onAfterEnter as any)(modal)
      triggerAfterEnter()
      canDraggable.value && bindingDragEvents(modal)
    }

    function onAfterLeave(modal: HTMLElement) {
      overridedProps.value.onAfterLeave && (overridedProps.value.onAfterLeave as any)(modal)
      triggerAfterLeave()
    }

    function open(fn?: () => void) {
      show.value = true
      if (isFunction(fn)) {
        nextTick(fn)
      }
    }

    function close(fn?: () => void) {
      show.value = false
      if (isFunction(fn)) {
        nextTick(fn)
      }
    }

    const exposed: ProModalInst = {
      open,
      close,
      exitFullscreen,
      enterFullscreen,
      toggleFullscreen,
      onAfterEnter: onAfterEnterHook,
      onAfterLeave: onAfterLeaveHook,
    }

    expose(exposed)
    return {
      nModalProps,
      isFullscreen,
      mergedClsPrefix,
      toggleFullscreen,
    }
  },
  render() {
    const {
      $slots,
      preset,
      fullscreen,
      nModalProps,
      isFullscreen,
      mergedClsPrefix,
      toggleFullscreen,
    } = this

    function renderFullscreenIcon() {
      return (
        <NButton text={true} onClick={toggleFullscreen}>
          <NIcon size="var(--n-title-font-size)">
            {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </NIcon>
        </NButton>
      )
    }

    const slots = fullscreen && preset === 'card'
      ? {
          ...$slots,
          'header-extra': () => {
            return [
              $slots['header-extra']?.(),
              renderFullscreenIcon(),
            ]
          },
        }
      : $slots

    return (
      <NModal
        {...nModalProps}
        class={[`${mergedClsPrefix}-pro-modal`]}
      >
        {slots}
      </NModal>
    )
  },
})
