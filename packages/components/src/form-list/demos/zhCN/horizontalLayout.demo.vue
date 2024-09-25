<markdown>
# 横向布局
</markdown>

<template>
  <pro-form label-placement="left">
    <pro-form-list
      title="规格信息"
      path="attributes"
      :min="1"
      :initial-value="[
        {
          name: '颜色',
          items: [
            { name: '红' },
            { name: '橙' },
          ],
        },
      ]"
      :creator-initial-value="() => ({
        name: '颜色',
        items: [
          { name: '红' },
          { name: '橙' },
        ],
      })"
      :copy-button-props="false"
      :creator-button-props="{
        content: '添加规格项',
      }"
    >
      <template #item="{ index, itemVNode, actionVNode }">
        <n-card
          embedded
          :title="`规格${index + 1}`"
          class="mb-8px"
        >
          <template #header-extra>
            <component :is="actionVNode" />
          </template>
          <component :is="itemVNode" />
        </n-card>
      </template>
      <pro-input
        title="规格名"
        path="name"
      />
      <pro-form-list
        title="规格值"
        path="items"
        :min="1"
        :creator-button-props="{
          dashed: false,
          block: false,
          renderIcon: undefined,
          ghost: true,
          text: true,
          type: 'info',
          content: '新建',
        }"
        :copy-button-props="false"
        :remove-button-props="{
          tooltip: '删除',
        }"
      >
        <template #item="{ itemVNode, actionVNode }">
          <div class="inline-flex me-25px">
            <component :is="itemVNode" />
            <div class="ml-8px">
              <component :is="actionVNode" />
            </div>
          </div>
        </template>
        <pro-input
          path="name"
          :field-props="{
            class: 'w-104px!',
          }"
        />
      </pro-form-list>
    </pro-form-list>
  </pro-form>
</template>
