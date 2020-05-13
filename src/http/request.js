import axios from 'axios'
import { session } from '@/utils'
import { ErrorMessage } from '@/utils/elementUtils'
import jsFileDownload from 'js-file-download'
import router from '@/router'

import Qs from 'qs'
// 不走lodash cloneDeep 调用toJSON
const JSONClone = obj => JSON.parse(JSON.stringify(obj))

// http 说明表
const ERROR_MSG = {
  400: '请求错误(400)',
  401: '未授权，请重新登录(401)',
  403: '拒绝访问(403)',
  404: '请求出错(404)',
  408: '请求超时(408)',
  502: '网络错误(502)',
  503: '服务不可用(503)',
  504: '网络超时(504)'
}

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '' : `${window.location.origin}`
  // timeout: 5000 不超时
})

http.interceptors.request.use(
  config => {
    const token = session.getSession('token')
    if (token) config.headers.token = token.replace(/"/g, '')
    return config
  },
  error => {
    throw new Error(JSON.stringify(error))
  }
)

http.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) { // 逻辑错误 自定义错误码
      if (res.errorMsg) {
        ErrorMessage(res.errorMsg)
      }
      globalError('接口调用失败')
      switch (res.errorCode) {
        case 401:
        case 403:
        case 405:
        case '-3':
          session.destroy('token')
          router.push({ name: 'login', query: { from: window.this.$route.name, params: window.this.$route.query } })
          break
        default:
          break
      }
      throw new Error(JSON.stringify(res))
    }
    return res.result
  },
  error => {
    // http error
    globalError(new Date(), 'err' + error) // for debug reject
    ErrorMessage(ERROR_MSG[error?.response?.status] || `连接出错(${error.response.status})!`) // 消抖
    throw new Error(JSON.stringify(error))
  }
)
// get 方法 也调用一次 toJSON
export const get = url => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      http.get(url, { params: JSONClone(params), paramsSerializer: x => Qs.stringify(x, { arrayFormat: 'repeat' }) })
        .then(resolve)
        .catch(reject)
    })
  }
}
// post JSON 默认调用 toJSON
export const post = url => {
  return (data = {}) => {
    return new Promise((resolve, reject) => {
      http.post(url, data)
        .then(resolve)
        .catch(reject)
    })
  }
}
// post 表单 手动 toJSON
export const form = url => {
  return (data = {}) => {
    return new Promise((resolve, reject) => {
      // 达到和直接post json 一样的效果 先调用 toJSON
      http.post(url, Qs.stringify(JSONClone(data), { arrayFormat: 'repeat' }))
        .then(resolve)
        .catch(reject)
    })
  }
}
// temp post 但是拼接URL 临时使用

export const temp = url => {
  return (params = {}) => {
    return new Promise((resolve, reject) => {
      http.post(url, {}, { params })
        .then(resolve)
        .catch(reject)
    })
  }
}

// post 二进制文件
export const binary = url => {
  return (objOrFile, cbProgress) => {
    const postForm = new FormData()
    if (Object.prototype.toString.call(objOrFile) === '[object Object]') { // 是对象 就序列化
      for (const key in objOrFile) {
        if (Object.prototype.hasOwnProperty.call(objOrFile, key)) {
          postForm.append(key, objOrFile[key])
        }
      }
    } else { // 是文件就添加file头
      postForm.append('file', objOrFile) // 自定义名称
    }
    return new Promise((resolve, reject) => {
      http.post(url, postForm, {
        headers: { 'Content-Type': 'multipart/form-data;', 'X-Requested-With': '' },
        onUploadProgress: ({ loaded, total }) => {
          // 进度条实现
          cbProgress({ percent: Math.round((loaded / total) * 100) - 10 }) // 上传完成为90
        }
      })
        .then(res => {
          cbProgress({ percent: 100 }) // 后端返回为 100
          resolve(res)
        })
        .catch(reject)
    })
  }
}

// put 二进制文件
export const put = url => {
  return (file, cbProgress) => {
    return new Promise((resolve, reject) => {
      http.put(url, file, {
        onUploadProgress: ({ loaded, total }) => {
          // 进度条实现
          cbProgress({ percent: Math.round((loaded / total) * 100) - 10 }) // 上传完成为90
        }
      })
        .then(res => {
          cbProgress({ percent: 100 }) // 后端返回为 100
          resolve(res)
        })
        .catch(reject)
    })
  }
}

// download 是一个同步函数 不需要async await
export const download = url => {
  /**
   * 要传递的对象, 下载的文件名
   */
  return (params = {}, name) => {
    // 下载不过拦截器
    axios(
      {
        url,
        method: 'GET',
        params: JSONClone(params),
        paramsSerializer: x => Qs.stringify(x, { arrayFormat: 'repeat' }),
        responseType: 'blob',
        headers: {
          token: session.getSession('token').replace(/"/g, '')
        }
      }
    ).then(res => {
      jsFileDownload(res.data, name)
    })
  }
}
