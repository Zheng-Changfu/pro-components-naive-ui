<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useLoadingBar } from 'naive-ui'
import SiteHeader from './SiteHeader.vue'
import { loadingBarApiRef } from './routes/router'
import { useIsMobile } from './utils/composables'

export default defineComponent({
  name: 'Site',
  components: {
    SiteHeader,
  },
  setup() {
    const loadingBar = useLoadingBar()
    const isMobileRef = useIsMobile()
    onMounted(() => {
      // eslint-disable-next-line ts/ban-ts-comment
      // @ts-expect-error
      loadingBarApiRef.value = loadingBar
      loadingBar.finish()
    })
    return {
      isMobile: isMobileRef,
    }
  },
})
</script>

<template>
  <n-layout :position="isMobile ? 'static' : 'absolute'" class="root-layout">
    <SiteHeader />
    <router-view />
  </n-layout>
</template>
