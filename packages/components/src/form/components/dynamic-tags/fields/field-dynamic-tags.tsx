import { NDynamicTags, dynamicTagsProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import type { ProDynamicTagsSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'ProFieldDynamicTags',
  props: dynamicTagsProps,
  slots: Object as SlotsType<ProDynamicTagsSlots>,
  inheritAttrs: false,
  setup() {
    const {
      empty,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    return {
      empty,
      readonly,
      emptyText,
    }
  },
  render() {
    if (this.readonly) {
      const { empty, emptyText } = this

      if (this.$slots.readonly) {
        return this.$slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NDynamicTags
          {...this.$props}
          {...this.$attrs}
          closable={false}
          disabled={true}
          v-slots={this.$slots}
        />
      )
    }
    return (
      <NDynamicTags
        {...this.$props}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
