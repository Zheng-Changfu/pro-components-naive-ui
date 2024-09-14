import type { ModalProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProModalInst } from './inst'
import type { ProModalSlots } from './slots'
import { FullscreenExitOutlined, FullscreenOutlined } from '@vicons/antd'
import { createEventHook, useFullscreen, useVModel } from '@vueuse/core'
import { isFunction } from 'lodash-es'
import { NButton, NIcon, NModal } from 'naive-ui'
import { computed, defineComponent, nextTick } from 'vue'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOmitProps } from '../composables'
import { useDragModal } from './composables/useDragModal'
import { draggableClass } from './const'
import { proModalExtendProps, proModalProps } from './props'
import style from './styles/index.cssr'

export default defineComponent({
  name: 'ProModal',
  props: proModalProps,
  slots: Object as SlotsType<ProModalSlots>,
  setup(props, { expose }) {
    const modalElement = ref<HTMLElement>()

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
      props,
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
    } = useDragModal(props)

    const headerClassProps = computed<ModalProps>(() => {
      const {
        preset,
        titleClass,
        headerClass,
      } = props

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
        'class': 'n-pro-modal',
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
      props.onAfterEnter && (props.onAfterEnter as any)(modal)
      triggerAfterEnter()
      canDraggable.value && bindingDragEvents(modal)
    }

    function onAfterLeave(modal: HTMLElement) {
      props.onAfterLeave && (props.onAfterLeave as any)(modal)
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
      <NModal {...nModalProps}>{slots}</NModal>
    )
  },
})
