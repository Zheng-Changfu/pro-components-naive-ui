import type { PropType } from 'vue'
import type { ProTagsConfig } from './types'
import { isArray, isPlainObject, isString } from 'lodash-es'
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
      emptyText,
      mergedValue,
    } = usePlainComponentConfig('tags', overridedProps)

    return {
      empty,
      emptyText,
      mergedValue,
      mergedClsPrefix,
    }
  },
  render() {
    if (this.empty) {
      return this.emptyText
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
  value: string | ProTagsConfig | Array<string | ProTagsConfig[]>,
  config?: Record<string, any>,
) {
  return (
    <ProTags
      value={value}
      config={config}
    />
  )
}

/**
 * 支持字符串、字符串数组、对象、对象数组、对象和字符串混合的数组
 */
export function transformValueToTagOptions(value: any) {
  const list = isArray(value) ? value : [value]
  return list.reduce<ProTagsConfig[]>((p, c) => {
    if (isString(c) && c.length > 0) {
      p.push({
        content: c,
        type: 'primary',
        bordered: false,
      })
    }
    if (isPlainObject(c) && isString(c.content) && c.content.length > 0) {
      p.push({
        type: 'primary',
        bordered: false,
        ...c,
      })
    }
    return p
  }, [])
}
