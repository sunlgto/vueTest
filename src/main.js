import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import api from '@/api';
import {getToken} from "@/assets/auth";
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import {i18n} from "iview/src/locale";
Vue.use(iView);
Vue.prototype.$api = api;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if(to.name!=='userLogin'&&!getToken()){
    //if(to.name!=='userLogin'&&JSON.parse(localStorage.getItem("user"))===null){
        next({name:'userLogin'})
    }
    next()
})


new Vue({
  router,
    i18n,
  store,
  render: h => h(App)
}).$mount('#app')
