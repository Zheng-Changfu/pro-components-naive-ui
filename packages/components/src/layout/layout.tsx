import { NLayout } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useOverrideProps } from '../composables'
import { useMobile } from './composables/useMobile'
import { proLayoutProps } from './props'

const name = 'ProLayout'
export default defineComponent({
  name,
  props: proLayoutProps,
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const isMobile = useMobile()

    const hasSider = computed(() => {
      return !isMobile.value
    })

    return {
      hasSider,
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <NLayout
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
        ]}
        hasSider={this.hasSider}
      >

      </NLayout>
    )
  },
})
