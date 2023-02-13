import axios from "axios";
// import { Loading, Message } from 'element-ui'
// import router from '../router'
// import { RETURN_CODE, BUSINESS_CODE } from './code'

// axios.defaults.withCredentials = true; // 需要凭证
axios.defaults.timeout = 25000;
axios.defaults.baseURL = "http://192.168.1.6:3007/api";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

// var CancelToken = axios.CancelToken
// var source = CancelToken.source()
// var loadinginstace
// let pending = [] // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
// let cancelToken = axios.CancelToken
// let removePending = (ever) => {
//     for (let p in pending) {
//         if (pending[p].u === ever.url + '&' + ever.method) { // 当当前请求在数组中存在时执行函数体
//             pending[p].f() // 执行取消操作
//             pending.splice(p, 1) // 把这条记录从数组中移除
//         }
//     }
// }
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  (config) => {
    if (localStorage.getItem("Authorization")) {
      config.headers.token = localStorage.getItem("Authorization");
    }
    return config;
  }
  // config => {
  //     let token = window.sessionStorage.getItem('access_token')
  //     if (token == null) {
  //         config.cancelToken = source.token
  //         source.cancel('user dont login')
  //         router.push({ name: 'Login', path: '/Login' })
  //     }
  //     if (token) {
  //         config.headers['Authorization'] = 'hhh ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
  //     }
  //     removePending(config) // 在一个ajax发送前执行一下取消操作
  //     config.cancelToken = new cancelToken((c) => {
  //         pending.push({ u: config.url + '&' + config.method, f: c })
  //     })
  //     return config
  // },
  // error => {
  //     return Promise.reject(err)
  // }
);

// get
export async function fetchGet(url, params = {}) {
  return await axios.get(url, {
    params: params,
  });
}

// post
export async function fetchPost(url, data = {}) {
  return await axios.post(url, data);
}

// put
export async function fetchPut(url, data = {}) {
  return await axios.put(url, data);
}
