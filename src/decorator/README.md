### 1. 什么是装饰器
***
  + java 中称之为注解
  + javascript 中装饰器的作用更加强大
  + 装饰器是 方法 或者 类 的重定义 
  + 实现原理是 Object.defineProperties
  + 装饰器 在运行前 并不是真实的可用代码 而是对代码的描述与修改
  + 装饰器 不是 runtime
***
### 2. 我们使用了哪些装饰器 装饰器 目前有 **函数装饰器** 与 **类装饰器** 不可以对属性进行装饰

  ####  使用装饰器有哪些好处和缺点
  ***
  + 装饰器可以**让代码更少**
  + 装饰器可以让你**专注的处理业务逻辑**而**不产生面条代码**
  + 一些相同的处理逻辑的抽出 **让你写更少的bug**
  + 装饰器**可以让你不用处理异常逻辑** 配合 axios 拦截器 你可以**只写正常逻辑下的代码**
  + 装饰器 在 **typescript** 中更加强大 (比java强) 可以提前学习
  + 对装饰器的了解 会让你对 javascript 底层更加熟悉
  + 后期的中台项目搭建 **甚至可以生成百分之50以上的代码!** 
***
  ####  使用装饰器没有缺点么
***
  + 装饰器的理解不利 (我们一起努力学习😚)
  + 装饰器对函数的要求高 (我们一起努力学习😚)
  + 如果只有一条语句也要抽成函数 (谁知道后期要加什么逻辑 抽就抽吧)
***
  ### 那么有哪些装饰器可以使用呢?
***
  + 等待装饰器 @loading
    #### 说明
    此函数 接收一个**字段名**一个回调

    运行你的代码前会将这个字段设为 true

    你的代码不论 成功 失败 报错 同步 异步 运行结束后 将此字段设为false 
    ***
    1. @param {String} loading 当前页面控制loading开关的字段名
    2. @param {Function} errorCb 请求异常的回调 返回error 一般不用写
    ***
    装饰器无法接收 this.loading 这样的参数 所以第一个参数需要字符串的 参数名 

    回调函数说明

    1. 有时候确实需要处理异常
    1. 那么可以给装饰器传递第二个参数
    1. 如果 errorCb 为 **function** 为你绑定 this  如果是**箭头函数** 则第二个参数为this
    ```typescript
      // 此处的第二个参数 写function 模式 可以使用当前  vm 实例
      @loading('loading',function(error){
        console.log(error)
        this.xxx = '123' 
      })
      async demoFn(){
        // foo
      }
      // 此处的第二个参数写作箭头函数 箭头函数无法帮你绑定 this 那么 第二个参数 that 则是当前 vm 实例
      @loading('loading',(error,that)=>{
        that.demo = '123123'
      })
      async demoFn2(){
      // bar
      }
    ```
    
    demo页面 **businessAudit.vue**

    ```html
    <a-button type="primary" :loading="loadingTable"> 查询 </a-button>
    <a-table :loading="loadingTable" />
    ```

    ```typescript
    /**
    * loading 开关装饰器
    * @param {String} loading 当前页面控制loading开关的字段名
    * @param {Function} errorCb 请求异常的回调 返回error 一般不用写
    * 如果 errorCb 为 function 为你绑定 this  如果是箭头函数 则第二个参数为this
    * @example
    * @loading('pageLoading',function(){that.demo = '123123'})
    * async getTable(){
    *  this.table = awati this.$apis.demo()
    * }
    * @example
    * @loading('pageLoading',(error,that)=>{that.demo = '123123'})
    * async getTable(){
    *  this.table = awati this.$apis.demo()
    * }
    */
    @loading('loadingTable')
    async fetchTableData () {
      const { content, totalSize } = await this.$apis.businessPage({ ...this.pagination.getFormatData(), ...this.searchForm })
      this.tableData = content // 赋值
      this.pagination.total = totalSize // 赋值
      // 无需考虑异常逻辑
      // 没有异常处理
    },
    ```
    这个函数运行时 页面绑定的 :loading  将会自动生效
    
  + 确认弹框装饰器 @confirm
  
    #### 说明
    此函数 接收一个 参数 可以为 **String** 或者 **Object**
    
    为 String 情况下 则弹出警告提示框

    为 Object 情况下 你可以自定义 提示框样式

    #### demo

    ```typescript
    // handerPay () {
    //   this.$confirm({
    //     title: '确定同意采购付款?',
    //     onOk: async () => {
    //       const result = await this.$apis.purchasePayment({ orderId: this.id })
    //       if (result) {
    //         this.getDetail()
    //       }
    //     },
    //     onCancel () {
    //       console.log('Cancel')
    //     }
    //   })
    // },
    @confirm('确定同意采购付款?') // 用户点击确定才会继续执行哦 节约代码 用户点击取消 会在控制台打印 取消 并且附上函数名
    async handerPay () {
      await this.$apis.purchasePayment({ orderId: this.id })
      this.getDetail()
    },
    @confirm({ // 此处都是默认情况 作为demo 放出来 一般可以直接写字符串
      title: '确定删除数据？',
      okText: '确定',
      okType: 'wanging',
      cancelText: '取消',
      maskClosable: false,
      iconType: 'close-circle'
    })
    async demo2 () {
      await this.$apis.purchasePayment({ orderId: this.id })
      this.getDetail()
    },
    ```
    ### 看起来很棒 但是我就是需要处理异常逻辑怎么办?

    你可以 传入一个 onCancel 
    
    ```typescript
    @confirm({
      title:'我就是有异常要处理',
      onCancel:function(){ // 请使用function 可以使用this
        this.error  = '我点击了取消'
      }
    })
    async demoError(){
      // xxxxxx
    }
    ```
  ### 所有配置参数请参考 antdv
***
  + 权限装饰器 @hasPermission

  #### 说明
***
  此函数 接收一个**权限数字** 一个 **错误提示文字**

  @param {Number} value 权限数字

  @param {String} message 需要提示用户的信息 **不写则在控制台打印**
***
  有时操作是由**js调起**的 并不是按钮调用 或者层层 **复杂调用**

  那么建议使用 **@hasPermission**
  ### demo

  ```typescript
  customRow (row) {
    return {
      on: {
        click: () => {
          this.toInfo(row) // 此处调用的
        }
      }
    }
  },
  @hasPermission(57, '对不起你没有权限')
  toInfo ({ id, productName, productImg }) {
    this.$router.push({ name: 'businessDetail', params: { orderId: id }, query: { productName, productImg } })
  },
  @hasPermission(35) // 此处只在控制台打印
  handerDetail () {
    this.detailsVisible = true
  },
  ```