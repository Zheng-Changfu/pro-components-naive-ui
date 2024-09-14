import type { AutoCompleteProps } from 'naive-ui'
import type { PropType, SlotsType } from 'vue'
import type { ProAutoCompleteSlots } from '../slots'
import { isFunction } from 'lodash-es'
import { autoCompleteProps, NAutoComplete, NEl, NFlex } from 'naive-ui'
import { useReadonlyHelpers } from '../../field'
import { useProAutoCompleteInst } from '../inst'

export default defineComponent({
  name: 'ProFieldAutoComplete',
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
  setup(props, { expose }) {
    const [
      instRef,
      methods,
    ] = useProAutoCompleteInst()

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

    expose(methods)
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
          {$slots.prefix && <NEl>{this.$slots.prefix()}</NEl>}
          <NEl>{value}</NEl>
          {$slots.suffix && <NEl>{this.$slots.suffix()}</NEl>}
        </NFlex>
      )
    }
    return (
      <NAutoComplete
        ref="instRef"
        {...this.nAutoCompleteProps}
        {...this.$attrs}
        v-slots={this.$slots}
      />
    )
  },
})
