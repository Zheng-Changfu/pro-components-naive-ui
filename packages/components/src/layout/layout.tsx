import { NLayout, NLayoutSider } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useMountStyle } from '../_internal/useMountStyle'
import { useOverrideProps } from '../composables'
import { ProLogo } from './components/logo'
import { useMobile } from './composables/useMobile'
import { proLayoutProps } from './props'
import style from './styles/index.cssr'

const name = 'ProLayout'
export default defineComponent({
  name,
  props: proLayoutProps,
  setup(props) {
    useMountStyle('pro-layout', name, style)
    const mergedClsPrefix = useNaiveClsPrefix()
    const overridedProps = useOverrideProps(name, props)

    const isMobile = useMobile()

    const hasSider = computed(() => {
      return !isMobile.value
    })

    return {
      hasSider,
      overridedProps,
      mergedClsPrefix,
    }
  },
  render() {
    const {
      logo,
      title,
      layoutType,
      onLogoClick,
    } = this.overridedProps

    return (
      <div class={[
        `${this.mergedClsPrefix}-pro-layout`,
        {
          [`${this.mergedClsPrefix}-pro-layout--mobile`]: !this.hasSider,
          [`${this.mergedClsPrefix}-pro-layout--mixed`]: layoutType === 'mixed',
          [`${this.mergedClsPrefix}-pro-layout--header`]: layoutType === 'header',
          [`${this.mergedClsPrefix}-pro-layout--siderbar`]: layoutType === 'sidebar',
          [`${this.mergedClsPrefix}-pro-layout--full-content`]: layoutType === 'full-content',
        },
      ]}
      >
        <NLayout
          hasSider={this.hasSider}
          position="absolute"
        >
          <NLayoutSider
            class={[
              `${this.mergedClsPrefix}-pro-layout-sider`,
            ]}
            bordered
            nativeScrollbar={false}
          >
            <ProLogo
              logo={logo}
              title={title}
              onLogoClick={onLogoClick}
              v-slots={this.$slots}
            />
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
            <div>sider..</div>
          </NLayoutSider>
          <NLayout nativeScrollbar={false}>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
            <div>content...</div>
          </NLayout>
        </NLayout>
      </div>
    )
  },
})
