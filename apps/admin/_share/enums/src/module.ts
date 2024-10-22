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
