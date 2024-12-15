import type { PropType } from 'vue'
import type { ProImagesConfig } from './types'
import { NFlex, NImage, NImageGroup } from 'naive-ui'
import { defineComponent } from 'vue'
import { useNaiveClsPrefix } from '../../_internal/useClsPrefix'
import { useOverrideProps } from '../../composables'
import { usePlainComponentConfig } from '../composables'

const name = 'ProImages'
export const ProImages = defineComponent({
  name,
  props: {
    /**
     * 传递进来的值
     */
    value: undefined as unknown as PropType<any>,
    /**
     * 传递给 n-image 的选项，里面的 imageGroupProps 是传递给 n-image-group 组件的
     */
    config: Object as PropType<ProImagesConfig>,
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
    } = usePlainComponentConfig('images', overridedProps)

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

    const {
      imageGroupProps = {},
      ...nImageProps
    } = this.$props.config ?? {}

    function renderSingleImage(src: string) {
      return (
        <NImage
          width={42}
          {...nImageProps}
          src={src}
        />
      )
    }

    if (this.mergedValue.length === 1) {
      const src = this.mergedValue[0]
      return renderSingleImage(src)
    }
    else {
      return (
        <NImageGroup {...imageGroupProps}>
          <NFlex size="small">
            {this.mergedValue.map(renderSingleImage)}
          </NFlex>
        </NImageGroup>
      )
    }
  },

})

export function renderImages(value: any, config?: ProImagesConfig) {
  return (
    <ProImages
      value={value}
      config={config}
    />
  )
}
