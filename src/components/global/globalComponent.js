import Vue from 'vue'

const requireComponents = require.context('./', true, /\.vue/)

requireComponents.keys().forEach(fileName => {
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 提取组件内 name 为 组件名字
  const reqComName = reqCom.default.name
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom)
})
