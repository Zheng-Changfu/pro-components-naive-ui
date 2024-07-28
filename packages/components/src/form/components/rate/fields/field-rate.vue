<script lang='tsx'>
import { NRate, rateProps } from 'naive-ui'
import type { SlotsType } from 'vue'
import { defineComponent } from 'vue'
import type { ProRateSlots } from '../slots'
import { useReadonlyHelpers } from '../../field'

export default defineComponent({
  name: 'FieldRate',
  props: rateProps,
  slots: Object as SlotsType<ProRateSlots>,
  setup() {
    const {
      readonly,
      readonlyRender,
    } = useReadonlyHelpers()

    return {
      readonly,
      readonlyRender,
    }
  },
  render() {
    const {
      $props,
      $slots,
      readonly,
      readonlyRender,
    } = this

    if (readonly) {
      if (readonlyRender) {
        return readonlyRender()
      }
      return (
        <NRate
          {...$props}
          readonly={true}
          v-slots={$slots}
        />
      )
    }

    return (
      <NRate
        {...$props}
        v-slots={$slots}
      />
    )
  },
})
</script>
