import { computed, ref } from 'vue'
import { useMemo } from 'vooks'
import {
  darkTheme,
  dateZhCN,
  useOsTheme,
} from 'naive-ui'
import {
  ProConfigProvider,
  ProFieldCheckbox,
  ProFieldCheckboxGroup,
  ProFieldDatePicker,
  ProFieldDigit,
  ProFieldFormList,
  ProFieldInput,
  ProFieldPassword,
  ProFieldRadioGroup,
  ProFieldRate,
  ProFieldSelect,
  ProFieldSlider,
  ProFieldSwitch,
  ProFieldTimePicker,
  ProFieldTransfer,
  ProFieldTreeSelect,
  ProFieldUpload,
  ValueTypeEnum,
  zhCN,
} from 'pro-components-naive-ui'
import { i18n, useIsMobile } from '../utils/composables'
import {
  createComponentMenuOptions,
  createDocumentationMenuOptions,
} from './menu-options'
import hljs from './hljs'

let route = null
let router = null

export function initRouter(_router, _route) {
  route = _route
  router = _router
  // eslint-disable-next-line ts/no-use-before-define
  localeNameRef = useMemo({
    get() {
      return 'zh-CN'
    },
    set(locale) {
      router.push(changeLangInPath(route.fullPath, locale))
    },
  })
  // eslint-disable-next-line ts/no-use-before-define
  dateLocaleRef = useMemo(() => {
    return dateZhCN
  })
  // eslint-disable-next-line ts/no-use-before-define
  rawThemeNameRef = useMemo(() => route.params.theme)
  // eslint-disable-next-line ts/no-use-before-define
  themeNameRef = useMemo({
    get() {
      switch (route.params.theme) {
        case 'os-theme':
          // eslint-disable-next-line ts/no-use-before-define
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
  return {
    themeEditorStyle: computed(() => {
      return isMobileRef.value ? 'right: 18px; bottom: 24px;' : undefined
    }),
    configProvider: configProviderRef,
    hljs,
    themeName: themeNameRef,
    theme: themeRef,
    locale: localeRef,
    dateLocale: dateLocaleRef,
    themeOverrides: {},
    fieldComponents: {
      [ValueTypeEnum.INPUT]: ProFieldInput,
      [ValueTypeEnum.DIGIT]: ProFieldDigit,
      [ValueTypeEnum.DATE]: ProFieldDatePicker,
      [ValueTypeEnum.TIME]: ProFieldTimePicker,
      [ValueTypeEnum.DATE_TIME]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_YEAR]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_WEEK]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_MONTH]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_RANGE]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_QUARTER]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_TIME_RANGE]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_YEAR_RANGE]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_MONTH_RANGE]: ProFieldDatePicker,
      [ValueTypeEnum.DATE_QUARTER_RANGE]: ProFieldDatePicker,
      [ValueTypeEnum.PASSWORD]: ProFieldPassword,
      [ValueTypeEnum.FORM_LIST]: ProFieldFormList,
      [ValueTypeEnum.CHECKBOX]: ProFieldCheckbox,
      [ValueTypeEnum.CHECKBOX_GROUP]: ProFieldCheckboxGroup,
      [ValueTypeEnum.TRANSFER]: ProFieldTransfer,
      [ValueTypeEnum.SELECT]: ProFieldSelect,
      [ValueTypeEnum.RADIO_GROUP]: ProFieldRadioGroup,
      [ValueTypeEnum.TREE_SELECT]: ProFieldTreeSelect,
      [ValueTypeEnum.SWITCH]: ProFieldSwitch,
      [ValueTypeEnum.SLIDER]: ProFieldSlider,
      [ValueTypeEnum.RATE]: ProFieldRate,
      [ValueTypeEnum.UPLOAD]: ProFieldUpload,
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
