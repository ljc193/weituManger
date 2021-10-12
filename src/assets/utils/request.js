import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Notification, Message } from 'element-ui'
import {baseUrl } from "./config";

let baseUrls = ""
if (process.env.NODE_ENV === "development") {
	baseUrls = "/api/"
}else {
	baseUrls = baseUrl
}

// 创建axios实例
const request = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: baseUrls,
  // 超时
  timeout: 30000 
})
// request拦截器
request.interceptors.request.use(
  config => {
    if (Vue.$getByKey("token")) {
      config.headers['token'] =  Vue.$getByKey("token")// 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers["Content-Type"]= "application/x-www-form-urlencoded"
    config.data =  qs.stringify(config.data, { indices: false })
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(res => {
    const code = res.data.code
    if (code != "1") {
      Notification.error({
        title: res.data.msg
      })
      return res.data
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default request
