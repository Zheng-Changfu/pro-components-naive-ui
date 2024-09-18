import type { SlotsType } from 'vue'
import type { ProCardSlots } from './slots'
import { DownOutlined, InfoCircleOutlined, UpOutlined } from '@vicons/antd'
import { isArray, isFunction } from 'lodash-es'
import { collapseTransitionProps, NCard, NEl, NFlex, NIcon, NTooltip, useThemeVars } from 'naive-ui'
import { computed, defineComponent, Fragment } from 'vue'
import ProCollapseTransition from '../_internal/components/collapse-transition/index.vue'
import { useMountStyle } from '../_internal/useMountStyle'
import { resolveSlot, resolveWrappedSlotWithProps } from '../_utils/resolve-slot'
import { useOmitProps, useOverrideProps } from '../composables'
import { useLocale } from '../locales'
import { useCollapseTransition } from './composables/useCollapseTransition'
import { proCardExtendProps, proCardProps } from './props'
import style from './styles/index.cssr'

const name = 'ProCard'
export default defineComponent({
  name,
  props: proCardProps,
  slots: Object as SlotsType<ProCardSlots>,
  setup(props, { slots }) {
    const theme = useMountStyle(
      name,
      'pro-card',
      style,
    )

    const themeVars = useThemeVars()
    const { getMessage } = useLocale('ProCard')

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const nCardProps = useOmitProps(overridedProps, {
      ...proCardExtendProps,
      ...collapseTransitionProps,
      title: props.title, // 忽略掉 title，自定义 title
    })

    const {
      show,
      nCollapseTransitionProps,
    } = useCollapseTransition(overridedProps)

    const showHeader = computed(() => {
      const { title, tooltip } = overridedProps.value
      return !!title || !!slots.header || !!tooltip
    })

    const cssVars = computed(() => {
      const { size } = overridedProps.value
      const {
        prefixHeightSmall = '16px',
        prefixHeightDefault = '18px',
        prefixBgColor = themeVars.value.errorColor,
      } = theme.value

      return {
        '--n-prefix-bg-color': prefixBgColor,
        '--n-prefix-height': size === 'small' ? prefixHeightSmall : prefixHeightDefault,
      }
    })

    const showCollapseArea = computed(() => {
      const { showCollapse, closable } = overridedProps.value
      if (showCollapse !== undefined) {
        return !!showCollapse
      }
      return !closable
    })

    const collapseText = computed(() => {
      return getMessage('collapseText')(!show.value)
    })

    function triggerExpand(area: 'main' | 'arrow') {
      const { triggerAreas = [] } = overridedProps.value
      if (!triggerAreas.includes(area)) {
        return
      }
      show.value = !show.value
    }

    const resolvedTitle = computed(() => {
      const { title } = overridedProps.value
      return isFunction(title) ? title() : title
    })

    const mergedContentClass = computed(() => {
      return [
        'n-pro-card-content',
        overridedProps.value.contentClass ?? '',
        !show.value && 'n-pro-card-content__hidden',
      ].filter(Boolean).join(' ')
    })

    const tooltips = computed(() => {
      const { tooltip } = overridedProps.value
      if (!tooltip) {
        return []
      }
      return isArray(tooltip) ? tooltip : [tooltip]
    })

    return {
      show,
      cssVars,
      tooltips,
      nCardProps,
      showHeader,
      collapseText,
      resolvedTitle,
      triggerExpand,
      overridedProps,
      showCollapseArea,
      mergedContentClass,
      nCollapseTransitionProps,
    }
  },
  render() {
    return (
      <NCard
        {...this.nCardProps}
        contentClass={this.mergedContentClass}
      >
        {{
          ...this.$slots,
          'default': () => [
            <ProCollapseTransition {...this.nCollapseTransitionProps}>
              {this.$slots.default?.()}
            </ProCollapseTransition>,
          ],
          'header': () => [
            this.showHeader && (
              <NEl
                class={[
                  'n-pro-card-header__main',
                  this.overridedProps.prefix && 'prefix',
                  (this.overridedProps.triggerAreas ?? []).includes('main') && 'triggerable',
                ]}
                style={this.cssVars}
                // @ts-expect-error
                onClick={() => this.triggerExpand('main')}
              >
                {resolveSlot(this.$slots.header, () => [this.resolvedTitle])}
                {this.tooltips.length > 0 && (
                  <NTooltip trigger="hover">
                    {{
                      trigger: () => [
                        <NIcon size={18} class="n-pro-card-header__main__tooltip">
                          <InfoCircleOutlined />
                        </NIcon>,
                      ],
                      default: () => [
                        this.tooltips.map((t, i) => <NEl key={i}>{t}</NEl>),
                      ],
                    }}
                  </NTooltip>
                )}
              </NEl>
            ),
          ],
          'header-extra': () => [
            this.$slots['header-extra']?.(),
            this.showCollapseArea && resolveWrappedSlotWithProps(
              this.$slots.collapse,
              { expanded: this.show },
              (children) => {
                children = children ?? (
                  <Fragment>
                    <NEl>{ this.collapseText }</NEl>
                    <NIcon>{this.show ? <UpOutlined /> : <DownOutlined />}</NIcon>
                  </Fragment>
                ) as any

                return (
                  <NFlex
                    size={[4, 0]}
                    align="center"
                    class={[
                      'n-pro-card-header__extra',
                      (this.overridedProps.triggerAreas ?? []).includes('arrow') && 'triggerable',
                    ]}
                    // @ts-expect-error
                    onClick={() => this.triggerExpand('arrow')}
                  >
                    {children}
                  </NFlex>
                )
              },
            ),
          ],
        }}
      </NCard>
    )
  },
})
