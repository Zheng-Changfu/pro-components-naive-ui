import { generate } from '@ant-design/colors'
import {
  darkTheme,
  dateZhCN,
  useOsTheme,
} from 'naive-ui'
import {
  ProConfigProvider,
  zhCN,
} from 'pro-components-naive-ui'
import { useMemo } from 'vooks'
import { computed, ref } from 'vue'
import { i18n, useIsMobile } from '../utils/composables'
import hljs from './hljs'
import {
  createComponentMenuOptions,
  createDocumentationMenuOptions,
} from './menu-options'

let route = null
let router = null

export function initRouter(_router, _route) {
  route = _route
  router = _router

  localeNameRef = useMemo({
    get() {
      return 'zh-CN'
    },
    set(locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    },
  })

  dateLocaleRef = useMemo(() => {
    return dateZhCN
  })

  rawThemeNameRef = useMemo(() => route.params.theme)

  themeNameRef = useMemo({
    get() {
      switch (route.params.theme) {
        case 'os-theme':

          return osThemeRef.value
        case 'dark':
          return 'dark'
        default:
          return 'light'
      }
    },
    set(theme) {
      router.push(changeThemeInPath(route.fullPath, theme))
    },
  })
}

// display mode
const _displayModeRef = ref(window.localStorage.getItem('mode') ?? 'debug')
const displayModeRef = computed({
  get() {
    return _displayModeRef.value
  },
  set(value) {
    _displayModeRef.value = value
    window.localStorage.setItem('mode', value)
  },
})

// locale
let localeNameRef = 'zh-CN'
const localeRef = computed(() => zhCN)

// useMemo
let dateLocaleRef = null

// theme
const osThemeRef = useOsTheme()
let themeNameRef = null
let rawThemeNameRef = null // could be `os-theme`
const themeRef = computed(() => {
  const { value } = themeNameRef
  return value === 'dark' ? darkTheme : null
})

// config provider
const configProviderNameRef = ref('default')
const configProviderRef = computed(() => {
  return ProConfigProvider
})

// options
const docOptionsRef = computed(() =>
  createDocumentationMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value,
  }),
)
const componentOptionsRef = computed(() =>
  createComponentMenuOptions({
    theme: rawThemeNameRef.value,
    lang: localeNameRef.value,
    mode: displayModeRef.value,
  }),
)
const flattenedDocOptionsRef = computed(() => {
  const flattenedItems = []
  const traverse = (items) => {
    if (!items)
      return
    items.forEach((item) => {
      if (item.children)
        traverse(item.children)
      else flattenedItems.push(item)
    })
  }
  traverse(docOptionsRef.value)
  traverse(componentOptionsRef.value)
  return flattenedItems
})

export function siteSetup() {
  i18n.provide(computed(() => localeNameRef.value))
  const isMobileRef = useIsMobile()

  const themeOverrides = computed(() => {
    const pirmaryColor = '#1677FF'
    const colors = generate(pirmaryColor, {
      theme: themeRef.value ? 'dark' : 'default',
    })
    return {
      common: {
        borderRadius: '6px',
        primaryColor: colors[5],
        primaryColorHover: colors[4],
        primaryColorPressed: colors[4],
        primaryColorSuppl: colors[6],
      },
    }
  })

  return {
    themeEditorStyle: computed(() => {
      return isMobileRef.value ? 'right: 18px; bottom: 24px;' : undefined
    }),
    configProvider: configProviderRef,
    hljs,
    themeOverrides,
    themeName: themeNameRef,
    theme: themeRef,
    locale: localeRef,
    dateLocale: dateLocaleRef,
    propOverrides: {
    },
  }
}

function changeLangInPath(path, lang) {
  const langReg = /^\/(zh-CN)\//
  return path.replace(langReg, `/${lang}/`)
}

function changeThemeInPath(path, theme) {
  const themeReg = /(^\/[^/]+\/)([^/]+)/
  return path.replace(themeReg, `$1${theme}`)
}

export function push(partialPath) {
  const { fullPath } = route
  router.push(
    fullPath.replace(/(^\/[^/]+\/[^/]+)((\/.*)|$)/, `$1${partialPath}`),
  )
}

export function useDisplayMode() {
  return displayModeRef
}

export function useLocaleName() {
  return localeNameRef
}

export function useThemeName() {
  return themeNameRef
}

export function useDocOptions() {
  return docOptionsRef
}

export function useComponentOptions() {
  return componentOptionsRef
}

export function useFlattenedDocOptions() {
  return flattenedDocOptionsRef
}

export function useConfigProviderName() {
  return configProviderNameRef
}
