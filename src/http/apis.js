import {
  get,
  post,
  binary, // post 上传文件 (二进制文件)
  form, // post 表单
  temp, // 临时post 拼接URL
  put, // 上传文件
  download // 下载文件
} from '@/http/request'

export default {
  /* demo -- start */
  // 调用方式1（推荐使用）  this.$apis.demoGet({id: 1, sex: 2})
  // 调用方式1 不需要逐个import api必须统一写在这份文件内统一管理
  demoGet: get('/isDemo/getApi'),
  demoPost: post('isDemo/postApi'),
  demoBinary: binary('isDemo/binaryApi'),
  demoForm: form('isDemo/formApi'),
  demoTemp: temp('isDemo/tempApi'),
  demoPut: put('isDemo/tempApi'),
  demoDownload: download('isDemo/tempApi')
  /* demo -- end */
}
