#### 更换UI库需要变更的地方
***

###main.js
   ```
    // 引入 element
    import '@/plugins/element'
   ```
    

###/plugins/element.js
   ```
    import ElementUI from 'element-ui'
    Vue.use(ElementUI)
   ```
    
###vue.config.js
   ```
    // cdn预加载使用
    const externals = {
      "element-ui": "ELEMENT"
    }
    
    const cdn = { // 将会注入index.html js 顺序不可乱 注意版本
      css: [
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/theme-chalk/index.css'
      ],
      js: [
        'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.1/index.js'
      ]
    }
   ```
    
###app.vue
   ```
    <a-config-provider>
    变更为新UI库的组件
    无
   ```
    
###managerLayout.vue
   ```
    <a-layout>
    变更为新UI库的组件
    <el-container>
    
    <a-menu>
    变更为新UI库的组件
    <el-menu>
   ```
    
###home.vue
   ```
    更新为自定义页面
   ```
    
