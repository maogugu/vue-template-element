/**
 * 确认装饰器 弹框要求用户确认
 * @param message 错误提示 或者 antdConfirm 配置对象
 * @param errorFn  请求异常的回调 返回this 使用function 则为你绑定
 */
declare function confirm(message: string | object, errorFn: Function): MethodDecorator;

/**
 * 开关装饰器 运行前将变量设置为true  运行结束后为false
 * @param loading 需要控制的变量名
 * @param errorCb 错误的回调函数  返回this 使用function 则为你绑定
 */
declare function loading(loading: string, errorCb: Function): MethodDecorator;

/** 打印所有传入的参数 */
declare function log():MethodDecorator;

interface debounceOrThrottleOptions{
  leading?:boolean;
  maxWait?:number;
  trailing?:boolean;
}

/**
 * 防抖装饰器 
 * <br>配置对象 https://www.lodashjs.com/docs/latest#_debouncefunc-wait0-options
 * @param wait 等待时间
 * @param options 配置对象
 */
declare function debounceFn(wait?:number, options?:debounceOrThrottleOptions):MethodDecorator;

/**
 * 节流装饰器
 * <br> https://www.lodashjs.com/docs/latest#_throttlefunc-wait0-options
 * @param wait  等待时间
 * @param options 配置对象
 */
declare function throttleFn(wait?:number, options?:debounceOrThrottleOptions):MethodDecorator;

/**
 * 起始防抖装饰器
 * @param wait 等待时间
 */
declare function debounceFnStart(wait?:number):MethodDecorator;

/**
 * 起始防抖装饰器
 * @param wait 等待时间
 */
declare function debounceFnEnd(wait?:number):MethodDecorator;

export{
  confirm,
  loading,
  log,
  debounceFn,
  debounceFnStart,
  debounceFnEnd,
  throttleFn
}