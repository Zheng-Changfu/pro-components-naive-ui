# 简约组件 PlainComponent
<!--single-column-->

足够简单、但也比较实用,可以被你用在任意的位置,它们有一些公共的特征
- 全局值转化
- 全局 `empty` 渲染
- 使用方式支持函数和组件`2`种
- 都不支持插槽

## 演示

```demo
functional.vue
component.vue
transform.vue
```

## API
### ProCopyableText 属性
默认的转化是将传进来的值转为 `string`,函数调用时接收参数
```typescript
import { renderCopyableText } from 'pro-naive-ui'

renderCopyableText(value,config)
```

引用到的类型声明介绍如下
```typescript
import { ProCopyableTextConfig } from 'pro-naive-ui'
```

| 名称   | 类型                    | 默认值 | 说明         | 版本 |
| ------ | ----------------------- | ------ | ------------ | ---- |
| value  | `any`                   | `-`    | 传递进来的值 |      |
| config | `ProCopyableTextConfig` | `-`    | 配置选项     |      |

### ProDateText 属性
函数调用时接收参数
```typescript
import { renderDateText } from 'pro-naive-ui'

renderDateText(value,config)
```

引用到的类型声明介绍如下
```typescript
interface ProDateTextConfig {
  /**
   * @see https://date-fns.org/v3.6.0/docs/format
   * 格式化模式,默认支持几种常用格式
   * month = MMM
   * time = HH:mm:ss
   * date = yyyy-MM-dd
   * quarter = yyyy-qqq
   * year = yyyy年(支持国际化)
   * week = YYYY-w周(支持国际化)
   * datetime = yyyy-MM-dd HH:mm:ss
   * 默认值为 datetime,你可以写 date-fns 支持的所有格式
   */
  pattern?: 'date' | 'time' | 'datetime' | 'year' | 'month' | 'quarter' | 'week' | ({} & string)
}
```

| 名称   | 类型                | 默认值 | 说明         | 版本 |
| ------ | ------------------- | ------ | ------------ | ---- |
| value  | `any`               | `-`    | 传递进来的值 |      |
| config | `ProDateTextConfig` | `-`    | 配置选项     |      |

### ProImages 属性
默认的转化支持字符串、字符串组成的数组,函数调用时接收参数
```typescript
import { renderImages } from 'pro-naive-ui'

renderImages(value,config)
```

引用到的类型声明介绍如下
```typescript
import type { ProImagesConfig } from 'pro-naive-ui'
```

| 名称   | 类型              | 默认值 | 说明         | 版本 |
| ------ | ----------------- | ------ | ------------ | ---- |
| value  | `any`             | `-`    | 传递进来的值 |      |
| config | `ProImagesConfig` | `-`    | 配置选项     |      |

### ProTags 属性
默认的转化支持字符串、字符串数组、对象、对象数组、对象和字符串混合的数组,函数调用时接收参数
```typescript
import { renderTags } from 'pro-naive-ui'

renderTags(value,config)
```

引用到的类型声明介绍如下
```typescript
import type { ProTagsConfig } from 'pro-naive-ui'
```

| 名称   | 类型            | 默认值 | 说明         | 版本 |
| ------ | --------------- | ------ | ------------ | ---- |
| value  | `any`           | `-`    | 传递进来的值 |      |
| config | `ProTagsConfig` | `-`    | 配置选项     |      |
