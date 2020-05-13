import * as dd from 'dingtalk-jsapi'
import { session } from '@/utils'

const baseConfig = () => ({
  corpId: session.getSession('corpId'),
  appId: process.env.VUE_APP_agentId
})

/**
 * 获取微应用免登授权码
 */
export function requestAuthCodeForRuntime () {
  return dd.runtime.permission.requestAuthCode(baseConfig())
}

// 打开一个新的h5页面
export function openLink (config) {
  return dd.biz.util.openLink({ ...baseConfig(), ...config })
}

/**
 * 修改钉钉页面的title
 */
export function setTitle (config) {
  return dd.biz.navigation.setTitle({ ...baseConfig(), ...config })
}
/**
 * 鉴权
 */
export function ddConfig (config) {
  return dd.config({
    ...baseConfig(),
    ...config,
    jsApiList: [
      'biz.contact.choose',
      'biz.contact.complexPicker',
      'biz.contact.departmentsPicker',
      'biz.ding.post',
      'biz.util.openLink',
      'device.notification.alert',
      'device.notification.confirm',
      'device.notification.prompt',
      'runtime.info'
    ]
  })
}

/**
 * 扫描条形码、二维码
 */
export function utilScan (config) {
  return dd.biz.util.scan({ ...baseConfig(), ...config })
}
// https://ding-doc.dingtalk.com/doc#/dev/oawo7q/5888bb96
export function complexPicker (config) {
  return dd.biz.contact.complexPicker({ ...baseConfig(), ...config })
}

// 图片预览
export function previewImage (config) {
  return dd.biz.util.previewImage({ ...baseConfig(), ...config })
}

/**
 * 获取当前地理位置(单次定位)
 */
export function getGeolocation (config) {
  return dd.device.geolocation.get({ ...baseConfig(), ...config })
}

export function openChart (config) {
  return dd.biz.chat.openSingleChat({ ...baseConfig(), ...config })
}

export function openDing (config) {
  return dd.biz.ding.create({ ...baseConfig(), ...config })
}

// 获取用户的设备信息
export function getPhoneInfo (config) {
  return dd.device.base.getPhoneInfo({ ...baseConfig(), ...config })
}

// 打开地图选择
export function mapSelect (config) {
  return dd.biz.map.search({ ...baseConfig(), ...config })
}

// 打开地图展示
export function mapView (config) {
  return dd.biz.map.view({ ...baseConfig(), ...config })
}

// 跳出当前页面
export function closeWindow (config) {
  return dd.biz.navigation.close({ ...baseConfig(), ...config })
}

// 设置导航栏右侧单个按钮
export function setRight (config) {
  return dd.biz.navigation.setRight({ ...baseConfig(), ...config })
}
/**
 * 预览钉盘文件
 */
export function cspacePreview (config) {
  return dd.biz.cspace.preview({ ...baseConfig(), ...config })
}
/**
 * 文件下载
 */
export function downloadFile (config) {
  return dd.biz.util.downloadFile({ ...baseConfig(), ...config })
}

export function departmentsPicker (config) {
  return dd.biz.contact.departmentsPicker({ ...baseConfig(), ...config })
}

export default {
  requestAuthCodeForRuntime,
  ddConfig,
  setTitle,
  utilScan,
  complexPicker,
  previewImage,
  getGeolocation,
  openLink,
  openChart,
  openDing,
  getPhoneInfo,
  mapSelect,
  mapView,
  closeWindow,
  setRight,
  cspacePreview,
  downloadFile,
  departmentsPicker
}
