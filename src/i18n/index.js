import Vue from 'vue'
import iView from 'view-design'
import VueI18n from 'vue-i18n'
import zhCN from './zh-cn'
import enUS from './en-us'
// 引入iview的中英文翻译
import iviewZH from 'view-design/dist/locale/zh-CN'
import iviewEN from 'view-design/dist/locale/en-US'

Vue.use(VueI18n)
Vue.locale = () => {}

var locale = localStorage.getItem('lang')
export const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'zh-CN',
    messages: { 'zh-CN': Object.assign(zhCN, iviewZH),
        'en-US': Object.assign(enUS, iviewEN) }, // 本地与iview国际结合
    silentTranslationWarn: process.NODE_ENV === 'production' // true 去除console中黄色报错
})

Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value)
})

// 切换中英文调用该方法
export function setI18nLanguage (lang) {
    i18n.locale = lang
    document.querySelector('html').setAttribute('lang', lang)
    return lang
}

