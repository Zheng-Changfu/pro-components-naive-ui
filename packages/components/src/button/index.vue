<script lang='tsx'>
import type { SlotsType } from 'vue'
import { computed, defineComponent } from 'vue'
import type { ButtonProps } from 'naive-ui'
import { NButton, NEl, NTooltip } from 'naive-ui'
import { useOmitProps } from '../hooks'
import { proButtonExtendProps, proButtonProps } from './props'
import type { ProButtonSlots } from './slots'
import { useLoading } from './useLoading'
import { useTooltip } from './useTooltip'
import { useAuth } from './useAuth'

export default defineComponent({
  name: 'ProButton',
  inheritAttrs: false,
  props: proButtonProps,
  slots: Object as SlotsType<ProButtonSlots>,
  setup(props) {
    const buttonProps = useOmitProps(
      props,
      proButtonExtendProps,
    )

    const {
      loading,
      clickLoading,
    } = useLoading(props)

    const {
      tooltipProps,
      tooltipTexts,
    } = useTooltip(props)

    const {
      pass,
    } = useAuth(props)

    const nButtonProps = computed<ButtonProps>(() => {
      return {
        ...buttonProps.value,
        loading: loading.value,
        onClick: clickLoading,
      }
    })

    return {
      pass,
      tooltipProps,
      tooltipTexts,
      nButtonProps,
    }
  },
  render() {
    const {
      pass,
      $props,
      $attrs,
      $slots,
      nButtonProps,
      tooltipProps,
      tooltipTexts,
    } = this

    if (!pass) {
      return null
    }

    return (
      <NTooltip
        {...tooltipProps}
        v-slots={{
          trigger: () => {
            return (
              <NButton
                {...$attrs}
                {...nButtonProps}
                v-slots={{
                  ...$slots,
                  default: () => {
                    if ($props.content) {
                      return $props.content
                    }
                    return $slots.default?.()
                  },
                }}
              />
            )
          },
          default: () => {
            return tooltipTexts.map((t, i) => {
              return <NEl key={i}>{t}</NEl>
            })
          },
        }}
      />
    )
  },
})
</script>
