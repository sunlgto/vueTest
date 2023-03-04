// axios 数据请求文件配置
// 主要是对axios的拦截器进行了配置
import saxios from 'axios';
import qs from 'qs';
import { Message  } from 'iview';
import router from "@/router";
// 1. 初始化axios默认全局配置，该配置将会在所有请求中生效

const  axios=saxios.create({
    // 超时设置
    timeout:100000,
    // 根据环境动态替换路径
    //baseURL: process.env.VUE_APP_BASE_URL+process.env.VUE_APP_ServiceUrl,
    //baseURL:process.env.VUE_APP_ServiceUrl,

});


// 设置post请求的请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 2. 配置拦截器
// 2.1 配置请求拦截器---在请求发出前进行拦截
axios.interceptors.request.use(config => {
  config.headers['cache-control'] = `no-cache`;
  config.headers['Pragma'] = `no-cache`;
  // post请求对请求参数进行统一序列化，因为后台无法接受使用qs.stringify序列化后的参数，故改为如下序列方式，将数组序列化为字符串
  if (config.method === 'post') {
    let postData = JSON.parse(JSON.stringify(config.data));
    for (const [key, value] of Object.entries(postData)) {
      if (Array.isArray(value)) {
        postData[key] = JSON.stringify(value);
      }
    }
    config.data = postData;
    config.data = qs.stringify(config.data);
  }
  // console.log(config); // for debug
  return config;
}, error => {
  // 当出现请求错误时做一些事
  return Promise.reject(error);
});

// 2.2 配置响应拦截器---在请求响应后进行拦截
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.message.includes('timeout')) {
            Message.error("网络超时");
            return Promise.reject(error);
        } else if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。
                case 401:
                    router.replace({
                        name: 'login',
                        path: '/login',
                        query: { redirect: router.currentRoute.fullPath }
                    });
                    break;
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面
                case 403:
                    Message.error('登录过期，请重新登录');
                    // 清除token
                    //removeToken();
                    // store.commit('loginSuccess', null);
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                    setTimeout(() => {
                        router.replace({
                            name: 'login',
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000);
                    break;
                // 404请求不存在
                case 404:
                    Message.error('网络请求不存在');
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message.error(error.response.data.message || '网络繁忙，请稍后重试！',);
            }
            return Promise.reject(error.response);
        }
        return Promise.reject(error);
    }
)

export default axios
