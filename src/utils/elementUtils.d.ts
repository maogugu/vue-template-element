/** 成功的防抖提示 */
declare function SuccessMessage(msg: string): void

/** 警告的防抖提示 */
declare function WarningMessage(msg: string): void

/** 错误的防抖提示 */
declare function ErrorMessage(msg: string): void

export {
  SuccessMessage,
  WarningMessage,
  ErrorMessage
}
