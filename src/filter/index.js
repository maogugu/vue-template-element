import Vue from 'vue'

/* 格式化金额 */
export const moneyFormat = (money) => {
  return money ? `${(money / 100).toFixed(2)}` : ''
}

Vue.filter('moneyFormat', moneyFormat)
