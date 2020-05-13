/** 生成唯一uuid */
declare function uuid():string

interface sessionInterface{
  /** 根据key 获取一个session的值 */
  getSession(key:string):object
  /** 设置key 并且塞入session */
  setSession(key:string,value:any):void
  /** 根据key 删除一个session */
  destroy(key:string):void
}
/** session 管理 */
declare var session :sessionInterface

/**
 * 存入localStorage
 */
interface localSessionInterface{
  /** 根据key 获取一个 localStorage 的值 */
  getLocal(key:string):object
  /** 设置key 并且塞入 localStorage  */
  setLocal(key:string,value:any):void
  /** 根据key 删除一个 localStorage  */
  destroy(key:string):void
}

declare var localSession:localSessionInterface
export {
  uuid,
  session,
  localSession
}