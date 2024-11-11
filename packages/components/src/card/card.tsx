import type { SlotsType } from 'vue'
import type { ProCardSlots } from './slots'
import { DownOutlined, InfoCircleOutlined, UpOutlined } from '@vicons/antd'
import { isFunction } from 'lodash-es'
import { collapseTransitionProps, NCard, NEl, NFlex, NIcon, useThemeVars } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import ProCollapseTransition from '../_internal/components/collapse-transition/index.vue'
import ProTooltip from '../_internal/components/pro-tooltip'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
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
    const themeVars = useThemeVars()
    const mergedClsPrefix = useNaiveClsPrefix()

    const theme = useMountStyle(
      name,
      'pro-card',
      style,
    )

    const {
      getMessage,
    } = useLocale('ProCard')

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
      return getMessage('collapse')(!show.value)
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
        overridedProps.value.contentClass ?? '',
        !show.value && `${mergedClsPrefix.value}-card__content--hidden`,
      ].filter(Boolean).join(' ')
    })

    const tooltip = computed(() => {
      return overridedProps.value.tooltip
    })

    return {
      show,
      tooltip,
      cssVars,
      nCardProps,
      showHeader,
      collapseText,
      resolvedTitle,
      triggerExpand,
      overridedProps,
      mergedClsPrefix,
      showCollapseArea,
      mergedContentClass,
      nCollapseTransitionProps,
    }
  },
  render() {
    const { mergedClsPrefix } = this

    return (
      <NCard
        {...this.nCardProps}
        class={[`${mergedClsPrefix}-pro-card`]}
        contentClass={this.mergedContentClass}
      >
        {{
          ...this.$slots,
          'default': () => {
            return (
              <ProCollapseTransition {...this.nCollapseTransitionProps}>
                {this.$slots.default?.()}
              </ProCollapseTransition>
            )
          },
          'header': () => {
            if (!this.showHeader) {
              return null
            }
            return (
              <NEl
                class={[
                  {
                    [`${mergedClsPrefix}-card-header__main--prefix`]: this.overridedProps.prefix,
                    [`${mergedClsPrefix}-card-header__main--trigger`]: (this.overridedProps.triggerAreas ?? []).includes('main'),
                  },
                ]}
                style={this.cssVars}
                // @ts-expect-error
                onClick={() => this.triggerExpand('main')}
              >
                {resolveSlot(this.$slots.header, () => [this.resolvedTitle])}
                <ProTooltip
                  trigger="hover"
                  tooltip={this.tooltip}
                >
                  {{
                    trigger: () => [
                      <NIcon
                        size={18}
                        class={`${mergedClsPrefix}-icon--tooltip`}
                      >
                        <InfoCircleOutlined />
                      </NIcon>,
                    ],
                  }}
                </ProTooltip>
              </NEl>
            )
          },
          'header-extra': () => {
            return [
              this.$slots['header-extra']?.(),
              this.showCollapseArea && resolveWrappedSlotWithProps(this.$slots.collapse, { expanded: this.show }, (children) => {
                children = children ?? [
                  <NEl>{this.collapseText}</NEl>,
                  <NIcon>{this.show ? <UpOutlined /> : <DownOutlined />}</NIcon>,
                ] as any

                return (
                  <NFlex
                    size={[4, 0]}
                    align="center"
                    class={[
                      {
                        [`${mergedClsPrefix}-card-header__extra--trigger`]: (this.overridedProps.triggerAreas ?? []).includes('arrow'),
                      },
                    ]}
                    // @ts-expect-error
                    onClick={() => this.triggerExpand('arrow')}
                  >
                    {children}
                  </NFlex>
                )
              }),
            ]
          },
        }}
      </NCard>
    )
  },
})
