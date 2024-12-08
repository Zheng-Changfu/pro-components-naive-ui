<markdown>
# 全局转化值

有些时候后端返回图片链接喜欢用逗号分割,这个时候你可以利用全局转化

<n-alert type="warning" title="注意" :bordered="false">
  如果公司是统一的几种返回格式风格,可以使用全局转化,否则不推荐使用
</n-alert>
</markdown>

<script lang="tsx">
import type { PlainComponentValueTransform } from 'pro-naive-ui'
import { isArray, isString } from 'lodash-es'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const transform: PlainComponentValueTransform = {
      images(value, _) {
        const list = isArray(value) ? value : [value]
        return list.reduce<string[]>((p, c) => {
          if (isString(c) && c.length > 0) {
            p.push(...c.split(','))
          }
          return p
        }, [])
      },
    }

    return {
      transform,
    }
  },
})
</script>

<template>
  <pro-config-provider :plain-component-value-transform="transform">
    <n-descriptions title="描述" label-placement="left" bordered>
      <n-descriptions-item label="字符串风格">
        <pro-images value="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
      </n-descriptions-item>
      <n-descriptions-item label="字符串数组风格">
        <pro-images
          :value="[
            'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
            'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg',
          ]"
        />
      </n-descriptions-item>
      <n-descriptions-item label="字符串逗号分割风格">
        <pro-images value="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg,https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg" />
      </n-descriptions-item>
    </n-descriptions>
  </pro-config-provider>
</template>
