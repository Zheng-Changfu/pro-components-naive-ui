<markdown>
# 权限

`auth` 代表按钮权限编码，`authData` 代表权限数据，`hasAuth` 判断是否拥有权限，你可以在全局配置 `authData` 和 `hasAuth`
</markdown>

<script lang="tsx">
import { defineComponent, ref } from 'vue'

interface AuthInfo {
  c: boolean
  r: boolean
  u: boolean
  d: boolean
}

function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default defineComponent({
  setup() {
    const authData = ref<AuthInfo>()

    async function fetchAuthData() {
      await delay(1000)
      authData.value = {
        c: Math.random() < 0.5,
        r: Math.random() < 0.5,
        u: Math.random() < 0.5,
        d: Math.random() < 0.5,
      }
    }

    function hasAuth(auth: string, authData?: AuthInfo[]) {
      console.log(auth, authData)
      return authData ? authData[auth as any] : false
    }
    return {
      hasAuth,
      authData,
      fetchAuthData,
    }
  },
})
</script>

<template>
  <ProConfigProvider
    :pro-button="{
      hasAuth,
      authData,
    }"
  >
    <div style="margin-bottom:8px">
      <ProButton type="primary" @click="fetchAuthData">
        请求权限
      </ProButton>
    </div>
    <NFlex>
      <ProButton auth="c">
        增加
      </ProButton>
      <ProButton auth="d">
        删除
      </ProButton>
      <ProButton auth="u">
        修改
      </ProButton>
      <ProButton auth="r">
        查询
      </ProButton>
    </NFlex>
  </ProConfigProvider>
</template>
