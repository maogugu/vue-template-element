# sass文件说明

## 1. 本样式工具全部添加 !important 拥有最高权限

## 2. 本工具库坚持最小化原则 在能使用组件库的情况下优先使用组件库

## 3. 本工具库定义如下 

## 4. 本工具不提供 float 布局 建议使用 flex
***

* 命名方式 属性名-属性值${单位}
* 简写定义 
  + ### bg background
  + ### fs font-size
  + ### lh line-height
  + ### w width
  + ### h height
  + ### m margin
  + ### p padding
  + ### t 方向向量 top
  + ### r 方向向量 right
  + ### b 方向向量 bottom
  + ### l 方向向量 left
  + ### x 方向向量 为横向
  + ### y 方向向量 为纵向
* 单位解析 除百分定义为 p 像素为默认值不写 其他 vh vw rem em 全写
* demo 

  

``` html
  <p class="w-100 h-20rem m-x-20 m-10p p-t-20"></p>
```

  + w-100 widht:100px
  + h-20rem height:20rem
  + m-x-20 margin:0 20px
  + m-10p margin:10%
  + p-t-20 padding-top:20
  + 特殊定义 text 前缀
  + 一般情况下 text 属性不重复 
  + text-black color:black
  + text-center text-align:center

***

### 颜色自定义

1. 颜色自定义 将颜色以键值对的方式写入 建议使用有意义的命名 $colors 如 

   

``` scss
      $colors: ( 'white':#fff )
```

   

2. 颜色支持rgba透明度 如 bg-black-85 背景色 85% 黑色 

3. hover 伪类方式 属性-hover-颜色-透明度 

    

``` html
      <div class="text-hover-white bg-hover-red-25"></div>
```

4. 在vue 中 如何使用变量颜色 保证全局统一 日后方便修改呢?

    

``` html
    <style lang="scss" scoped>
        @import '@/style/_variables.scss';

        .demo {
            color: map-get($colors, 'white')
        }
    </style>
```

***

## 布局相关

 + ### 本工具支持 flex 布局
 + ### 本工具支持 margin padding 任意使用
 + ### 本工具支持 z-index
 + ### 本工具支持 绝对定位 t-20 t-20p l-10vw

 

``` html
  <div class="position-fixed t-20 l-20vw">demo</div>
  <!-- fixed 定位 top:20px left:20vw -->
```

 + ### flex 布局相关

    1. display-flex display:flex
    2. flex-主轴方向-交叉轴方向 自带 display:flex

    ``` html
      <div class="flex-center-center"></div>
    ```
    3. 如果只想设置一个属性 怎么办

    ``` html
     <div class="display-flex justify-content-flex-start"></div>
     <div class="display-flex align-items-center"></div>
    ```

    4. flex-1 flex-100 可直接使用

***

## 边框相关

  + 默认边框 border-1 border-2vw 除了指定宽度外 默认黑色solid
  + 边框弯曲 border-radius-1
  + 边框颜色 border-color-red-25
  + 单个边框 border-t-2rem 
  + 多个边框 border-x-1

***

## 辅助工具 

  + square 正方形 square-2vw width:2vw; height:2vw; 
  + circle 圆形 border-radius: 50%; 
  + 文字过长省略 text-ellipsis 注意需要自带宽度或配合 w-20rem 用
  + 多行文字省略 text-ellipsis-20

***
#QA
 + 我有些属性忘了, 又没有提示怎么办

    1. ### 将 _variables.scss 和 style.scss 拷贝到新文件夹中
    2. ### _variables.scss 打开下面的环境变量 
        ``` scss
          $forLength: (normal:2,
          percent: 2,
          minus:-2,
          ); 
        ```

    3. ### 将上面的环境变量注释
    4. ### vscode 安装 easy-sass 插件 .vscode 文件夹中已经有了 允许安装即可
    6. 运行 命令 >compile all Scss/Sass files in the project
    7. 将打包出的 style.min.css 全局正则替换 \{.+?\} 替换 {}
    8. 将替换完成的无属性 提示文件 放入项目snippets中 ! 注意 不要参与打包 不要引入此文件
    9. 编译器将会读取这份文件 并为你提供代码提示

  + 编译出来文件太大影响性能怎么办
  + 为webpack 设置摇树优化 以vue-cli 举例
  + 需要注意的是 whitelistPatterns 为白名单 ui组件库可能被摇掉
  + 解决方案如下
    + 用正则匹配将ui组件库的样式添加到白名单中 
    + 推荐 将组件库样式 放入public 文件夹 并在index.html中引入
    + 推荐 使用 cdn 引入组件库样式
    + 详见 vue.config.js Purgecss