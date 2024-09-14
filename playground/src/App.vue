<script setup lang="ts">
import type { StoreState } from '@vue/repl'
import { Repl, mergeImportMap, useStore, useVueImportMap } from '@vue/repl'
import Monaco from '@vue/repl/monaco-editor'
import { computed, onMounted, ref, watchEffect } from 'vue'
import Header from './Header.vue'

const customImportMap = ref({
  imports: {
    'naive-ui': 'https://naive-ui.pro-components.cn/naive-ui.mjs',
    'pro-components-naive-ui': 'https://naive-ui.pro-components.cn/test.js',
  },
})

const replRef = ref<InstanceType<typeof Repl>>()

function setVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`)
}
window.addEventListener('resize', setVH)
setVH()

const useSSRMode = ref(false)

const AUTO_SAVE_STORAGE_KEY = 'vue-sfc-playground-auto-save'
const initAutoSave: boolean = JSON.parse(
  localStorage.getItem(AUTO_SAVE_STORAGE_KEY) ?? 'true',
)
const autoSave = ref(initAutoSave)

const { vueVersion, importMap: baseImportMap } = useVueImportMap()

const mergedImportMap = computed(() => {
  return mergeImportMap(baseImportMap.value, customImportMap.value)
})

let hash = location.hash.slice(1)
if (hash.startsWith('__SSR__')) {
  hash = hash.slice(7)
  useSSRMode.value = true
}

const store = useStore(
  {
    builtinImportMap: mergedImportMap as any as StoreState['builtinImportMap'],
    vueVersion,
  },
  hash,
)

// persist state
watchEffect(() => {
  const newHash = store
    .serialize()
    .replace(/^#/, useSSRMode.value ? `#__SSR__` : `#`)
  history.replaceState({}, '', newHash)
})

function toggleSSR() {
  useSSRMode.value = !useSSRMode.value
}

function toggleAutoSave() {
  autoSave.value = !autoSave.value
  localStorage.setItem(AUTO_SAVE_STORAGE_KEY, String(autoSave.value))
}

function reloadPage() {
  replRef.value?.reload()
}

function toggleProComponentsVersion(version: string) {
  const currentMapUrl = store.getImportMap().imports?.['pro-components-naive-ui'] ?? ''
  const replaceUrl = currentMapUrl.replace(/\/test.*\.js$/, `/test@${version}.js`)
  customImportMap.value.imports['pro-components-naive-ui'] = replaceUrl
}

const theme = ref<'dark' | 'light'>('dark')
function toggleTheme(isDark: boolean) {
  theme.value = isDark ? 'dark' : 'light'
}
onMounted(() => {
  const cls = document.documentElement.classList
  toggleTheme(cls.contains('dark'))
})
</script>

<template>
  <Header
    :store="store"
    :ssr="useSSRMode"
    :auto-save="autoSave"
    @toggle-ssr="toggleSSR"
    @reload-page="reloadPage"
    @toggle-theme="toggleTheme"
    @toggle-autosave="toggleAutoSave"
    @toggle-pro-components-version="toggleProComponentsVersion"
  />
  <Repl
    ref="replRef"
    :store="store"
    :theme="theme"
    :editor="Monaco"
    :ssr="useSSRMode"
    :auto-save="autoSave"
    :auto-resize="true"
    :clear-console="false"
    :show-compile-output="true"
    :preview-options="{
      customCode: {
        importCode: `import { initCustomFormatter } from 'vue'`,
        useCode: `if (window.devtoolsFormatters) {
    const index = window.devtoolsFormatters.findIndex((v) => v.__vue_custom_formatter)
    window.devtoolsFormatters.splice(index, 1)
    initCustomFormatter()
  } else {
    initCustomFormatter()
  }`,
      },
    }"
    @keydown.ctrl.s.prevent
    @keydown.meta.s.prevent
  />
</template>

<style>
.dark {
  color-scheme: dark;
}

body {
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  --base: #444;
  --nav-height: 50px;
}

.vue-repl {
  height: calc(var(--vh) - var(--nav-height)) !important;
}

button {
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
  background-color: transparent;
}
</style>
