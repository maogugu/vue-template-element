import { debounce } from 'lodash-es'
import { Message } from 'element-ui'

// 成功提示
export const SuccessMessage = debounce((msg) => { Message.success(msg) }, 1500, {
  leading: true,
  trailing: false
})

// 警告提示
export const WarningMessage = debounce((msg) => { Message.warning(msg) }, 1500, {
  leading: true,
  trailing: false
})

// 失败提示
export const ErrorMessage = debounce((msg) => { Message.error(msg) }, 1500, {
  leading: true,
  trailing: false
})
