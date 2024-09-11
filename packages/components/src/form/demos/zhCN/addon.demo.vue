<markdown>
# 前缀和后缀

你可以使用 `addon-before` 和 `addon-after` 属性来定义前缀和后缀，也可以使用插槽来定义，属性定义时只支持字符串格式
</markdown>

<template>
  <n-flex vertical>
    <pro-form label-width="auto" label-placement="left">
      <pro-input title="用户名" path="username">
        <template #addon-after>
          <n-button type="primary">
            搜索
          </n-button>
        </template>
      </pro-input>
      <pro-password title="密码" path="password">
        <template #addon-before>
          <div class="flex items-center">
            😁
          </div>
        </template>
      </pro-password>
      <pro-select
        title="下拉"
        path="select"
        :field-props="{
          class: 'w-200px',
          options: [
            {
              label: 'Drive My Car',
              value: 'song1',
            },
            {
              label: 'Norwegian Wood',
              value: 'song2',
            },
          ],
        }"
      >
        <template #addon-after>
          <div class="color-red flex items-center">
            牛马
          </div>
        </template>
      </pro-select>
      <pro-switch
        title="开关"
        path="switch"
        addon-before="before..."
        addon-after="after..."
      />
    </pro-form>
  </n-flex>
</template>
