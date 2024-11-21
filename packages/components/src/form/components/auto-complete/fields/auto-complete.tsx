import type { AutoCompleteProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProAutoCompleteSlots } from '../slots'
import { isFunction } from 'lodash-es'
import { autoCompleteProps, NAutoComplete, NFlex } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useReadonlyHelpers } from '../../field'
import { useInjectAutoCompleteInstStore } from '../inst'

export default defineComponent({
  name: 'AutoComplete',
  inheritAttrs: false,
  props: {
    ...autoCompleteProps,
    options: {
      type: [Array, Function] as PropType<
        | AutoCompleteProps['options']
        | ((value: string | null) => NonNullable<AutoCompleteProps['options']>)
      >,
      default: [],
    },
  },
  slots: Object as SlotsType<ProAutoCompleteSlots>,
  setup(props) {
    const {
      instRef,
      registerInst,
    } = useInjectAutoCompleteInstStore()!

    const {
      value,
      empty,
      readonly,
      emptyText,
    } = useReadonlyHelpers()

    const nAutoCompleteOptions = computed(() => {
      const { options = [] } = props
      return isFunction(options) ? options(value.value) : options
    })

    const nAutoCompleteProps = computed<AutoCompleteProps>(() => {
      return {
        ...props,
        options: nAutoCompleteOptions.value,
      }
    })

    registerInst({
      blur: () => instRef.value?.blur(),
      focus: () => instRef.value?.blur(),
    })
    return {
      empty,
      value,
      instRef,
      readonly,
      emptyText,
      nAutoCompleteProps,
    }
  },
  render() {
    if (this.readonly) {
      const { value, empty, emptyText, $slots } = this

      if ($slots.readonly) {
        return $slots.readonly(this.$props)
      }
      if (empty) {
        return emptyText
      }
      return (
        <NFlex size={[8, 0]}>
          {$slots.prefix && <span>{this.$slots.prefix()}</span>}
          <span>{value}</span>
          {$slots.suffix && <span>{this.$slots.suffix()}</span>}
        </NFlex>
      )
    }
    return (
      <NAutoComplete
        ref="instRef"
        {...this.$attrs}
        {...this.nAutoCompleteProps}
        v-slots={this.$slots}
      />
    )
  },
})
