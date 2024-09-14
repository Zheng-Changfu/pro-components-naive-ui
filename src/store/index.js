import {
  darkTheme,
  dateZhCN,
  useOsTheme,
} from 'naive-ui'
import {
  ProConfigProvider,
  ProDate,
  ProDateRange,
  ProDateTime,
  ProDateTimeRange,
  ProDigit,
  ProInput,
  ProSelect,
  ProSwitch,
  ProTime,
  ValueTypeEnum,
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
    valueTypeMap: {
      [ValueTypeEnum.DATE]: ProDate,
      [ValueTypeEnum.TIME]: ProTime,
      [ValueTypeEnum.INPUT]: ProInput,
      [ValueTypeEnum.DIGIT]: ProDigit,
      [ValueTypeEnum.SWITCH]: ProSwitch,
      [ValueTypeEnum.SELECT]: ProSelect,
      [ValueTypeEnum.DATE_TIME]: ProDateTime,
      [ValueTypeEnum.DATE_RANGE]: ProDateRange,
      [ValueTypeEnum.DATE_TIME_RANGE]: ProDateTimeRange,
      // [ValueTypeEnum.TEXTAREA]: ProTextarea,
      // [ValueTypeEnum.DATE_YEAR]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_WEEK]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_MONTH]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_QUARTER]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_YEAR_RANGE]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_MONTH_RANGE]: ProFieldDatePicker,
      // [ValueTypeEnum.DATE_QUARTER_RANGE]: ProFieldDatePicker,
      // [ValueTypeEnum.PASSWORD]: ProPassword,
      // [ValueTypeEnum.FORM_LIST]: ProFieldFormList,
      // [ValueTypeEnum.CHECKBOX]: ProFieldCheckbox,
      // [ValueTypeEnum.CHECKBOX_GROUP]: ProFieldCheckboxGroup,
      // [ValueTypeEnum.TRANSFER]: ProFieldTransfer,
      // [ValueTypeEnum.RADIO_GROUP]: ProFieldRadioGroup,
      // [ValueTypeEnum.TREE_SELECT]: ProFieldTreeSelect,
      // [ValueTypeEnum.SLIDER]: ProFieldSlider,
      // [ValueTypeEnum.RATE]: ProFieldRate,
      // [ValueTypeEnum.MENTION]: ProFieldMention,
      // [ValueTypeEnum.CASCADER]: ProFieldCascader,
      // [ValueTypeEnum.UPLOAD]: ProFieldUpload,
      // [ValueTypeEnum.COLOR_PICKER]: ProFieldColorPicker,
      // [ValueTypeEnum.DYNAMIC_TAGS]: ProFieldDynamicTags,
      // [ValueTypeEnum.AUTO_COMPLETE]: ProFieldAutoComplete,
    },
    propOverrides: {
      ProButton: {
        autoLoading: false,
      },
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
