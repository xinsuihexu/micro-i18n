import { AppCodeType, CodeEnvType, LanguageType } from './enums'

/** 浏览器标题 */
export const TITLE = '人生苦短'

/**
 * 默认语言
 * zh: 中文
 * en: 英语
 */
export const LANGUAGE = 'zh'

/**
 * 主题色定制,不填则采用组件库默认主题色
 * 克莱因蓝：#002FA7
 * 铁锈红： #681414
 * 酸柠檬： #DABF47
 * 雪松： #88815D
 * 伊甸园绿： #4F876C
 * 棕褐： #674B36
 */
export const THEME_COLOR = '#002FA7'

// 主应用基座加载子应用的路由path
export const MAIN_APP_SLOT_ROUTE_PATH = '/sub-app'

// 国际化默认语言
export const DEFAULT_LANGUAGE = LanguageType.ZH_CN

// 应用url映射
export const APP_URL_MAP = {
  [AppCodeType.AUTH]: {
    [CodeEnvType.LOCAL]: 'http://localhost:6061',
    [CodeEnvType.DEV]: '',
    [CodeEnvType.TEST]: '',
    [CodeEnvType.UAT]: '',
    [CodeEnvType.PROD]: '',
  },
  [AppCodeType.CONFIG]: {
    [CodeEnvType.LOCAL]: 'http://localhost:6062',
    [CodeEnvType.DEV]: '',
    [CodeEnvType.TEST]: '',
    [CodeEnvType.UAT]: '',
    [CodeEnvType.PROD]: '',
  },
} as any
