import { defineStore } from 'pinia'
import { LanguageType } from '../enums'

interface IState {
  language: string
  locale: any
  isLanguageChange: boolean
}

export const useLocaleStore = defineStore({
  id: 'locale-store',

  state: (): IState => ({
    language: '',
    locale: null,
    isLanguageChange: false,
  }),

  getters: {
    getLanguage: state => state.language,

    getLocale: state => state.locale,
  },

  actions: {
    async setLanguage(language: LanguageType, cb?: Function) {
      this.isLanguageChange = !!language && !!this.language && language !== this.language
      this.language = language

      const localeFn = new Map([
        [LanguageType.ZH_CN, async () => import('element-plus/es/locale/lang/zh-cn')],
        [LanguageType.EN, async () => import('element-plus/es/locale/lang/en')],
        // [LanguageType.AR, async () => import('element-plus/es/locale/lang/ar')],
      ]).get(language) as any

      this.locale = (await localeFn()).default

      document.querySelector('html')!.setAttribute('lang', language)

      // TODO 后续将从接口获取
      const appLocales = {
        [LanguageType.ZH_CN]: {
          '权限中心': '权限中心',
          '应用管理': '应用管理',
          '应用管理__详情页': '应用管理__详情页',
          '菜单管理': '菜单管理',
          '我是测试': '我是测试',
          '应用管理__anchor': '应用管理__anchor',
          '输入框:': '输入框:',
          '请输入': '请输入',
          '测试标题:': '测试标题:',
          '请输入test': '请输入test',
          '下拉框:': '下拉框:',
          '请选择': '请选择',
          '日期:': '日期:',
          '标题': '标题',
          '请输入标题': '请输入标题',
          '是否开启': '是否开启',
          '是': '是',
          '否': '否',
          '操作': '操作',
          '按钮1': '按钮1',
          '按钮2': '按钮2',
          '编辑': '编辑',
          '取消编辑': '取消编辑',
        },
        [LanguageType.EN]: {
          '权限中心': 'Permission Center',
          '应用管理': 'Application Management',
          '应用管理__详情页': 'Application Management Details Page',
          '菜单管理': 'Menu Management',
          '我是测试': 'I am a tester',
          '应用管理__anchor': 'Application Management_anchor',
          '输入框:': 'Input box:',
          '请输入': 'Please enter',
          '测试标题:': 'Test Title:',
          '请输入test': 'Please enter test',
          '下拉框:': 'Dropdown box:',
          '请选择': 'Please select',
          '日期:': 'Date:',
          '否': 'No',
          '操作': 'Operation',
          '是': 'Yes',
          '是否开启': 'Is it enabled',
          '标题': 'Title',
          '请输入标题': 'Please enter a title',
          '按钮1': 'button1',
          '按钮2': 'button2',
          '编辑': 'edit',
          '取消编辑': 'cancel edit',
        },
        [LanguageType.AR]: {
          '权限中心': 'مركز السلطة',
          '应用管理': 'إدارة التطبيقات',
          '应用管理__详情页': 'إدارة التطبيقات تفاصيل الصفحة',
          '菜单管理': 'إدارة القوائم',
          '应用管理__anchor': ' إدارة التطبيقات  انكور',
          '输入框:': 'صندوق الإدخال:',
          '请输入': 'من فضلك أدخل',
          '测试标题:': ' اختبار العنوان:',
          '请输入test': ' الرجاء إدخال اختبار',
          '下拉框:': ' مربع القائمة المنسدلة:',
          '请选择': ' الرجاء اختيار',
          '日期:': 'تواريخ:',
          '否': 'لا .',
          '操作': ' العمليات',
          '是': ' نعم .',
          '是否开启': 'فتح',
          '标题': 'عنوان',
          '请输入标题': ' أدخل العنوان',
          '按钮1': ' زر',
          '按钮2': 'زر',
          '编辑': ' تحرير .',
          '取消编辑': ' إلغاء تحرير',
        },
      } as any

      setTimeout(() => {
        cb?.(language, appLocales[language])
        this.isLanguageChange = false
      }, 10)
    },
  },

  persist: true,
})

export default useLocaleStore
