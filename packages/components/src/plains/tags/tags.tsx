import type { PropType } from 'vue'
import type { ProTagsConfig } from './types'
import { NFlex, NTag } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { useOverrideProps } from '../../composables'
import { usePlainComponentConfig } from '../composables'

const name = 'ProTags'
export const ProTags = defineComponent({
  name,
  props: {
    /**
     * 传递进来的值
     */
    value: undefined as unknown as PropType<any>,
    /**
     * 占位，现在没什么用
     */
    config: Object,
  },
  setup(props) {
    const mergedClsPrefix = useNaiveClsPrefix()

    const overridedProps = useOverrideProps(
      name,
      props,
    )

    const {
      empty,
      emptyDom,
      mergedValue,
    } = usePlainComponentConfig('tags', overridedProps)

    return {
      empty,
      emptyDom,
      mergedValue,
      mergedClsPrefix,
    }
  },
  render() {
    if (this.empty) {
      return this.emptyDom
    }
    return (
      <NFlex class={[`${this.mergedClsPrefix}-pro-tags`]}>
        {this.mergedValue.map((option, index) => {
          const { content, ...nTagProps } = option
          return (
            <NTag
              key={index + content!}
              {...nTagProps}
            >
              {content}
            </NTag>
          )
        })}
      </NFlex>
    )
  },

})

export function renderTags(
  value: string | ProTagsConfig | Array<string | ProTagsConfig>,
  config?: Record<string, any>,
) {
  return (
    <ProTags
      value={value}
      config={config}
    />
  )
}
