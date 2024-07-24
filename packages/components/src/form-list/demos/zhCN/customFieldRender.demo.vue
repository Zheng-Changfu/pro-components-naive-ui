<markdown>
# 列表动画

对 `field-render` 参数进行了增强，使其变得更加灵活，比如你想给列表加个动画
</markdown>

<script lang="tsx">
import { TransitionGroup, defineComponent } from 'vue'
import { NFlex } from 'naive-ui'
import { ArrowDownOutlined, ArrowUpOutlined } from '@vicons/antd'
import type { ProFormListArrayFieldRender, ProFormListItemRender } from 'pro-components-naive-ui'

export default defineComponent({
  components: {
    ArrowDownOutlined,
    ArrowUpOutlined,
  },
  setup() {
    function fieldRender(opt: Parameters<ProFormListArrayFieldRender>['0']) {
      /**
       * listVNode：列表的虚拟节点
       * creatorButtonVNode：添加一行数据的虚拟节点
       * fieldVNode：列表 + 添加一行数据的虚拟节点
       */
      const {
        listVNode,
        creatorButtonVNode,
      } = opt
      return (
        <NFlex vertical>
          <TransitionGroup
            tag="div"
            name="fade"
            moveClass="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
            enterActiveClass="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
            leaveActiveClass="transition duration-500 ease-[cubic-bezier(0.55,0,0.1,1)]"
            enterFromClass="opacity-0 scale-y-1 translate-x-30px"
            leaveToClass="opacity-0 scale-y-1 translate-x-30px"
          >
            {listVNode}
          </TransitionGroup>
          {creatorButtonVNode}
        </NFlex>
      )
    }

    function itemRender(opt: Parameters<ProFormListItemRender>['0']) {
      const { itemVNode } = opt
      return <div>{itemVNode}</div>
    }

    return {
      itemRender,
      fieldRender,
    }
  },
})
</script>

<template>
  <pro-form>
    <n-card embedded>
      <pro-form-list
        label="用户信息"
        path="userInfo"
        :item-render="itemRender"
        :field-render="fieldRender"
        :copy-button-props="false"
        :creator-button-props="false"
        :remove-button-props="false"
        :initial-value="[
          { name: 'zcf', age: 26 },
          { name: 'zzx', age: 0.5 },
          { name: 'cxh', age: 28 },
        ]"
      >
        <template #default="{ index, action }">
          <n-flex>
            <pro-input
              label="姓名"
              path="name"
            />
            <pro-digit
              label="年龄"
              path="age"
            />
            <n-flex align="flex-end" class="h-52px">
              <n-button text @click="() => action.moveUp(index)">
                <template #icon>
                  <n-icon>
                    <ArrowUpOutlined />
                  </n-icon>
                </template>
              </n-button>
              <n-button text @click="() => action.moveDown(index)">
                <template #icon>
                  <n-icon>
                    <ArrowDownOutlined />
                  </n-icon>
                </template>
              </n-button>
            </n-flex>
          </n-flex>
        </template>
      </pro-form-list>
    </n-card>
  </pro-form>
</template>
