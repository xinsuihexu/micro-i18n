// 应用类型
export enum AppCodeType {
  /** 权限中心 */
  AUTH = 'auth',
  /** 配置中心 */
  CONFIG = 'config',
  /** 翻译中心 */
  I18N = 'i18n',
}

// 代码的环境类型
export enum CodeEnvType {
  /** 本地环境 */
  LOCAL = 'local',
  /** 开发环境 */
  DEV = 'dev',
  /** 测试环境 */
  TEST = 'test',
  /** 预发环境 */
  UAT = 'uat',
  /** 生产环境 */
  PROD = 'prod',
}

// 需要app.use的模块类型
export enum UseModuleType {
  /** pinia状态库 */
  PINIA = 1,
  /** router路由 */
  ROUTER = 2,
  /** ui组件库 */
  UI = 3,
  /** 无界微前端 */
  WUJIE = 4,
  /** i18n国际化 */
  I18N = 5,
}

// 语言类型
export enum LanguageType {
  // 中国
  ZH_CN = 'zh-CN',
  // 中国-香港
  ZH_HK = 'zh_HK',
  // 中国-台湾
  ZH_TW = 'zh_TW',
  // 阿拉伯语
  AR = 'ar',
  // 美国
  EN = 'en',
  // 德国
  DE_DE = 'de_DE',
  // 法国
  fr_FR = 'fr_FR',
  // 意大利
  IT_IT = 'it_IT',
  // 日本
  JA_JP = 'ja_JP',
  // 韩国
  KO_KR = 'ko-KR',
  // 西班牙
  ES_ES = 'es-ES',
  // 俄罗斯
  RU_RU = 'ru_RU',
  // 芬兰
  FI_FI = 'fi_FI',
  // 英国
  EN_GB = 'En_GB',
}
