import axios from 'axios'
import router from '../router'
import { useUserStore } from '@/stores/user'
 
const userStore = useUserStore()

axios.defaults.baseURL = 'http://localhost:9090'
// 请求拦截器
axios.interceptors.request.use(
  (config) => {//config是请求的配置对象
    if (userStore.token!=null) {//如果有token就携带token
      // console.log("有token");
      config.headers.token =userStore.token;
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if(error?.response?.status === 401) {//如果返回401即token过期，跳转到登录页
         userStore.removeToken()
          router.replace({
            path: '/views/login',
            query: { redirect: router.currentRoute.fullPath }//登录成功后跳入浏览的当前页面
          })
        }
    return Promise.reject(error)
  }
)

export default axios
