import { NLayout } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../_internal/useClsPrefix'
import { useOverrideProps } from '../composables'
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

    return {
      mergedClsPrefix,
    }
  },
  render() {
    return (
      <NLayout
        class={[
          `${this.mergedClsPrefix}-pro-layout`,
        ]}
        hasSider
      >

      </NLayout>
    )
  },
})
