<script lang='tsx'>
import { computed, defineComponent, toRef } from 'vue'
import { providePathContext, providePathIndexContext, useInjectParentFieldContext } from 'pro-components-hooks'

export default defineComponent({
  name: 'ProFormListItem',
  props: {
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const index = toRef(props, 'index')
    const parent = useInjectParentFieldContext()!

    const path = computed(() => {
      const { index } = props
      return [
        ...parent.path.value,
        index,
      ]
    })

    providePathContext(path)
    providePathIndexContext(index)
    return {
      index,
    }
  },
  render() {
    const {
      index,
      $slots,
    } = this
    return $slots.default?.({ index })
  },
})
</script>
